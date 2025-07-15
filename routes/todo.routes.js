const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todo.controller')
const isLoggedIn = require('../middlewares/isLoggedIn.controller')
const upload = require('../middlewares/multer.middleware')

router.post('/create' , isLoggedIn , upload.single('thumbnail') , todoController.createTodo )

router.post('/join' , isLoggedIn  , todoController.addMembertoTodo)

router.get('/remove/:userId/:todoId' , isLoggedIn , todoController.removeMember)

router.post('/update/:todoId' , isLoggedIn , todoController.updateTodo)

router.post('/updateThumbnail/:todoId' , isLoggedIn , upload.single('thumbnail'), todoController.updateThumbnail)

router.get('/delete/:todoId' , isLoggedIn , todoController.deleteTodo)

module.exports = router