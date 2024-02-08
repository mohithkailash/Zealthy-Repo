import Ticket from "../../models/Ticket.js";

import { s3 } from "../../app.js";

export const uploadUser = async (req, res) => {
    try {
        const { name, email, description } = req.body;

        let attachment = "None"; // Default value if no image is uploaded

        if (req.file) {
            const file = req.file;

            if (!file.buffer) {
                return res.status(500).send("File buffer not available");
            }

            const uniqueFilename = `${Date.now()}-${file.originalname.replace(
                /\s/g,
                ""
            )}`;

            const params = {
                Bucket: "zealthyimages",
                Key: uniqueFilename,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: "public-read", // Set ACL as per your requirement
            };

            await s3.putObject(params).promise();

            attachment = `https://zealthyimages.s3.amazonaws.com/${uniqueFilename}`;
        }

        const ticket = new Ticket({
            name,
            email,
            description,
            attachment,
        });

        await ticket.save();

        console.log("File saved to MongoDB:", ticket);
        res.send("File uploaded and saved successfully.");
    } catch (error) {
        console.error("Error saving form data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
