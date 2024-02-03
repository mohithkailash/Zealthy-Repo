var AWS = require('aws-sdk');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { Binary } = require('bson');



const app = express();
const mongoose = require('mongoose');

const User = require("./models/user");

const storage = multer.memoryStorage(); // Store files in memory as Buffer
const upload = multer({ storage: storage });

AWS.config.update({
    accessKeyId : process.env.ZEALTHY_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.ZEALTHY_APP_AWS_SECRET_ACCESS_KEY,
});

const REGION = "us-west-1";

const S3_BUCKET = process.env.S3_BUCKET;


const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});

// connection with mongoDB
const connectionString = process.env.DATABASE_URL
mongoose.connect(connectionString, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('Connected succesfully'));

app.use(cors())
app.use(express.json());

//Store the form data into DB
app.post('/user', upload.single('file'), async (req, res) => {
    try {
        const { name, email, description } = req.body;

        let attachment = 'None'; // Default value if no image is uploaded

        if (req.file) {
            const file = req.file;

            if (!file.buffer) {
                return res.status(500).send('File buffer not available');
            }

            const uniqueFilename = `${Date.now()}-${file.originalname.replace(/\s/g, '')}`;

            const params = {
                Bucket: 'zealthyimages',
                Key: uniqueFilename,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: 'public-read', // Set ACL as per your requirement
            };

            await s3.putObject(params).promise();

            attachment = `https://zealthyimages.s3.amazonaws.com/${uniqueFilename}`;
        }

        const user = new User({
            name,
            email,
            description,
            attachment,
        });

        await user.save();

        console.log('File saved to MongoDB:', user);
        res.send('File uploaded and saved successfully.');
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Send all tickets
app.post('/admin', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/process', async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        res.json(user);

    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }


})

app.post('/confirm', async (req, res) => {
    try {
        const { id, status } = req.body;

        // Update the user document by its _id
        const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { $set: { status: status } },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'Status updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Start the server
const port = 8000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
