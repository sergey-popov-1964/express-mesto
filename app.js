const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/users');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use('/', routes);
app.use('/users', require('./routes/users'));

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.listen(PORT, () => {

});