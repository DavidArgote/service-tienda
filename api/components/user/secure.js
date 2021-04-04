const auth = require('../../../auth');

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch(action) {
      case 'update':
        const owner = req.body._id;
        auth.check.own(req, owner);
        next();
        break;
      case 'auth':
        auth.check.logged(req);
        next();
      default:
        next();
    }
  }

  return middleware;
}