/* eslint-disable import/no-extraneous-dependencies */
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUserById,
  getUsers,
  editInfoUser,
  editAvatarUser,
  // eslint-disable-next-line import/named
  getMyProfile,
// eslint-disable-next-line import/extensions
} from '../controllers/users.js';
// eslint-disable-next-line import/extensions
import validateUrl from '../utils/constants.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/me', getMyProfile);

userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).required(),
  }),
}), getUserById);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), editInfoUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(
      validateUrl,
    ),
  }),
}), editAvatarUser);

export default userRouter;
