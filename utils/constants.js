const { PORT = 4000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;


const { ORIGIN } = ['https://karmamovies.nomoredomainsicu.ru', 'http://karmamovies.nomoredomainsicu.ru', 'http://localhost:3000'];


const regexUrl = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/;

module.exports = {
  DB_URL,
  regexUrl,
  PORT,
  ORIGIN,
};
