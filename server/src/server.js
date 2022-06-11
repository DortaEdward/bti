const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { notFound, errorHandler } = require('./middlewares');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('common'));
app.use(express.json());

require('./db');

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log('Listening on Port:', PORT);
})
