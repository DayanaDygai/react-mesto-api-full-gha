/* eslint-disable import/named */
/* eslint-disable import/extensions */
import express from 'express';
import mongoose from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import { errors, celebrate, Joi } from 'celebrate';

import dotenv from 'dotenv';

import cors from 'cors';
// eslint-disable-next-line import/no-extraneous-dependencies
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';
import auth from './middleware/auth.js';

import handlerError from './middleware/handlerError.js';

// import NotFoundError from './errors/NotFoundError.js';

import { requestLogger, errorLogger } from './middleware/logger.js';

import { login, createUser } from './controllers/users.js';

// eslint-disable-next-line import/order

import validateUrl from './utils/constants.js';
// import cookieParser from 'cookie-parser';

dotenv.config();

// eslint-disable-next-line import/first

const app = express();
app.use(cors({ origin: 'https://daianamesto.students.nomoredomainsmonster.ru', credentials: true, maxAge: 60 }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(auth);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
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

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

// eslint-disable-next-line comma-spacing
app.use('/', router);

app.use(errorLogger);

app.use(errors());

// app.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(handlerError);

app.listen(3000);
