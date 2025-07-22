const todosModels = require("../models/todos.models")
const userModels = require("../models/user.models")


async function makeAdmin(req, res) {
    try {
        const { userId, todoId } = req.params

        const user = await userModels.findById(userId)
        if (!user) return res.status(400).json({ message: "User not exist" })

        const todo = await todosModels.findById(todoId)
        if (!todo) return res.status(400).json({ message: "todo not exist" })

        const isMember =  todo.members.some((id) => id.equals(userId))
        if (!isMember) return res.status(400).json({ message: "User is not a member of this todo" })

        const isAdmin = todo.admin.some((id) => id.equals(userId))
        if (isAdmin) return res.status(400).json({ message: "User is already Admin" })

        const isAuthorized = todo.admin.some((id) => id.equals(req.user?._id))
        if (!isAuthorized) return res.status(400).json({ message: "Only Admin Can Make someone admin" })

        const updatedTodo = await todosModels.findByIdAndUpdate(todoId,
             { $push: { admin: userId } , $pull : {members : userId}  }, 
             { new: true })

        res.status(200).json({ message: `${user.fullname} is now admin of ${todo.title}`, updatedTodo })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}


async function removeFromAdmin(req, res) {
    try {
        const { userId, todoId } = req.params

        const user = await userModels.findById(userId)
        if (!user) return res.status(400).json({ message: "User not exist" })

        const todo = await todosModels.findById(todoId)
        if (!todo) return res.status(400).json({ message: "todo not exist" })

        const isAdmin = await todo.admin.some((id) => id.equals(userId))
        if (!isAdmin) return res.status(400).json({ message: "User is not a Admin" })

        const isAuthorized = todo.admin.some((id) => id.equals(req.user?._id))
        if (!isAuthorized) return res.status(400).json({ message: "Only Admin Can Make someone admin" })

        const updatedTodo = await todosModels.findByIdAndUpdate(todoId,
             { $pull: { admin: userId } , $push : {members : userId} }, 
             { new: true })

        res.status(200).json({ message: `${user.fullname} is not an admin of ${todo.title}`, updatedTodo })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}


module.exports = { makeAdmin, removeFromAdmin }