const auth = require('../../../auth');

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch(action) {
      case 'auth':
        auth.check.logged(req);
        next();
        break
      default:
        next();
    }
  }
  return middleware;
}