const experess = require('express')
const router = experess.Router()
const authorController = require('../controllers/author')
const midAuth = require('../middleware/auth')

router.get('/', midAuth.verifyJwtToken, authorController.getAllAuthor)
router.post('/', authorController.postAuthor)
router.put('/:id', authorController.putAuthor)
router.delete('/:id', authorController.deleteAuthor)

module.exports = router