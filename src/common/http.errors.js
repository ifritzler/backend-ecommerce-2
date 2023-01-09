class HttpError extends Error {
  constructor(msg, statusCode, errors = []) {
    super(msg);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
export default HttpError;
