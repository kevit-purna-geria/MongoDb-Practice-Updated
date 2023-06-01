import { Router } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import OrgController from './organization.controller';
const orgController = new OrgController()
import Org from './organization.model';


const router = new Router()

router.post('/organization-signup', (req, res) => {
    orgController.signUp(req, res)
  });

router.post('/organization-login', async(req, res) => {
    orgController.login(req,res)
})
  

export default router