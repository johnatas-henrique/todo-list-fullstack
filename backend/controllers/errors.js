const objError = {
  not_found: 404,
  already_exists: 409,
  exists_with_another_id: 409,
  invalid_data: 422,
};

const otherError = async (err, _req, res, _next) => {
  const statusCode = objError[err.code] || 500;
  const error = { message: err.message, code: err.code || 'internal_error' };
  return res.status(statusCode).json(error);
};

const joiError = (err) => {
  if (err.details) {
    return {
      error: true,
      message: err.details[0].message,
      code: 'invalid_data',
    };
  }
  return err;
};

module.exports = {
  otherError,
  joiError,
};
