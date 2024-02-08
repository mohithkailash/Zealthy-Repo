import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required : true
    },
    description:{
        type: String,
        required : true
    },
    attachment:  {
        type: String,
    },
    status:{
        type: String,
        default: "NEW"
    },
});

const Ticket = mongoose.model('Ticket', TicketSchema);

export default Ticket;