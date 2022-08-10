import express from 'express';
import { registerUser, loginUser, getUserList } from '../controllers/userControllers.js';
import {protect,admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getUserList);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);



export default router;