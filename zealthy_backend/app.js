import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";

import mongoose from "mongoose";
const connectionString = process.env.DATABASE_URL;
mongoose
    .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected succesfully"));

const storage = multer.memoryStorage(); // Store files in memory as Buffer
const upload = multer({ storage: storage });

import router from "./src/routes/routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: process.env.ZEALTHY_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.ZEALTHY_APP_AWS_SECRET_ACCESS_KEY,
});

const REGION = "us-west-1";

const S3_BUCKET = process.env.S3_BUCKET;

export const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});


// Start the server
const port = 8000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
