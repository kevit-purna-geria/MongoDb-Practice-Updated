import { Router } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Supplier from './supplier.model';

import Users from '../user/user.model';

import auth from '../../middleware/middleware.auth';

import jwt from 'jsonwebtoken';
import SupplierController from './supplier.controller';
const supplierController = new SupplierController()

const router = new Router()

router.post('/signup-supplier', auth, async (req, res) => {
    supplierController.supplierSignUp(req, res)
})

router.get('/supplier', auth, async (req, res) => {
    supplierController.viewSupplier(req, res)
})

router.get('/suppliers/products', auth, async (req, res) => {
    supplierController.viewSuppliersProducts(req, res)
  });

export default router