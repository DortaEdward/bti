const express = require('express');
const { Schema, model } = express();

const { stringConfig, booleanConfig } = require('../schemaConfig');


const shareSchema = new Schema({
  
})

const Shares = model('Shares',shareSchema);

module.exports = Shares;