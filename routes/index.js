const router = require('express').Router();
const { validateUser, validateLogin } = require('../middlewares/validation');
const { createUser, login, signout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const ERR_NOT_FOUND = require('../errors/err-notfound');

router.post('/signup', validateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.post('/signout', signout);

router.use('/*', (req, res, next) => {
  next(new ERR_NOT_FOUND('Страница не найдена'));
});

module.exports = router;
