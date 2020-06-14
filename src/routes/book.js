const experess = require('express')
const router = experess.Router()
const bookController = require('../controllers/book')
const multer = require('multer')
const midAuth = require('../middleware/auth')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        const splitName = file.originalname.split('.');
        const ext = splitName.pop();
        const newName = splitName.join('-');
        cb(null, `${newName}-${Date.now()}.${ext}`);
    }
})
const upload = multer({ storage: storage })

router.get('/', midAuth.verifyJwtToken, bookController.getAllBook)
router.post('/', upload.single('image'), bookController.postBook)
router.put('/:id', upload.single('image'), bookController.putBook)
router.delete('/:id', bookController.deleteBook)

module.exports = router