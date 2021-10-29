const objError = {
  notFound: 404,
  alreadyExists: 409,
  invalidData: 422,
  internalError: 500,
};

const otherError = async (err, _req, res, _next) => {
  const { code = 'internalError' } = err;
  const statusCode = objError[code];
  const error = { message: err.message, code };
  return res.status(statusCode).json(error);
};

const joiError = (err) => (
  { error: true, message: err.details[0].message, code: 'invalidData' }
);

module.exports = {
  otherError,
  joiError,
};
