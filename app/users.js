const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  const userData = req.body;

  const user = new User(userData);

  try{
    await user.save();

    res.send(user);
  }catch(e){
    return res.status(400).send(e);
  }
});

router.post('/sessions', async (req, res) => {
  const user  = await User.findOne({username: req.body.username});

  if(!user) return res.status(400).send({error: 'User not found!'});

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if(!isMatch) return res.status(400).send({error: 'Wrong password!'});

  user.generateToken();

  try{
    await user.save();

    res.send({token: user.token});
  }catch(e){
    return res.status(400).send(e);
  }
});

module.exports = router;