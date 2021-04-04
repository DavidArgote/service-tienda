const jwt =  require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

function sign(data) {
  try{
    return jwt.sign(data, config.jwt.secret);
  } catch(e){
    throw error('Invalid data', 400);
  }
}

function verify(token) {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch(e){
    throw error('Invalid Token', 400);
  }
}

const check = {
  own: function(req, owner) {
    const decoded = decodeHeader(req);
    if(decoded._id !== owner) {
      throw error('Not permmission', 401);
    }
  },
  logged: function(req) {
    const decoded = decodeHeader(req);
  }
}

function getToken(auth) {
  if(!auth) {
    throw error('Token not found', 400);
  }
  if(auth.indexOf('Bearer ') === -1) {
    throw error('Format token invalid', 400);
  }
  let token = auth.replace('Bearer ', '');
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);
  req._id = decoded;
  return decoded;
}

module.exports = {
  sign, 
  check,
}