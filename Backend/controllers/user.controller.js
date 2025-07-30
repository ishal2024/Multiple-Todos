const userModels = require('../models/user.models')
const userModel = require('../models/user.models')
const uploadCloud = require('../utils/cloudinary.utils')
const bcrypt = require('../utils/hashPassword.utils')
const jwt = require('../utils/jwt.utils')


async function registerUser(req, res) {
    try {
        const { fullname, username, email, password, description } = req.body
        const response = await userModel.find({ email })
        if (response.length !== 0) return res.status(400).json({ message: "User already Exist" })
        const hashPassowrd = await bcrypt.hashPassword(password)
        const user = await userModel.create({
            fullname,
            username: username.trim().replace(/\s+/g, "").toLowerCase(),
            email,
            password: hashPassowrd,
            description: description ? description : "",
        })
        res.status(200).json({ message: "User is created", user })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ message: 'Please neter email or password' })
        if (req.cookies?.token) return res.status(400).json({ message: 'User already LogIn' })
        const user = await userModel.find({ email })
        console.log(user)
        if (user?.length === 0) return res.status(400).json({ message: 'User not exist' })
        const result = await bcrypt.comparePassword(password, user[0]?.password)
        if (!result) return res.status(400).json({ message: 'Please enter valid email or password' })
        const token = jwt.generateToken({ userId: user[0]?._id, email: user[0]?.email })
        const object = {
            httpOnly: true,
            secure: true
        }
        res.status(200).cookie("token", token, object).json({ message: 'User is Logged In', userInfo: user[0] })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function logout(req, res) {
    try {
        if (!req.cookies?.token) return res.status(400).json({ message: 'Please LOgIn First' })
        const decodedToken = await jwt.verifyToken(req.cookies.token)
        console.log(decodedToken)
        const user = await userModel.findById(decodedToken?.userId)
        console.log(user)
        if (!user) return res.status(400).json({ message: 'Invalid Token' })
        const object = {
            httpOnly: true,
            secure: true
        }
        res.status(200).clearCookie('token', object).json({ message: 'User Logged Out', user })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function updateImage(req, res) {
    try {
        const userId = req.user?._id
        const user = await userModel.findById(userId)
        if (!user) return res.status(400).json({ message: "User not exist" })

        const path = req.file?.path
        if (!path) return res.status(400).json({ message: "Path is not defined" })
        const response = await uploadCloud(path)
        if (!response?.url) return res.status(400).json({ message: "Image not Uploaded" })

        const updatedUser = await userModel.findByIdAndUpdate(userId, { $set: { profileImage: response?.url } }, { new: true })

        res.status(200).json({ message: "User Picture is Updated", updatedUser })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

async function updateUser(req, res) {
    try {
        const requiredField = ['fullname', "email", "username", "description"]
        const updateField = Object.keys(req.body)
        if (updateField.length === 0) return res.status(400).json({ messgae: "Please send data to update" })


        let updatedUser = null

        for (let key in requiredField) {
          
            if (updateField.includes(requiredField[key])) {
                updatedUser = await userModel.findByIdAndUpdate(req.user?._id,
                    { $set: { [requiredField[key]]: req.body[requiredField[key]] } }, { new: true })
            }
        }

        res.status(200).json({ messgae: "User is updated", updatedUser })

    } catch (error) {
        res.status(400).json({ messgae: error.message })
    }
}

async function getUserInfo(req,res){
    if(req?.user){
        res.status(200).json({message : "Logged In User Info" , userInfo : req?.user})
    }
}

async function changePassword(req,res){
    try {
        const pass = req?.body?.password
        if(!pass) return res.status(400).json({ messgae: "Password is Undefined" })
        const hashPass = await bcrypt.hashPassword(pass)
        const user = await userModels.findByIdAndUpdate(req?.user?._id , {
            $set : {password : hashPass}
        } , {new : true})

        res.status(200).json({ messgae: "Password is Updated" , updatedUser : user })
        
    } catch (error) {
        res.status(400).json({ messgae: error.message })
    }
}

module.exports = { registerUser, loginUser, logout, updateImage, updateUser , getUserInfo , changePassword}