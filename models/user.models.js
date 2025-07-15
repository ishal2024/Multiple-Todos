const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
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
    },
    todoOwner : [
        {type : mongoose.Schema.Types.ObjectId, ref : 'Todo'}
    ],
    todoMember : [
        {type : mongoose.Schema.Types.ObjectId, ref : 'Todo'}
    ],
})


module.exports = mongoose.model('User' , userSchema)