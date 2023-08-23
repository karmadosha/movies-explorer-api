const ERR_BAD_REQUEST = require('../errors/err-badrequest');
const ERR_FORBIDDEN = require('../errors/err-forbidden');
const ERR_NOT_FOUND = require('../errors/err-notfound');
const Movie = require('../models/movie');

module.exports.getUserMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies.reverse()))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ERR_BAD_REQUEST('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  Movie.findById(_id)
    .then((movie) => {
      if (!movie) {
        throw new ERR_NOT_FOUND('Фильм с указанным id не найден');
      } else if (!movie.owner.equals(req.user._id)) {
        throw new ERR_FORBIDDEN('Недостаточно прав для удаления фильма.');
      }
      return Movie.deleteOne(movie)
        .then(() => res.send({ message: 'Фильм удален' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ERR_BAD_REQUEST('Переданы некорректные данные при удалении фильма.'));
      } else {
        next(err);
      }
    });
};
