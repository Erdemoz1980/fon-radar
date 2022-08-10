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
      name: user.name,
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
      name: newUser.name,
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


export { loginUser, registerUser, getUserList }