const mongoose = require('mongoose');

const User = mongoose.model('User', {
  email:{
    type: String,
    require: true,
    minlength: 8,
    trim: true
  },
  password:{
    type: String,
    required: true,
    minlength: 8,
    trim: true
  }
})


module.exports = {User}