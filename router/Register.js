const express = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Register= require('../models/Register-API')

const auth = require('../middleware/auth')

const jwt = require('jsonwebtoken');

const router = new express.Router()


router.post('/register', async(req, res) => {
    const {name, email, password} = req.body
    const reg = new Register(req.body)
    try{
        const hashedPassword = await bcrypt.hash(password, 8);
        reg.password = hashedPassword
        await reg.save()
        // const token = await org.generateAuthToken()
        // console.log({reg})
        res.status(201).send("User Registered Successfully")
    }catch(e){
        res.status(400).send("Email is already registered")
    }
    
})



router.post('/login', (req, res, next) => {
    Register.find({email : req.body.email})
    .exec()
    .then(user => {
        if(user.length<1){
            return res.status(401).send("User not Found")
        }else{
            // Compare passwords
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                res.status(500).send(err);
                } else {
                if (result) {
                    const token = jwt.sign(user[0].name, "Dummy-Text");
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

router.get('/profile', auth, async(req, res) => {
    console.log("callback")
})

module.exports = router
