const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const users = require('./app/users');
const tasks = require('./app/tasks');

const app = express();

app.use(express.json());
app.use(cors());

const run = async () => {
  await mongoose.connect('mongodb://localhost/todolist_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  app.use('/users', users);
  app.use('/tasks', tasks);

  app.listen(config.port, () => {
    console.log('Try using', config.port);
  })
};

run().catch(e => {
  console.log(e);
});