const express = require("express")
const router = express.Router()

const bookRouter = require('./book')
const authorRouter = require('./author')
const genreRouter = require('./genre')
const authRouter = require('./auth')
const borrowRouter = require('./trans')
const returnRouter = require('./return')
const userRouter = require('./user')

router.use('/books', bookRouter)
router.use('/authors', authorRouter)
router.use('/genres', genreRouter)
router.use('/auth', authRouter)
router.use('/borrow', borrowRouter)
router.use('/return', returnRouter)
router.use('/user', userRouter)

module.exports = router