const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const extensao = file.originalname.split(".").pop()
        cb(null, file.fieldname + '-' + Date.now() + "." + extensao)
    }
})

module.exports = storage