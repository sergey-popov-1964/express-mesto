const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const {authorization} = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new Error('Необходима авторизация1');
    err.statusCode = 401;
    next(err);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (e) {
    const err = new Error('Необходима авторизация2');
    err.statusCode = 401;
    next(err);
  }
  req.user = payload;
  next();
};
