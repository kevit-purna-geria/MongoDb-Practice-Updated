import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import UserController from './user.controller';
const userController = new UserController()
import User from './user.model';


router.post('/register', async(req, res) => {
    userController.signUp(req, res)
})



router.post('/login', (req, res, next) => {
    userController.login(req, res)
})


export default router
