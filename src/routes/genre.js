const experess = require('express')
const router = experess.Router()
const genreController = require('../controllers/genre')
const midAuth = require('../middleware/auth')

router.get('/', midAuth.verifyJwtToken, midAuth.authorize(['admin', 'user']), genreController.getAllGenre)
router.get('/:id', midAuth.verifyJwtToken, midAuth.authorize(['admin', 'user']), genreController.getIdGenre)
router.post('/', midAuth.verifyJwtToken, midAuth.authorize(['admin']), genreController.postGenre)
router.put('/:id', midAuth.verifyJwtToken, midAuth.authorize(['admin']), genreController.putGenre)
router.delete('/:id', midAuth.verifyJwtToken, midAuth.authorize(['admin']), genreController.deleteGenre)

module.exports = router