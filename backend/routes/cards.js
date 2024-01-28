/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  deleteLikeCard,
// eslint-disable-next-line import/extensions
} from '../controllers/cards.js';

const cardRouter = Router();

// eslint-disable-next-line import/first
import validateUrl from '../utils/constants.js';

cardRouter.get('/', getCards);

cardRouter.delete('/:cardId', celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), deleteCardById);

cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(
      validateUrl,
    ),
  }),
}), createCard);

cardRouter.put('/:cardId/likes', celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), likeCard);

cardRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), deleteLikeCard);

export default cardRouter;
