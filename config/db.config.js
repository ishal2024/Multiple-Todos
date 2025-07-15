const mongoose = require('mongoose')


async function connectDB(req,res){
    try {
       const response = await  mongoose.connect(process.env.DB_URL)
       if(response) console.log("DB is Connected")
    } catch (error) {
        console.log("DB is not Connected" , error.message)
        process.exit(1); 
    }
}   

module.exports = connectDB