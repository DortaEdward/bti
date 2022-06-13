const mongoose = require('mongoose');
const { Schema, model } = mongoose();

const messageSchema = new Schema({
  conversationId:{
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  text: {
    type: String,
    required: true,
    min: 1
  },
}, {
  timestamps: true
});

const messageModel = model('Messages', messageSchema);

module.exports = messageModel;