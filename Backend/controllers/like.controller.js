const subtodosModel = require("../models/subtodos.model")


async function toggleLike(req, res) {
    try {
        const subtodoId = req.params?.subtodoId
        const subtodo = await subtodosModel.findById(subtodoId)
        if (!subtodo) return res.status(400).json({ message: "Invalid Subtodo Id" , status : false })
        const likeExist = subtodo.like.some((id) => id.equals(req.user?._id))
        if (likeExist) {
            await subtodosModel.findByIdAndUpdate(subtodoId, {
                $pull: {
                    like: req.user?._id
                }
            })
            return res.status(200).json({message : "Subtodo is disliked" , status : true})
        }

        const dislikeExist = subtodo.dislike.some((id) => id.equals(req.user?._id))
        
        if(dislikeExist) {
            await subtodosModel.findByIdAndUpdate(subtodoId, {
                $pull: {
                    dislike: req.user?._id
                }
            })
            
        }

        await subtodosModel.findByIdAndUpdate(subtodoId, {
                $push: {
                    like: req.user?._id
                }
            })
         res.status(200).json({message : "Subtodo is liked" , status : true})
        
    } catch (error) {
        res.status(400).json({message : error.message ,  status : false})
    }
}

async function toggledisLike(req, res) {
    try {
        const subtodoId = req.params?.subtodoId
        const subtodo = await subtodosModel.findById(subtodoId)
        if (!subtodo) return res.status(400).json({ message: "Invalid Subtodo Id" , status : false })
        const dislikeExist = subtodo.dislike.some((id) => id.equals(req.user?._id))
        if (dislikeExist) {
            await subtodosModel.findByIdAndUpdate(subtodoId, {
                $pull: {
                    dislike: req.user?._id
                }
            })
            return res.status(200).json({message : "Subtodo is removed from  disliked" , status : true})
        }

        const likeExist = subtodo.like.some((id) => id.equals(req.user?._id))
        if(likeExist) {
            await subtodosModel.findByIdAndUpdate(subtodoId, {
                $pull: {
                    like: req.user?._id
                }
            })
            
        }

        await subtodosModel.findByIdAndUpdate(subtodoId, {
                $push: {
                    dislike: req.user?._id
                }
            })
         res.status(200).json({message : "Subtodo is disliked" , status : true})
        
    } catch (error) {
        res.status(400).json({message : error.message , status : false})
    }
}

module.exports = {toggleLike , toggledisLike}