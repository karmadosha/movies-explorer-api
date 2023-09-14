class ERR_FORBIDDEN extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ERR_FORBIDDEN;
