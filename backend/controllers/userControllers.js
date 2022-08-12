import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';


// Logs in a user
// POST /api/users/login
// Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && await user.matchPassword(password)) {
    res.status(200).json({
      _id: user._id,
      companyName: user.companyName,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(404).json({message:'Invalid email or password'})
  }

});

// Registers a new user
// POST /api/users/register
// Public
const registerUser = asyncHandler(async (req, res) => {
  const { companyName, email, password, province, taxNumber, taxOffice, countInvoice, contactNumber } = req.body;
  const userExists = await User.findOne({ email });
  
  if (userExists) {
    return res.status(400).json({ error: 'User already exists' })
  }

  const newUser = await User.create({
    companyName, email, password, province, taxNumber, taxOffice, countInvoice, contactNumber
  });
  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      companyName: newUser.companyName,
      email: newUser.email,
      token: generateToken(newUser._id)
    })
  } else {
    res.status(400).json({ error: 'Invalid user data' })
  }

});

// Fetches userlist
// GET api/users
// Private/Protected
const getUserList = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? { $or:[
      {companyName: {$regex: req.query.keyword,$options: 'i',}},
      {taxNumber: {$regex: req.query.keyword,$options:'i'}}]} : {}

  const users = await User.find({ ...keyword })
  res.status(200).json(users);

});

// Sorts users by field
// GET api/users/sort
// Private

const sortUserByName = asyncHandler(async (req, res) => {
  const field = req.params.sort.split(',')[0];
  const direction = req.params.sort.split(',')[1];
  const sortedUsers = await User.find({}).sort([[field, direction]]);
  res.json(sortedUsers);

});

// Gets user details
// GET api/users/profile/:id
// Private

const getUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: 'User not found' })
  }
});

//  Updates user details
//  Put /api/users/profile/update/:id
//  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.companyName = req.body.companyName || user.companyName
    if(req.body.password) {
      user.password = req.body.password
    }
    user.email = req.body.email || user.email
    user.province = req.body.province || user.province
    user.taxNumber = req.body.taxNumber || user.taxNumber
    user.taxOffice = req.body.taxOffice || user.taxOffice
    user.countInvoice = req.body.countInvoice || user.countInvoice
    user.contactNumber = req.body.contactNumber || user.contactNumber
    user.activityArea = req.body.activityArea || user.activityArea
    user.guarantee = req.body.guarantee || user.guarantee
    user.capital = req.body.capital || user.capital
    user.profitInfo = req.body.profitInfo || user.profitInfo
    user.terms = req.body.terms || user.terms
      
   

    const updatedUser = await user.save();
    
    res.status(200).json(updatedUser);
      
  } else {
    res.status(404).json({ error: 'User not found' });
  }
})





export {
  loginUser,
  registerUser,
  getUserList,
  getUserDetails,
  sortUserByName,
  updateUserProfile
}