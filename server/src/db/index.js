const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURI);

const {connection: db} = mongoose;

db.on('connected',() => {
  console.log('Database Connected');
});

db.on('disconnected',() => {
  console.log('Database Disconnected');
});

db.on('error', err => {
  console.log('Error Occurred:', err);
});

module.exports = db;