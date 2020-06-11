const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const routers = require('./src/routes/index')
const connection = require('./src/helpers/mysql')


app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors())

connection.connect(function(error) {
    if (error) throw error;
    console.log("databse has connected !")
})

app.use('/', routers)

app.listen(port, () => {
    console.log('listening to the port : ' + port)
})