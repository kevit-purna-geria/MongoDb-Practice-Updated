const express = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const orgSchema= require('../models/organization')

const auth = require('../middleware/auth')

const jwt = require('jsonwebtoken');

const router = new express.Router()


router.post('/register-org', async(req, res) => {
    const {name, email, password} = req.body
    const org = new orgSchema(req.body)
    try{
        const hashedPassword = await bcrypt.hash(password, 8);
        org.password = hashedPassword
        await org.save()
        // const token = await org.generateAuthToken()
        // console.log({org})
        res.status(201).send("User Registered Successfully")
    }catch(e){
        res.status(400).send("Email is already registered")
    }
    
})



router.post('/login-org', (req, res, next) => {
    orgSchema.find({email : req.body.email})
    .exec()
    .then(org => {
        if(org.length<1){
            return res.status(401).send("User not Found")
        }else{
            // Compare passwords
            bcrypt.compare(req.body.password, org[0].password, (err, result) => {
                if (err) {
                res.status(500).send(err);
                } else {
                if (result) {
                    const token = jwt.sign(org[0].name, "Dummy-Text");
                    res.status(200).send(`Token : ${token}`);
                    // res.send("token : ", token)
                } else {
                    res.status(401).send('Passwords do not match!');
                    
                }
                }
            });
        }
    })
    .catch(error => {
        res.status(500).send("Error : ", error)
    })
})

router.get('/profile', async(req, res) => {
    console.log("callback")
})

module.exports = router
