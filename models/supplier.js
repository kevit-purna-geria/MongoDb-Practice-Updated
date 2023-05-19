const mongoose = require('mongoose')
const validator = require('validator')

const supplierSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }]
})

const Supplier = mongoose.model("Supplier", supplierSchema)

module.exports = Supplier
