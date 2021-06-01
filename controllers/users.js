const bcrypt = require('bcryptjs');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

const getAllUsers = (req, res) => User.find({})
  .then((user) => res.status(200).send({data: user}))
  .catch((err) => res.status(500).send({message: err.message}));

const createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(200).send({data: user})
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({message: 'Переданы некорректные данные при создании пользователя'});
      }
      res.status(500).send({message: err.message});
    });
};

const getUserById = (req, res) => {
  const {userId} = req.params;
  return User.findById(userId)
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send({data: user}))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({message: 'Пользователь по указанному _id не найден'});
      } else if (err.name === 'CastError') {
        res.status(400).send({message: 'Переданы некорректные данные'});
      } else {
        res.status(500).send({message: err.message});
      }
    });
};

const updateProfile = (req, res) => {
  const ownerID = req.user._id;
  const {name, about} = req.body;
  const opts = {runValidators: true, new: true};
  return User.findByIdAndUpdate(ownerID, {name, about}, opts)
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send({data: user}))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({message: 'Пользователь по указанному _id не найден'});
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({message: 'Переданы некорректные данные при обновлении профиля'});
      } else {
        res.status(500).send({message: err.message});
      }
    });
};

const updateAvatar = (req, res) => {
  const ownerID = req.user._id;
  const {avatar} = req.body;
  const opts = {runValidators: true, new: true};
  return User.findByIdAndUpdate(ownerID, {avatar}, opts)
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send({data: user}))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({message: 'Пользователь по указанному _id не найден'});
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({message: 'Переданы некорректные данные при обновлении профиля'});
      } else {
        res.status(500).send({message: err.message});
      }
    });
};

const login = (req, res) => {
  const {email, password} = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        {_id: user._id},
        'some-secret-key',
        {expiresIn: '7d'}
      );
      res.send({
        token
      });
    })
    .catch((err) => {
      res.status(401).send({message: err.message});
    });
};

module.exports = {
  getAllUsers, createUser, getUserById, updateProfile, updateAvatar, login,
};
