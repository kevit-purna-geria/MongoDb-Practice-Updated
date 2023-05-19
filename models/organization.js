const mongoose = require('mongoose')
const validator = require('validator')

const orgSchema = new mongoose.Schema({
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
    } 
})

const Organization = mongoose.model("Organization", orgSchema)

module.exports = Organization
