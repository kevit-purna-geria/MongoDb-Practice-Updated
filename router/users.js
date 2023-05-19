const express = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Users= require('../models/users')

const auth = require('../middleware/auth')

const jwt = require('jsonwebtoken');

const router = new express.Router()


router.post('/register', async(req, res) => {
    const {name, email, password} = req.body
    const user = new Users(req.body)
    try{
        const hashedPassword = await bcrypt.hash(password, 8);
        user.password = hashedPassword
        const token = jwt.sign(user.email, "Secret-key");
        user.token = token
        await user.save()
        // const token = await org.generateAuthToken()
        console.log({user})
        res.status(201).send("User Registered Successfully")
    }catch(e){
        res.status(400).send("Email is already registered")
    }
    
})



router.post('/login', (req, res, next) => {
    Users.find({email : req.body.email})
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
                    const token = jwt.sign(user[0].email, "Secret-key");
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

router.get('/profile', auth, async(req, res, next) => {
    const token = req.token
    const user = await Users.findOne({'token' : token})
    res.status(201).send({user})
})

module.exports = router
