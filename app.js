const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
    //const mysql = require('mysql');
const morgan = require('morgan')

const routers = require('./src/routes/index')

const connection = require('./src/helpers/mysql')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
app.use(morgan('dev'));

connection.connect(function(error) {
    if (error) throw error;
    console.log("databse has connected !")
})

app.use('/', routers)

app.listen(3000, () => console.log('port 3000'))