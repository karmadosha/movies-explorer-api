const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const urlValidate = (v, helpers) => {
  if (validator.isURL(v)) {
    return v;
  }
  return helpers.message('Введен некорректный URL');
};

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateMovieCreate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValidate),
    trailerLink: Joi.string().required().custom(urlValidate),
    thumbnail: Joi.string().required().custom(urlValidate),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const validateMovieDelete = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validateUser,
  validateLogin,
  validateUserInfo,
  validateMovieCreate,
  validateMovieDelete,
};
