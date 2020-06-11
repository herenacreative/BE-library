const express = require("express")
const router = express.Router()
const bookRouter = require('./book')
const authorRouter = require('./author')
const genreRouter = require('./genre')

router.use('/books', bookRouter)
router.use('/authors', authorRouter)
router.use('/genres', genreRouter)

module.exports = router