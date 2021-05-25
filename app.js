const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const routes = require('./routes/index');

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '60a6ed35bfba341fb05996be',
  };
  next();
});

app.use(routes);
routes.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
});
