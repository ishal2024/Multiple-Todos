const subtodosModel = require("../models/subtodos.model")


async function toggleLike(req, res) {
    try {
        const subtodoId = req.params?.subtodoId
        const subtodo = await subtodosModel.findById(subtodoId)
        if (!subtodo) return res.status(400).json({ message: "Invalid Subtodo Id" })
        const likeExist = subtodo.like.some((id) => id.equals(req.user?._id))
        if (likeExist) {
            await subtodosModel.findByIdAndUpdate(subtodoId, {
                $pull: {
                    like: req.user?._id
                }
            })
            return res.status(200).json({message : "Subtodo is disliked"})
        }
        await subtodosModel.findByIdAndUpdate(subtodoId, {
                $push: {
                    like: req.user?._id
                }
            })
         res.status(200).json({message : "Subtodo is liked"})
        
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

async function toggledisLike(req, res) {
    try {
        const subtodoId = req.params?.subtodoId
        const subtodo = await subtodosModel.findById(subtodoId)
        if (!subtodo) return res.status(400).json({ message: "Invalid Subtodo Id" })
        const dislikeExist = subtodo.dislike.some((id) => id.equals(req.user?._id))
        if (dislikeExist) {
            await subtodosModel.findByIdAndUpdate(subtodoId, {
                $pull: {
                    dislike: req.user?._id
                }
            })
            return res.status(200).json({message : "Subtodo is removed from  disliked"})
        }
        await subtodosModel.findByIdAndUpdate(subtodoId, {
                $push: {
                    dislike: req.user?._id
                }
            })
         res.status(200).json({message : "Subtodo is disliked"})
        
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

module.exports = {toggleLike , toggledisLike}