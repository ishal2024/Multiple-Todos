const jwt = require('../utils/jwt.utils')
const userModels = require('../models/user.models')

async function isLoggedIn(req,res,next){
    try {
        const token = req.cookies?.token
        if(!token) return res.status(400).json({message : 'Please log In'})
        const decoded = await jwt.verifyToken(token)
        const user = await userModels.findById(decoded?.userId)
        if(!user) return res.status(400).json({message : 'Invalid Token Id'})
        req.user = user
        next()
        
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

module.exports = isLoggedIn