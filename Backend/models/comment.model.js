const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    subtodo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'SubTodo'
    },
   
} , {timestamps : true})

module.exports = mongoose.model('Comment' , commentSchema)