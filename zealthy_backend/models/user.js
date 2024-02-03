const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
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

const User = mongoose.model('User', userschema);

module.exports = User;