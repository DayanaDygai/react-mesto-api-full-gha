// eslint-disable-next-line import/extensions
import Card from '../models/Card.js';
// eslint-disable-next-line import/extensions
import IncorrectDataError from '../errors/IncorrectDataError.js';
// eslint-disable-next-line import/extensions
import NotFoundError from '../errors/NotFoundError.js';
// eslint-disable-next-line import/extensions
import ForibiddenError from '../errors/ForbiddenError.js';

const STATUS_OK = 200;
// запрос успешно выполнен

const STATUS_OK_CREATED = 201;
// запрос выполнен и создан новый ресурс

export const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.status(STATUS_OK).send(cards);
  } catch (error) {
    return next(error);
  }
};

export const createCard = async (req, res, next) => {
  try {
    const card = await Card.create({ ...req.body, owner: req.user._id });
    return res.status(STATUS_OK_CREATED).send(card);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new IncorrectDataError('Переданны некорректные данны'));
    }
    return next(error);
  }
};

export const deleteCardById = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId).populate(['likes', 'owner']);
    if (!card) {
      throw new NotFoundError('Карточки с указанным ID не существует');
    }
    if (card.owner.toString() !== req.user._id) {
      throw new ForibiddenError('Нет прав для удаления карточки');
    }
    await Card.deleteOne({ _id: cardId });
    return res.status(STATUS_OK).send(card);
  } catch (error) {
    if (error.name === 'CastError') {
      return next(new IncorrectDataError('Указан некорретный ID'));
    }
    return next(error);
  }
};

export const likeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).populate(['likes', 'owner'])
      .orFail(() => new Error('NotFoundError'));
    return res.status(STATUS_OK).send(card);
  } catch (error) {
    if (error.message === 'NotFoundError') {
      return next(new NotFoundError('Пользователь по указанному ID не найден'));
    }
    if (error.name === 'CastError') {
      return next(new IncorrectDataError('Указан некорретный ID'));
    }
    return next(error);
  }
};

export const deleteLikeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).populate(['likes', 'owner']).orFail(() => new Error('NotFoundError'));
    return res.status(STATUS_OK).send(card);
  } catch (error) {
    if (error.message === 'NotFoundError') {
      return next(new NotFoundError('Пользователь по указанному ID не найден'));
    }
    if (error.name === 'CastError') {
      return next(new NotFoundError('Указан некорретный ID'));
    }
    return next(error);
  }
};
