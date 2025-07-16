const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todo.controller')
const adminController = require('../controllers/admin.controller')
const isLoggedIn = require('../middlewares/isLoggedIn.controller')
const upload = require('../middlewares/multer.middleware')

router.post('/create' , isLoggedIn , upload.single('thumbnail') , todoController.createTodo )

router.post('/join' , isLoggedIn  , todoController.addMembertoTodo)

router.get('/remove/:userId/:todoId' , isLoggedIn , todoController.removeMember)

router.post('/update/:todoId' , isLoggedIn , todoController.updateTodo)

router.post('/updateThumbnail/:todoId' , isLoggedIn , upload.single('thumbnail'), todoController.updateThumbnail)

router.get('/delete/:todoId' , isLoggedIn , todoController.deleteTodo)

router.get('/makeAdmin/:userId/:todoId' , isLoggedIn , adminController.makeAdmin)

router.get('/removeAdmin/:userId/:todoId' , isLoggedIn , adminController.removeFromAdmin)

router.get('/' , isLoggedIn , todoController.getAllTodos)

module.exports = router