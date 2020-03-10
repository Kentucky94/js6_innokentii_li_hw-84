const User = require('../models/User');

const auth = async (req, res, next) => {
  const authorizationData = req.get('Authorization');

  if(!authorizationData) return res.status(400).send({error: 'No authorization data'});

  const [type, token] = authorizationData.split(' ');

  if(type !== 'Token' || !token) return res.status(400).send({error: 'Authorization type is wrong or no token!'});

  const user = await User.findOne({token});

  if(!user) return res.status(400).send({error: 'User not found or incorrect token used!'});

  req.user = user;

  next();
};

module.exports = auth;