const experess = require('express')
const router = experess.Router()
const borrowController = require('../controllers/trans')
// const returnController = require('../controllers/trans')
const midAuth = require('../middleware/auth')

router.get('/', midAuth.verifyJwtToken, midAuth.authorize(['admin', 'user']), borrowController.getAllBorrow)
router.get('/:id', midAuth.verifyJwtToken, midAuth.authorize(['admin', 'user']), borrowController.getIdBorrow)
router.post('/', midAuth.verifyJwtToken, midAuth.authorize(['admin', 'user']),  borrowController.postBorrow)
// router.put('/:id', midAuth.verifyJwtToken, midAuth.authorize(['admin']), borrowController.putBorrow)
// router.delete('/:id', midAuth.verifyJwtToken, midAuth.authorize(['admin']), borrowController.deleteBorrow)


// router.get('/', midAuth.verifyJwtToken, midAuth.authorize(['admin', 'user']), returnController.getAllReturn)

module.exports = router