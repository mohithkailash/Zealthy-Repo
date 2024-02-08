import Ticket from "../../models/Ticket.js";

export const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { id, status } = req.body;

        // Update the user document by its _id
        const updatedUser = await Ticket.findOneAndUpdate(
            { _id: id },
            { $set: { status: status } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "Status updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
