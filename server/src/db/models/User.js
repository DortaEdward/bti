const mongoose = require('mongoose');
const { Schema, model } = mongoose;

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
  },
  friends:[{
    type: Schema.Types.ObjectId,
    ref:'Users',
    default: []
  }],
  saved:[{
    type: Schema.Types.ObjectId,
    ref:'Locations',
    default: []
  }],
  shared:[{
    type: Schema.Types.ObjectId,
    ref:'Shares',
    default: []
  }]
});

const Users = model('Users', UserSchema);

module.exports = Users;