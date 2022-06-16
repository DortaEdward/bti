const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { stringConfig, numberConfig } = require('../schemaConfig');

const postSchema = new Schema({
  ownerId : {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  title: {
    ...stringConfig,
  },
  description: {
    ...stringConfig,
  },
  images:[{ 
    type:String
  }],
  latitude:{
    ...numberConfig,
    min: -90,
    max: 90,
  },
  longitude:{
    ...numberConfig,
    min: -180,
    max: 180,
  },
  pictureType:{
    ...stringConfig,
    default:'portrait'
  },
  visitedAt:{
    type:Date,
    required:true,
    default:Date.now()
  },
  rating: [{
    ...numberConfig,
    default: 1
  }]
},{timestamps:true});

const postModel = model('Posts', postSchema);

module.exports = postModel;