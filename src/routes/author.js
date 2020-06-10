const experess = require('express')
const router = experess.Router()
const authorController = require('../controllers/author')

router.get('/', authorController.getAllAuthor)
router.post('/', authorController.postAuthor)
router.put('/:id', authorController.putAuthor)
router.delete('/:id', authorController.deleteAuthor)

module.exports = router