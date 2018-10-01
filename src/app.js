'use strict'
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()

//connecting database
mongoose.connect('mongodb://localhost/crud-mongo')
    .then(db => console.log('DB Conneted'))
    .catch(err => console.log('error'))

//importing routes
const indexRoutes = require('./routes/index')

//settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views')) //routes config
app.set('view engine', 'ejs') //views config

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended : false}))

//routes
app.use('/', indexRoutes) //using the index.js routes

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})