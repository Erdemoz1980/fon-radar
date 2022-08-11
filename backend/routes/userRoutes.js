import express from 'express';
import { registerUser, loginUser, getUserList, sortUserByName} from '../controllers/userControllers.js';
import {protect,admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getUserList);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/sort/:sort').get(protect,sortUserByName);



export default router;