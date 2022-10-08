// const mongoose = require('mongoose');
// mongoose.Schema | mongoose.model

const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // "     email@gmail.com    " >>> "email@gmail.com"
    lowercase: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  },
  username: {
    type: String,
    required: true,
    trim: true, // "Daniel       DK     " >> "Daniel       DK"
    lowercase: true,
    validate: {
      validator: (text) => {
         return text.startsWith('@');
      },
      message: 'username must contain @ at the beginning'
    }
  },
  avatarUrl: {
    type: String,
    default: 'images/default-avatar.png',
  },
  gender: {
    type: String,
    enum: [ 'male', 'female', 'other' ],
    set: (text) => {
      return text.toLowerCase();
    }
  },
  age: {
    type: Number,
    min: 18,
    max: 101
  }
},
{
  timestamps: true,
})

module.exports = model('User', userSchema);