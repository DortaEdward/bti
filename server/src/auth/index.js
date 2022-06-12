const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { createJWT, isLoggedIn } = require('../middlewares');

const Users = require('../db/models/User');

const registerSchema = Joi.object({
    displayName: Joi.string().required(),
    userImage: Joi.string().required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(8)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
})
const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .min(8)
      .max(30)
      .required()
})

router.get('/', async (req,res,next) => {
  try{
    const users = await Users.find();
    res
      .status(200)
      .json({
        status:200,
        users:users
      })
  }catch(err){
    next(err);
  }
});


// register user
router.post('/register', async (req,res,next) => {
  try {
    const validBody = await registerSchema.validateAsync(req.body);
    if(validBody){
      const userData = req.body;
      const salt = bcrypt.genSaltSync(10);
      userData.password = bcrypt.hashSync(userData.password, salt);
      const user = await Users.create(userData);
      await user.save();
      delete user._doc.password;
      res.status(200).json({
        status: 200,
        message:'User Created'
      });
    } else{
      const err = new Error('Invalid Values');
      next(err);
    }
  } catch (err) {
    next(err);
  }
})

// log in user
router.post('/login', async (req,res,next) => {
  try{
    const validBody = await loginSchema.validateAsync(req.body);
    if(validBody){
      const user = await Users.findOne({email:req.body.email});
      const validPassword = bcrypt.compareSync(req.body.password, user.password);
      if(validPassword){
        delete user._doc.password;
        createJWT(user,res);
      } else{
        const err = new Error('Invalid Credentials');
        next(err);
      }
    } else{
      const err = new Error('Invalid Credentials');
      next(err);
    }
  }catch(err){
    next(err)
  }
});

// forgot password

/*
  route that finds user than if user exist send email with jwt

  route that verifies jwt and allows user to change password
*/


router.use(isLoggedIn);
// update user
router.put('/update', async (req, res, next) => {
  try {
    const { userId } = req.query;
    if(userId && userId === req.user._id){
      await Users.findByIdAndUpdate(userId,req.body,{new:true});
      res.status(200).json({status:res.statusCode, message:'User Updated'});
    } else{
      const err = new Error('Unauthorized');
      res.status(500);
      next(err);
    }
  } catch (error) {
    next(error);
  }
})
// delete user
router.delete('/delete', async (req, res, next) => {
  try{
    const { userId } = req.query;
    if(userId && userId === req.user._id){
      await Users.findByIdAndDelete(userId);
      res.status(200).json({status:res.statusCode, message:'User deleted'});
    }
  } catch(error) {
    next(error);
  }
})

module.exports = router;