const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middlewares/isLoggedIn.controller')
const subtodoController = require('../controllers/subtodo.controller')
const likeController = require('../controllers/like.controller')
const upload = require('../middlewares/multer.middleware')


router.post('/create/:todoId' , isLoggedIn , upload.single('image') , subtodoController.createSubtodo)

router.get('/delete/:subtodoId' , isLoggedIn , subtodoController.deleteSubtodo)

router.post('/update/:subtodoId' , isLoggedIn , upload.single('image')  , subtodoController.updateSubtodo)

router.get('/like/:subtodoId' , isLoggedIn , likeController.toggleLike)

router.get('/dislike/:subtodoId' , isLoggedIn , likeController.toggledisLike)

router.get('/:subtodoId' , isLoggedIn , subtodoController.getAllSubtodos)

module.exports = router