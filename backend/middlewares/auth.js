const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../environment/env');
const AuthorizationError = require('../errors/authorizationError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (e) {
    const err = new AuthorizationError('Необходима авторизация!');
    next(err);
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next();
};
