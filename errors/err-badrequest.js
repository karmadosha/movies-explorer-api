class ERR_BAD_REQUEST extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = ERR_BAD_REQUEST;
