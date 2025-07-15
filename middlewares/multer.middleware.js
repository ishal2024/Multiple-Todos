const multer = require('multer')
const crypto = require('crypto')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: async function (req, file, cb) {
    const bytes = await crypto.randomBytes(12)
    const fn = await bytes.toString('hex') + path.extname(file.originalname) 
    cb(null, fn)
  }
})

const upload = multer({ storage: storage })

module.exports = upload