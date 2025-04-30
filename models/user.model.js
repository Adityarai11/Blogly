const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  blogs:[
  {
    type:mongoose.Types.ObjectId,
    ref:'Blog',
    require:true
  }
]

},{timestamps:true});

// Create the User model
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
