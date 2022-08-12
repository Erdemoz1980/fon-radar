import express from 'express';
import { registerUser, loginUser, getUserList, sortUserByName, getUserDetails, updateUserProfile} from '../controllers/userControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getUserList);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/sort/:sort').get(protect, sortUserByName);
router.route('/profile/:id').get(protect, getUserDetails);
router.route('/update/:id').put(protect, updateUserProfile);



export default router;