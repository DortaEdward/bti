const express = require('express');
const { Schema, model } = express();

const { stringConfig, booleanConfig } = require('../schemaConfig');

const UserSchema = new Schema({
  email:{
    ...stringConfig,
    unique:true
  },
  displayName:{
    ...stringConfig,
  },
  userImage:{
    ...stringConfig,
    default:'user.png'
  },
  password:{
    ...stringConfig,
  },
  admin:{
    ...booleanConfig,
    default:false
  }
});

const Users = model('Users', UserSchema);

module.exports = Users;