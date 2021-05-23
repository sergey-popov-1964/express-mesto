const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;

const routes = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '60a6ed35bfba341fb05996be'
  };
  next();
});

app.use(routes);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.listen(PORT, () => {

});