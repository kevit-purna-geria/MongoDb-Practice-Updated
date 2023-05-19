const express = require('express')


//Connect to the Database
require('./mongoose')
const mongoose = require('mongoose');

const app = express()
const port = process.env.PORT || 3000

const Register = require('./models/Register-API')
const regRouter = require('./router/Register')

app.use(express.json())

app.use(regRouter)

app.listen(port, () => {console.log('Server is up on port ' + port)
})