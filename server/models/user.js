const mongoose = require('mongoose');
const validator = require('validator');



const User = mongoose.model('User', {
  email:{
    type: String,
    minlength: 8,
    trim: true,
    unique: true,
    validate:{
      validator:validator.isEmail,
      message:'{VALUE} is not a valid email address'
    },
    required: [true, 'email address is requires']

  },
  password:{
    type: String,
    required: true,
    minlength: 6,
    trim: true
  },
  tokens:[
    {
      access:{
        type:String,
        require:true
      },
      token:{
        type:String,
        require:true
      }
    }
  ]

});


module.exports = {User};
