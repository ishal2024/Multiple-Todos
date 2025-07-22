const bcrypt = require('bcrypt')


async function hashPassword(password){
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password , salt)
    return hash
}

async function comparePassword(passowrd , hash){
    return await bcrypt.compare(passowrd , hash)
}


module.exports = {hashPassword , comparePassword}