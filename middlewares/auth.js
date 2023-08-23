const jwt = require('jsonwebtoken');
const ERR_AUTH = require('../errors/err-auth');
const message = require('../utils/constants');

const { NODE_ENV, SECRET_KEY } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new ERR_AUTH(message.general.forbiddenError);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'some-secret-key');
  } catch (err) {
    throw new ERR_AUTH(message.general.forbiddenError);
  }

  req.user = payload;
  next();
};

module.exports = auth;
