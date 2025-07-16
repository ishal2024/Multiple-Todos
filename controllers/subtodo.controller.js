const subtodosModel = require('../models/subtodos.model')
const todoModel = require('../models/todos.models')
const uploadCloud = require('../utils/cloudinary.utils')


async function getAllSubtodos(req,res){
    try {
        const todoId = req.params?.todoId
        const todo = await todoModel.findById(todoId)
        if(!todo) return res.status(400).json({messgae : "Invalid TodoId"})
        const subtodos = await subtodosModel.find({todo : todoId})
        res.status(200).json({message : "All Subtodos" , subtodos})
        
    } catch (error) {
         res.status(400).json({messgae : error.message})
    }
}

async function createSubtodo(req, res) {
    try {
        const { title, description } = req.body
        if(!title || !description) return res.status(400).json({ message: "title or description is required" })
        const todoId = req.params?.todoId
        const todo = await todoModel.findById(todoId)
        if (!todo) return res.status(400).json({ message: "Invalid Todo Id" })
        let response = null
        if (req.file?.path) {
            response = await uploadCloud(req.file?.path)
            if (!response?.url) return res.status(400).json({ message: "Image not uploaded" })
        }
        const subtodo = await subtodosModel.create({
             title,
             description,
             image : response?.url || "",
             owner : req.user?._id,
             todo : todoId
        })
    
        res.status(200).json({message : "Sub Todo is created" , subtodo})
        
    } catch (error) {
       res.status(400).json({ message: error.message }) 
    }
}

async function deleteSubtodo(req,res){
    try {
        const subtodoId = req.params?.subtodoId
        const subtodo = await subtodosModel.findById(subtodoId)
        if(!subtodo) return res.status(400).json({message : "Invalid subtodId"})
        const todo = await todoModel.findById(subtodo?.todo)
        const authorized = [...todo.admin , subtodo.owner]
        const isAuthorized = authorized.some((id) => id.equals(req.user?._id))
        if(!isAuthorized) return res.status(400).json({message : "Only Admin and Subtodo owner can delete it"})
        const deletedSubtodo = await subtodosModel.findByIdAndDelete(subtodoId)
        res.status(200).json({message : "Sub todo deleted" , deletedSubtodo})
        
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

async function updateSubtodo(req,res){
    try {
        const subtodId = req.params?.subtodId
        const subtodo = await subtodosModel.findById(subtodId)
        if(!subtodo) return res.status(400).json({message : "Invalid Subtodo Id"})
        const updatedSubtodo = await subtodosModel.findByIdAndUpdate(subtodId , 
             {$set : {
                title : req.body?.title ? req.body?.title : subtodo.title,
                title : req.body?.description ? req.body?.description : subtodo.description,
             }} , {new : true}
        )
    
        res.status(200).json({messgae : "Sub Todo is updated" , updatedSubtodo})
        
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}



module.exports = {createSubtodo , deleteSubtodo , getAllSubtodos , updateSubtodo}