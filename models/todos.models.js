const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    thumbnail : {
        type : String,
        required : true
    },
    admin : [
        { type : mongoose.Schema.Types.ObjectId , ref : 'User' }
    ],
    members : [
        { type : mongoose.Schema.Types.ObjectId , ref : 'User' , default : []}
    ],
    category : {
        type : String,
        default : 'Group'
    },

    todoCode : {
        type : String,
        required : true,
        unique : true
    }

} , {timestamps : true})

module.exports = mongoose.model('Todo' , todoSchema)