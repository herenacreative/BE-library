const experess = require('express')
const router = experess.Router()
const authorController = require('../controllers/author')
const midAuth = require('../middleware/auth')
    // const Role = require('../helpers/role');

router.get('/', midAuth.verifyJwtToken, midAuth.authorize(['admin', 'user']), authorController.getAllAuthor) // all authenticated users(2)
router.get('/:id', midAuth.verifyJwtToken, midAuth.authorize(['admin', 'user']), authorController.getIdAuthor) // all authenticated users(2)
router.post('/', midAuth.verifyJwtToken, midAuth.authorize(['admin']), authorController.postAuthor) //admin only
router.put('/:id', midAuth.verifyJwtToken, midAuth.authorize(['admin']), authorController.putAuthor) // admin only
router.delete('/:id', midAuth.verifyJwtToken, midAuth.authorize(['admin']), authorController.deleteAuthor) //admin only

module.exports = router