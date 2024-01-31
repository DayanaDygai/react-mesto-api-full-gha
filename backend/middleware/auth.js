// /* eslint-disable consistent-return */
// // eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
// import jwt from 'jsonwebtoken';

// // eslint-disable-next-line import/extensions
// import NotAuthenticateError from '../errors/NotAuthenticateError.js';

// const { NODE_ENV, JWT_SECRET } = process.env;
// // eslint-disable-next-line func-names
// const auth = (req, res, next) => {
//   const token = req.cookies.JWT_SECRET;
//   let payload;
//   try {
//     payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
//   } catch (error) {
//     return next(new NotAuthenticateError('Необходимо авторизоваться'));
//   }
//   req.user = payload;
//   next();
// };

// export default auth;

/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';

// eslint-disable-next-line import/extensions
import NotAuthenticateError from '../errors/NotAuthenticateError.js';

const { NODE_ENV, JWT_SECRET } = process.env;
// eslint-disable-next-line func-names
const auth = (req, res, next) => {
  let payload;
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new NotAuthenticateError('Необходимо авторизоваться');
    }
    const validToken = token.replace('Bearer ', '');

    payload = jwt.verify(validToken, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (error) {
    if (error.mesage === 'NotAuthanticate') {
      throw new NotAuthenticateError('Необходимо авторизоваться');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new NotAuthenticateError('Необходимо авторизоваться');
    }
    return next(error);
  }

  req.user = payload;
  next();
};

export default auth;
