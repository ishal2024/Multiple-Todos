const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const upload = require('../middlewares/multer.middleware')
const isLoggedIn = require('../middlewares/isLoggedIn.controller')

router.post('/register'  , userController.registerUser)

router.post('/login' , userController.loginUser)

router.get('/logout' , userController.logout)

router.post('/updateUserImage' , upload.single('profileImage') , isLoggedIn ,userController.updateImage)

router.post('/updateUser' , isLoggedIn ,userController.updateUser)


module.exports = router