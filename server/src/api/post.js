const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { isLoggedIn } = require('../middlewares/index')
const Posts = require('../db/models/Post');

const postSchema = Joi.object({
  ownerId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  latitude: Joi.number()
    .min(-90)
    .max(90)
    .required(),
  longitude: Joi.number()
    .min(-180)
    .max(180)
    .required(),
  images: Joi.array(),
  rating: Joi
    .number()
    .min(1)
    .max(5),
  visitedAt: Joi.date()
})

// get user posts
router.get('/users', async (req, res, next) => {
  try {
    const {
      ownerId
    } = req.query;
    if (ownerId) {
      const usersPost = await Posts.find({
        ownerId: ownerId
      });
      res.status(200).json({
        status: res.statusCode,
        posts: usersPost
      });
    } else {
      const error = new Error("User's Post Not Found");
      res.status(404)
      next(error);
    }
  } catch (error) {
    next(error)
  }
})

// get post by id
router.get('/', async (req, res, next) => {
  try {
    const {
      id
    } = req.query;
    if (id) {
      const foundPost = await Posts.findById(id);
      if (foundPost) {
        res.status(200).json({
          status: res.statusCode,
          post: foundPost
        });
      } else {
        const error = new Error('Post Not Found');
        res.status(404).
        next(error);
      }
    } else {
      const error = new Error('Missing Params');
      res.status(404).
      next(error);
    }
  } catch (err) {
    next(err);
  }
});

router.use(isLoggedIn);

// create post
router.post('/create', async (req, res, next) => {
  try {
    const validBody = await postSchema.validateAsync(req.body);
    if (validBody) {
      const createdPost = await Posts.create(req.body);
      res.status(200).json({
        status: res.statusCode,
        message: 'Post Created'
      });
    } else {
      const err = new Error('Invalid Entries');
      res.status(500);
      next(err);
    }
  } catch (error) {
    next(error)
  }
});


// update post
router.put('/update', async (req, res, next) => {
  try {
    const {
      userId,
      postId
    } = req.query;
    if (req.user._id === userId) {
      await Posts.findByIdAndUpdate(postId, req.body, {
        new: true
      });
      res.status(200).json({
        status: res.statusCode,
        message: 'Post Updated'
      });
    } else {
      const err = new Error("Unable to update post you don't own");
      res.status(500);
      next(err);
    }
  } catch (error) {
    next(error);
  }
});

// delete post
router.delete('/delete', async (req, res, next) => {
  try {
    const {
      userId,
      postId
    } = req.query;
    if (req.user._id === userId) {
      await Posts.findByIdAndDelete(postId);
      res.status(200).json({
        status: res.statusCode,
        message: 'Post Deleted'
      });
    } else {
      const err = new Error("Unable to update post you don't own");
      res.status(500);
      next(err);
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router;