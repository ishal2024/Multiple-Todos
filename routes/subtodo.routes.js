const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middlewares/isLoggedIn.controller')
const subtodoController = require('../controllers/subtodo.controller')
const likeController = require('../controllers/like.controller')
const upload = require('../middlewares/multer.middleware')


router.post('/create/:todoId' , isLoggedIn , upload.single('image') , subtodoController.createSubtodo)

router.get('/delete/:subtodoId' , isLoggedIn , subtodoController.deleteSubtodo)

router.get('/like/:subtodoId' , isLoggedIn , likeController.toggleLike)

router.get('/dislike/:subtodoId' , isLoggedIn , likeController.toggledisLike)

module.exports = router