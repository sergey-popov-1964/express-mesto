const express = require('express');
const bodyParser = require('body-parser');
const routesUser = require('./routes/users');
const routesCard = require('./routes/cards');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '60a6ed35bfba341fb05996be' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});
app.use('/', routesUser);
app.use('/', routesCard);




mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.listen(PORT, () => {

});