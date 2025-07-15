const express = require('express')
const app = express()
const connectDB = require('./config/db.config')
const cookieparser = require('cookie-parser')
require('dotenv').config()

// Routes
const userRouter = require('./routes/user.routes')
const todoRouter = require('./routes/todo.routes')

connectDB()
app.use(express.json())  
app.use(express.urlencoded({extended : true}))
app.use(cookieparser())
app.use(express.static('public'))


app.use('/user' , userRouter)
app.use('/todo' , todoRouter)


app.get('/' , (req,res) => {
    res.send("Hello World") 
})


app.listen(process.env.LISTEN_PORT || 3000)