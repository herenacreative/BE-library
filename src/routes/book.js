const experess = require('express')
const router = experess.Router()
const bookController = require('../controllers/book')
const connection = require('../helpers/mysql')

router.get('/', bookController.getAllBook)
router.post('/', bookController.postBook)
router.put('/:id', bookController.putBook)
router.delete('/:id', bookController.deleteBook)

module.exports = router