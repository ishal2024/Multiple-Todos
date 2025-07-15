const cloudinary = require('../config/cloudinary.config')
const fs = require('fs')

async function uploadCloud(localfilepath) {
    try {
        const response = await cloudinary.uploader.upload(localfilepath , {resource_type : 'auto'})
        fs.unlinkSync(localfilepath)
        return response
    } catch (error) {
        fs.unlinkSync(localfilepath)
        return error.message
    } 
}

module.exports = uploadCloud