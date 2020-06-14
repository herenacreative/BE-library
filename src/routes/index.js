const express = require("express")
const router = express.Router()

const bookRouter = require('./book')
const authorRouter = require('./author')
const genreRouter = require('./genre')
const authRouter = require('./auth')

router.use('/books', bookRouter)
router.use('/authors', authorRouter)
router.use('/genres', genreRouter)
router.use('/auth', authRouter)

module.exports = router