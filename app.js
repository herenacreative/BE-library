const express = require('express')
const app = express()
const port = 8080
require('dotenv').config()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const routers = require('./src/routes/index')
const connection = require('./src/helpers/mysql')
const path = require('path')

// app.use('/images', express.static('uploads'))
// app.use(express.static('uploads'));
// app.use('/images',express.static('uploads'));
// app.use(express.static(__dirname + 'uploads'));
// app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads',express.static('./uploads'));

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors())

connection.connect(function(error) {
    if (error) throw error;
    console.log("Database Has Connected !")
})

app.use('/v1', routers)

app.listen(port, () => {
    console.log('listening to the port : ' + port)
})