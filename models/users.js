const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: false,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: false,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    validate: [{validator: isEmail}],
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({email}) // this — это модель User
    .then((user) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user; // теперь user доступен
        });

    });

};


module.exports = mongoose.model('user', userSchema);
