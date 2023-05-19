const express = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Supplier= require('../models/supplier')

const Users = require('../models/users')

const auth = require('../middleware/auth')

const jwt = require('jsonwebtoken');

const router = new express.Router()

router.post('/signup-supplier', auth, async (req, res) => {
    const token = req.token
    const user = await Users.findOne({'token' : token})
    const name = req.body.name
    const supplier = new Supplier({
        name : name,
        userId : user._id
    })
    
    const userPopulate = await Users.find().populate('supplier', 'name');
    // console.log(userPopulate);
    await supplier.save()
    res.status(400).send(supplier)
    // res.send(user._id)
})

router.get('/supplier', auth, async (req, res) => {
    try {
        const token = req.token
        const user = await Users.findOne({'token' : token})
        
        // await req.user.populate('Supplier')
        const supplier = await Supplier.find({'userId' : user._id})
        res.send({supplier})
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/suppliers', async (req, res) => {
    try {
      const suppliers = await Supplier.find().populate('products');
      res.json(suppliers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch suppliers' });
    }
  });

module.exports = router