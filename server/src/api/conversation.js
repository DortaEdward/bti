const express = require('express');
const router = express.Router();
const Conversations = require('../db/models/Conversation');
const Users = require('../db/models/User');

// get all conversation for user
router.get('/', async (req, res, next) => {
  try{
    const { userId } = req.query;
    const conversations = await Conversations.find({
      members:{$in:[userId]}
    });
    res.json({conversations: conversations});
  } catch(error){
    next(error);
  }
});

// create conversation
router.post('/', async (req, res, next) => {
  try{
    const { senderId, receiverId } = req.query;

    const senderUser = await Users.findById(senderId);
    const receiverUser = await Users.findById(receiverId);
    if(senderUser && receiverUser){
      if(senderId && receiverId && senderId != receiverId){
        await Conversations.create({members:[senderId, receiverId]})
        res.json(200).json({status:res.statusCode, message:'Conversation Created'});
      } else {
        const err = new Error('Missing User');
        res.status(401);
        next(err);
      }
    } else {
      const err = new Error('Users do not exist');
      res.status(500);
      next(err);
      }

  } catch(error){
    next(error);
  }
});

// delete conversation

module.exports = router;