class ERR_NOT_AUTH extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = ERR_NOT_AUTH;
