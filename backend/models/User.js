// backend/models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  cart:{
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  }
});

module.exports = mongoose.model('User', UserSchema);
