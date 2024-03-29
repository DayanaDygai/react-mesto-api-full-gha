/* eslint-disable consistent-return */
/* eslint-disable max-len */
// eslint-disable-next-line import/extensions, import/no-unresolved, import/no-extraneous-dependencies
import bcrypt from 'bcrypt';

// eslint-disable-next-line import/extensions
import ConflictError from '../errors/ConflictError.js';
// eslint-disable-next-line import/extensions
import IncorrectDataError from '../errors/IncorrectDataError.js';
// eslint-disable-next-line import/extensions
import NotFoundError from '../errors/NotFoundError.js';
// eslint-disable-next-line import/extensions
import NotAuthenticateError from '../errors/NotAuthenticateError.js';

// eslint-disable-next-line import/extensions
import User from '../models/User.js';
// eslint-disable-next-line import/extensions
import generateToken from '../utils/jwt.js';

// oшибка по-умолчанию

const STATUS_OK = 200;
// запрос успешно выполнен

const STATUS_OK_CREATED = 201;
// запрос выполнен и создан новый ресурс

const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SOLT_ROUND = 10;

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new NotAuthenticateError('Не верные логин или пароль');
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new NotAuthenticateError('Не верные логин или пароль');
    }
    const token = generateToken({ _id: user._id });
    return res.status(STATUS_OK).send({ token });
  } catch (error) {
    return next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(STATUS_OK).send(users);
  } catch (error) {
    return next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).orFail(
      () => new Error('NotFoundError'),
    );
    return res.status(STATUS_OK).send(user);
  } catch (error) {
    if (error.message === 'NotFoundError') {
      return next(new NotFoundError('Пользователь с данным ID не найден'));
    }

    if (error.name === 'CastError') {
      return next(new IncorrectDataError('Передан некорректный ID'));
    }

    return next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, SOLT_ROUND);
    const newUser = await User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    });
    return res.status(STATUS_OK_CREATED).send({
      name: newUser.name,
      about: newUser.about,
      avatar: newUser.avatar,
      email: newUser.email,
    });
  } catch (error) {
    if (error.code === MONGO_DUPLICATE_ERROR_CODE) {
      return next(new ConflictError('Такой пользователь уже существует'));
    }
    if (error.name === 'ValidationError') {
      return next(new NotAuthenticateError('Переданы неккоректные данные'));
    }
    return next(error);
  }
};

export const editInfoUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    ).orFail(() => new Error('NotFoundError'));
    return res.status(STATUS_OK).send(user);
  } catch (error) {
    if (error.message === 'NotFoundError') {
      return next(new NotFoundError('Пользователь не найден'));
    }
    if (error.name === 'ValidationError') {
      return next(new IncorrectDataError('Переданы неккоректные данные'));
    }
    return next(error);
  }
};

export const editAvatarUser = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const updateAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: 'true', runValidators: true },
    ).orFail(() => new Error('NotFoundError'));
    return res.status(STATUS_OK).send(updateAvatar);
  } catch (error) {
    if (error.message === 'NotFoundError') {
      return next(new NotFoundError('Пользователь не найден'));
    }
    if (error.name === 'ValidationError') {
      return next(new IncorrectDataError('Переданы неккоректные данные'));
    }
    return next(error);
  }
};

export const getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    return res.status(STATUS_OK).send({
      name: user.name,
      email: user.email,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    });
  } catch (error) {
    return next(error);
  }
};
