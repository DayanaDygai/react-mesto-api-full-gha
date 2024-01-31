/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import { Router } from 'express';
// eslint-disable-next-line import/extensions
import userRouter from './users.js';
// eslint-disable-next-line import/extensions
import cardRouter from './cards.js';
// eslint-disable-next-line import/extensions

import { login, createUser } from '../controllers/users.js';

// eslint-disable-next-line import/order
import { celebrate, Joi } from 'celebrate';

import auth from '../middleware/auth.js';

import validateUrl from '../utils/constants.js';

const router = Router();

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(
      validateUrl,
    ),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

router.post('/logout', logout);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

export default router;
