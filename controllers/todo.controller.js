
const { title } = require('process')
const todoModels = require('../models/todos.models')
const userModels = require('../models/user.models')
const uploadCloud = require('../utils/cloudinary.utils')
const crypto = require('crypto')

async function createTodo(req, res) {
    try {
        const { title, description, category } = req.body
        console.log(req.user)
        const localpath = req.file?.path
        if (!localpath) return res.status(400).json({ message: "Path is not defined" })
        const response = await uploadCloud(localpath)
        if (!response?.url) return res.status(400).json({ message: "Image not Uploaded" })
        const randomCode = await crypto.randomBytes(4).toString('hex')
        const todo = await todoModels.create({
            title,
            description,
            thumbnail: response?.url,
            admin: [req.user?._id],
            category: category ? category : 'Group',
            todoCode: randomCode
        })
        await userModels.findByIdAndUpdate(req.user?._id, { $push: { todoOwner: todo?._id } })

        res.status(200).json({ message: "Todo is created", todo })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function addMembertoTodo(req, res) {
    try {
        const todoCode = req.body?.todoCode
        if (!todoCode) return res.status(400).json({ message: "Please enter the code" })
        const todo = await todoModels.find({ todoCode: todoCode })
        if (todo.length === 0) res.status(400).json({ message: "Invalid Todo Code" })
        const updatedTodo = await todoModels.findByIdAndUpdate(todo[0]?._id,
            { $push: { members: req.user?._id } }, { new: true })
        res.status(200).json({ message: `You became member of ${updatedTodo.title}`, updatedTodo })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

async function removeMember(req, res) {
    try {
        const { userId, todoId } = req.params

        const user = await userModels.findById(userId)
        if (!user) return res.status(400).json({ message: "Invalid User Id" })

        const todo = await todoModels.findById(todoId)
        if (!todo) return res.status(400).json({ message: "Invalid todo Id" })

        const todoMember = await todoModels.find({ members: userId, _id: todoId })
        if (todoMember.length === 0) return res.status(400).json({ message: "He is not memeber of this todo" })

        const updatedTodo = await todoModels.findByIdAndUpdate(todoId, { $pull: { members: userId } })
        res.status(200).json({ message: "User is removed", updatedTodo })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function updateTodo(req, res) {

    const todoId = req.params?.todoId
    const todo = await todoModels.findById(todoId)
    if (!todo) return res.status(400).json({ message: "Invalid TodoId" })
    const updatedTodo = await todoModels.findByIdAndUpdate(todoId,
        {
            $set: {
                title: req.body?.title ? req.body?.title : todo.title,
                description: req.body?.description ? req.body?.description : todo.description,
                category: req.body?.category ? req.body?.category : todo.category
            }
        }, { new: true })

    res.status(200).json({ message: "Todo is updated", updatedTodo })
}

async function updateThumbnail(req, res) {
    try {
        const todo = await todoModels.findById(req.params?.todoId)
        if (!todo) return res.status(400).json({ messgae: 'Invalid todoId' })
        const path = req.file?.path
        if (!path) return res.status(400).json({ messgae: "Path is not defined" })
        const response = await uploadCloud(path)
        if (!response?.url) return res.status(400).json({ messgae: "Image is not Uploaded" })
        const updatedTodo = await todoModels.findByIdAndUpdate(req.params?.todoId,
            { $set: { thumbnail: response?.url } }, { new: true })
        res.status(200).json({ messgae: "Image is chnaged", updatedTodo })

    } catch (error) {
        res.status(400).json({ messgae: error.message })
    }
}

async function deleteTodo(req, res) {
    try {
        const todoId = req.params?.todoId
        const todo = await todoModels.findById(req.params?.todoId)
        if (!todo) return res.status(400).json({ messgae: 'Invalid todoId' })
         
        if (!todo.admin.includes(req.user?._id)) {
            return res.status(400).json({
                messgae: 'Only Admin Can delete Todo'
            })
        }
        await todoModels.findByIdAndDelete(todoId)
        res.status(200).json({ messgae: 'Todo is deleted', todo })

    } catch (error) {
        res.status(500).json({ messgae: error.message })
    }
}


module.exports = { createTodo, addMembertoTodo, removeMember, updateTodo, updateThumbnail, deleteTodo }