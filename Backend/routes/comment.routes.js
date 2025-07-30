const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middlewares/isLoggedIn.controller')
const commentController = require('../controllers/comment.controller')

router.post('/create/:subtodoId' , isLoggedIn , commentController.createComment)

router.get('/:subtodoId' , isLoggedIn , commentController.getAllComments)

router.get('/delete/:commentId' , isLoggedIn , commentController.deleteComment)

router.post('/update/:commentId' , isLoggedIn , commentController.updateComment)




module.exports = router