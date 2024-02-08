import express from "express";
import multer from "multer";

import { uploadUser } from "../controllers/userController.js";
import { getAllTickets, updateStatus } from "../controllers/adminController.js";
import { getTicket } from "../controllers/ticketController.js";

const upload = multer();
const router = express.Router();

// User Routes
router.post("/user", upload.single("file"), uploadUser);

// Admin Routes
router.post("/admin", getAllTickets);
router.post("/confirm", updateStatus);

// Ticket Routes
router.post("/process", getTicket);

export default router;
