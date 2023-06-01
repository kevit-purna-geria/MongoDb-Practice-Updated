import { Schema, model } from 'mongoose'
import { isEmail } from 'validator'

const orgSchema = new Schema({
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
            if (!isEmail(value)) {
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

const Organization = model("Organization", orgSchema)

export default Organization
