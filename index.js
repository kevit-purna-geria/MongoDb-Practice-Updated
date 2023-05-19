const express = require('express')


//Connect to the Database
require('./mongoose')
const mongoose = require('mongoose');

const app = express()
const port = process.env.PORT || 3000

//Users
const Users = require('./models/users')
const userRouter = require('./router/users')

// Supplier
const Supplier = require('./models/supplier')
const supplierRouter = require('./router/supplier')

// Authentication
const auth = require('./middleware/auth')

// Organization
const Organization = require('./models/organization')
const orgRouter = require('./router/organization')

// Product
const Product = require('./models/products')
const productRouter = require('./router/products')

//Recipe
const Recipe = require('./models/recipe')
const recipeRouter = require('./router/recipe')

app.use(express.json())

app.use(userRouter)

app.use(orgRouter)

app.use(supplierRouter)

app.use(productRouter)

app.use(recipeRouter)

app.listen(port, () => {console.log('Server is up on port ' + port)
})