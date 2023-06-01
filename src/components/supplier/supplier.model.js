import { Schema, model } from 'mongoose'
import validator from 'validator'

const supplierSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }]
})

const Supplier = model("Supplier", supplierSchema)

export default Supplier
