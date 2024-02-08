import Ticket from "../../models/Ticket.js";

export const getTicket = async (req, res) => {
    const { userId } = req.body;

    try {
        const ticket = await Ticket.findById(userId);
        res.json(ticket);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
