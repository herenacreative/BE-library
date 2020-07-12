const experess = require('express')
const router = experess.Router()
const authRouter = require('../controllers/auth')

router.get('/', authRouter.getAllUser)
router.get('/:id', authRouter.getIdUser)

module.exports = router