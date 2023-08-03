const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY } = process.env;
const AuthorizationError = require('../errors/authorizationError');
// защищает роуты авторизацией, если  нет токена, то кидает ошибку

module.exports = (req, res, next) => {
  let payload;
  try {
    const token = req.header("Authorization").split(" ")[1];
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'dev-key');
  } catch (err) {
    throw new AuthorizationError('Необходима авторизация');
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next();
};
