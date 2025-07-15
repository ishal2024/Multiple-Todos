const jwt = require('jsonwebtoken')


function generateToken(details){
    const token = jwt.sign(details , process.env.TOKEN_SECRET_KEY)
    return token
}

async function verifyToken(token){
     const decoded = jwt.verify(token , process.env.TOKEN_SECRET_KEY)
     return decoded
}

module.exports = {generateToken , verifyToken}