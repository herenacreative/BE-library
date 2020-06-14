const experess = require('express')
const router = experess.Router()
const genreController = require('../controllers/genre')
const midAuth = require('../middleware/auth')

router.get('/', midAuth.verifyJwtToken, genreController.getAllGenre)
router.post('/', genreController.postGenre)
router.put('/:id', genreController.putGenre)
router.delete('/:id', genreController.deleteGenre)

module.exports = router