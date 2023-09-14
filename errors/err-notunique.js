class ERR_NOT_UNIQUE extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ERR_NOT_UNIQUE;
