// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line import/prefer-default-export
const generateToken = (payload) => jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

export default generateToken;
