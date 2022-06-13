const mongoose = require('mongoose');
const { Schema , model } = mongoose;

const conversationSchema = new Schema({
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'Users',
    default: []
  }],
}, {timestamps:true});

const conversationModel = model('Conversations', conversationSchema);

module.exports = conversationModel;