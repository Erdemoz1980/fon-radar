import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';

const profitInfoSchema = mongoose.Schema({
  2019: { type: Number, default: 0 },
  2020: { type: Number, default: 0 },
  2021: { type: Number, default: 0 },
});

const termSchema = mongoose.Schema({
  maturityMonths: { type: Number, default: 0 },
  paymentMethod: { type: String },
  limit:{type:Number, default:0}
  
})

const userSchema = mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  province: { type: String},
  taxNumber: { type: String},
  taxOffice: { type: String},
  countInvoice: { type: String},
  contactNumber: { type: String},
  activityArea:{type:String},
  guarantee: { type: Number },
  capital: { type: Number },
  profitInfo: [profitInfoSchema],
  terms:[termSchema]
}, {
  timestamps:true
});


userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password)
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

const userModel = mongoose.model('User', userSchema);

export default userModel;