import express from 'express';
import { registerUser, loginUser, getUserList, sortUserByName, getUserDetails} from '../controllers/userControllers.js';
import {protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getUserList);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/sort/:sort').get(protect, sortUserByName);
router.route('/profile/:id').get(protect,getUserDetails)



export default router;