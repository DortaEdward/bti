const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');
const { notFound, errorHandler, checkTokenSetUser } = require('./middlewares');

require('dotenv').config();
// const filter = new Filter();

const authRoute = require('./auth');
const postRoute = require('./api/post');

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

require('./db');

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log('Listening on Port:', PORT);
})
