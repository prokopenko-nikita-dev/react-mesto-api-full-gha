const { FORBIDDEN } = require('./errorStatuses');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

module.exports = ConflictError;
