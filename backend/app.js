/* eslint-disable import/extensions */
import express from 'express';
import mongoose from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import cors from 'cors';
// eslint-disable-next-line import/no-extraneous-dependencies
import cookieParser from 'cookie-parser';
// eslint-disable-next-line import/no-extraneous-dependencies
import { errors } from 'celebrate';

import dotenv from 'dotenv';

import router from './routes/index.js';

import handlerError from './middleware/handlerError.js';

import NotFoundError from './errors/NotFoundError.js';

import { requestLogger, errorLogger } from './middleware/logger.js';

dotenv.config();

// eslint-disable-next-line import/first

const app = express();
app.use(cookieParser());
app.use(cors({ origin: ['https://daianamesto.students.nomoredomainsmonster.ru', 'http://daianamesto.students.nomoredomainsmonster.ru', 'http://localhost:3000'], credentials: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(handlerError);

app.listen(3000);
