class ForibiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

export default ForibiddenError;
