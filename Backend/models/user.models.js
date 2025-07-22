const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    description : {
        type : String,
    },
    profileImage : {
        type : String,
        default : ""
    },
    todoOwner : [
        {type : mongoose.Schema.Types.ObjectId, ref : 'Todo'}
    ],
    
} , {timestamps : true})


module.exports = mongoose.model('User' , userSchema)