const mongoose = require('mongoose')

const subtodoSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    todo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments: {
        type: Number,
        default: 0
    },
    like: [
        {type : mongoose.Schema.Types.ObjectId , ref : 'User' , default : []}
    ],
    dislike: [
        {type : mongoose.Schema.Types.ObjectId , ref : 'User' , default : []}
    ],
    image: {
        type: String,
    },

} , {timestamps : true})

module.exports = mongoose.model('SubTodo' , subtodoSchema)