const jwt = require('jsonwebtoken');
const { SERVER_PORT, DB } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;
const AuthorizationError = require('../errors/authorizationError');
// защищает роуты авторизацией, если  нет токена, то кидает ошибку

module.exports = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET || SECRET_STRING;
  let payload;
  try {
    const token = req.header("Authorization").split(" ")[1];
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthorizationError('Необходима авторизация');
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next();
};
