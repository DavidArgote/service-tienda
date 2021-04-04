const response = require('./response');

function errors(err, req, res, rext) {
  console.error('[Error]', err);
  const message = err.message || 'Internal error';
  const status = err.statusCode || 500;
  response.error(req, res, message, status);
}

module.exports = errors;