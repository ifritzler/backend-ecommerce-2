const errorHandler = (err, req, res, next) => {
  if (err.statusCode && err.message && err.errors) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
      success: false,
    });
  } else {
    res.sendStatus(400);
  }
  next();
};
module.exports = errorHandler;
