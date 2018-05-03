const mongoose = require('mongoose');
const validator = require('validator');
const  jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
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
    ]}
);

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  return _.pick(userObject, ['_id','email']);
};


UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  const token = jwt.sign(
    {_id: user._id.toHexString(),access}, 'abc123').toString();
  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(()=>{
    return token;
  });
};

const User = mongoose.model('User', UserSchema);


module.exports = {User};
