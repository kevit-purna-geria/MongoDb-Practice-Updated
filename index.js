import express, { json } from 'express';


//Connect to the Database
import mongoose from 'mongoose';
import './components/database/mongoDbConnection';

const app = express()
const port = process.env.PORT;

//Users
import userRouter from './src/components/organization/organization.routes';
// Supplier
import supplierRouter from './src/components/supplier/supplier.routes'
// Authentication
import auth from './src/middleware/middleware.auth'
// Organization
import orgRouter from './src/components/organization/organization.routes'
// Product
import productRouter from './src/components/product/product.routes'
//Recipe
import recipeRouter from './src/components/recipe/recipe.routes'

app.use(json())

app.use(userRouter)
app.use(orgRouter)
app.use(supplierRouter)
app.use(productRouter)
app.use(recipeRouter)

app.listen(port, () => {console.log('Server is up on port ' + port)
})