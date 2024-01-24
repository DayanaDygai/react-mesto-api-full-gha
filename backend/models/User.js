import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [2, 'минимальная длинна 2 символа'],
      maxlength: [30, 'максимальная длинна 30 символов'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'минимальная длинна 2 символа'],
      maxlength: [30, 'максимальная длинна 30 символов'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Некорректный URL',
      },
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      required: {
        value: true,
        message: 'Поле email яявляется обязательным',
      },
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Некорректный формат email',
      },
    },

    password: {
      type: String,
      required: {
        value: true,
        message: 'Поле password яявляется обязательным',
      },
      select: false,
    },
  },
  { versionKey: false },
);

export default mongoose.model('user', userSchema);

// name — имя пользователя, строка от 2 до 30 символов, обязательное поле;
// about — информация о пользователе, строка от 2 до 30 символов, обязательное поле;
// avatar — ссылка на аватарку, строка,
//  обязательное поле.
