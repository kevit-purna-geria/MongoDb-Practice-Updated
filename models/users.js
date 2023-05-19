const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        trim: true,
        lowercase: true,
        unique : true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    token : {
        type : String
    },
    supplier: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier"
     }
})

userSchema.virtual('Supplier', {
    ref: 'Supplier',
    localField: '_id',
    foreignField: 'userId'
})

const Users = mongoose.model("Users", userSchema)

module.exports = Users
