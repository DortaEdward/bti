const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { notFound, errorHandler, checkTokenSetUser, isLoggedIn } = require('./middlewares');

require('dotenv').config();

// const Filter = require('bad-words');
// const filter = new Filter();

const authRoute = require('./auth');
const postRoute = require('./api/post');
const conversationRoute = require('./api/conversation');

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('common'));
app.use(express.json());
app.use(checkTokenSetUser);

app.get('/', async (req,res,next) => {
  res.send(req.user);
})

app.use(rateLimit({ windowMs: 10 * 1000, max: 1 }));

app.use(`/api/v${process.env.VERSION}/auth`, authRoute);
app.use(`/api/v${process.env.VERSION}/post`, postRoute);
app.use(`/api/v${process.env.VERSION}/conversation`, conversationRoute, isLoggedIn);

require('./db');

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log('Listening on Port:', PORT);
})
