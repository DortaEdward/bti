const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { notFound, errorHandler, checkTokenSetUser } = require('./middlewares');

require('dotenv').config();

const authRoute = require('./auth');
const postRoute = require('./api/post');

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('common'));
app.use(express.json());
app.use(checkTokenSetUser);

app.use(`/api/v${process.env.VERSION}/auth`, authRoute);
app.use(`/api/v${process.env.VERSION}/post`, postRoute);

app.get('/', async (req,res,next) => {
  res.send(req.user);
})

require('./db');

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log('Listening on Port:', PORT);
})
