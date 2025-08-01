const commentModel = require('../models/comment.model')
const subtodosModel = require('../models/subtodos.model')
const todosModels = require('../models/todos.models')


async function createComment(req, res) {
    try {
        const content = req.body?.content
        const subtodoId  = req.params?.subtodoId

        if (!subtodoId) return res.status(400).json({ message: "Please enter todoId or subtodoId" })

        const subtodo = await subtodosModel.findById(subtodoId)

        if (!subtodo) return res.status(400).json({ message: "Invalid subtodoId " })

        if (!content || content.trim().replace(/\s+/g, '').length == 0)
            return res.status(400).json({ message: "Please enter content for comment" })

        const comment = await commentModel.create({
            content,
            owner: req.user?._id,
            subtodo: subtodoId
        })

        subtodo.comments = subtodo.comments + 1
        await subtodo.save()


        res.status(200).json({ message: "Comment is created", comment })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

async function getAllComments(req, res) {
    try {
        const subtodoId  = req.params?.subtodoId 

        if (!subtodoId) return res.status(400).json({ message: "Please enter todoId or subtodoId" , comments : [] })

        const subtodo = await subtodosModel.findById(subtodoId)

        if (!subtodo) return res.status(400).json({ message: "Invalid subtodoId "  , comments : []})

        const comments = await commentModel.find({ subtodo: subtodoId }).populate('owner')

        res.status(200).json({ message: "All Comments", comments })

    } catch (error) {
        res.status(400).json({ message: error.message , comments : [] })
    }
}

async function deleteComment(req, res) {
    try {
        const commentId = req.params?.commentId
        if (!commentId) return res.status(400).json({ message: "Please enter comment ID" })
        const comment = await commentModel.findById(commentId)
        if (!comment) return res.status(400).json({ message: "Invalid CommentId" })

        const deletedComment = await commentModel.findByIdAndDelete(commentId)

        await subtodosModel.findByIdAndUpdate(comment.subtodo , { $inc: { comments: -1 } })

        res.status(200).json({ message: "Comment is deleted", deletedComment })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function updateComment(req, res) {
    try {
        const content = req.body?.content
        if (!content || content.trim().replace(/\s+/g, '').length == 0)
            return res.status(400).json({ message: "Please enter content for comment" })

        const commentId = req.params?.commentId

        if (!commentId) return res.status(400).json({ message: "Please enter todoId or subtodoId" })
        const comment = await commentModel.findById(commentId)
        if (!comment) return res.status(400).json({ message: "Invalid CommentId" })

        const updatedComment = await commentModel.findByIdAndUpdate(commentId , {$set : {content : content}} , {new : true})

        res.status(200).json({ message: "Comment is updated", updatedComment })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {createComment , getAllComments , deleteComment , updateComment}