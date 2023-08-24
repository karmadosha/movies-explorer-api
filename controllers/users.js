const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ERR_NOT_UNIQUE = require('../errors/err-notunique');
const ERR_BAD_REQUEST = require('../errors/err-badrequest');
const ERR_NOT_FOUND = require('../errors/err-notfound');

const { NODE_ENV, SECRET_KEY } = process.env;

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    })
      .then((user) => res.send({
        email: user.email,
        name: user.name,
        _id: user._id,
      }))
      .catch((err) => {
        if (err.name === 'CastError' || err.name === 'ValidationError') {
          return next(new ERR_BAD_REQUEST('Переданы некорректные данные при создании пользователя'));
        }
        if (err.code === 11000) {
          return next(new ERR_NOT_UNIQUE('Пользователь с таким email уже существует'));
        }
        return next(err);
      }));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? SECRET_KEY : 'some-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 7 * 24,
        httpOnly: true,
        sameSite: true,
        secure: true,
      })
        .send({ token });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Успешный выход' });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ name: user.name, email: user.email }))
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new ERR_NOT_FOUND('Пользователь не найден'));
      }
      return res.send({ email, name });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ERR_NOT_UNIQUE('Такой пользователь уже существует'));
      }
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new ERR_BAD_REQUEST('Переданы некорректные данные'));
      }
      return (next);
    });
};
