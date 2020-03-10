const express = require('express');
const Task = require('../models/Task');

const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const user = req.user;

  const taskData = req.body;

  taskData.user = user._id;
  taskData.status = 'new';

  const task = new Task(taskData);

  try{
    await task.save();

    res.send('New task has been created by ' + user.username)
  }catch(e){
    return res.status(400).send(e);
  }
});

router.get('/', auth, async (req, res) => {
  const user = req.user;

  const tasks = await Task.find({user: user._id});

  try{
    res.send(tasks);
  }catch(e){
    return res.status(400).send(e);
  }
});

router.put('/:id', auth, async (req, res) => {
  const taskData = req.body;

  try{
    const task = await Task.findOne({_id: req.params.id});

    if(taskData.title){
      task.title = taskData.title;
    }
    if(taskData.description){
      task.description = taskData.description;
    }
    if(taskData.status){
      task.status = taskData.status;
    }

    await task.save();

    res.send({message: 'Task has been updated'});
  }catch(e){
    return res.status(400).send(e);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try{
    await Task.deleteOne({_id: req.params.id});

    res.send({message: 'Task has been successfully deleted'});
  }catch(e){
    return res.status(400).send(e);
  }
});

module.exports = router;