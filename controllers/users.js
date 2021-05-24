const User = require('../models/users');

const getAllUsers = (req, res) => {
  return User.find({})
    .then((users) => {
      return res.status(200).send({data: users});
    })
    .catch(err => {
      return res.status(500).send({message: err.message});
    });
};

const createUser = (req, res) => {
  const {name, about, avatar} = req.body;
  return User.create({name, about, avatar})
    .then((user) => {
      return res.status(201).send({data: user});
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({message: 'Переданы некорректные данные при создании пользователя'})
      }
      return res.status(500).send({message: err.message});
    });
};

const getUserById = (req, res) => {
  const {userId} = req.params;
  return User.findById(userId)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      return res.status(200).send({data: user});
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        return res.status(404).send({message: 'Пользователь по указанному _id не найден'});
        } else if (err.name === 'CastError') {
        return res.status(400).send({message: 'Переданы некорректные данные'});
      } else {
        return res.status(500).send({message: err.message});
      }
    });
};

const updateProfile = (req, res) => {
  const ownerID = req.user._id;
  const {name, about} = req.body;
  const opts = {runValidators: true, new: true}
  return User.findByIdAndUpdate(ownerID, {name, about}, opts)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      return res.status(200).send({data: user});
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        return res.status(404).send({message: 'Пользователь по указанному _id не найден'});
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({message: 'Переданы некорректные данные при обновлении профиля'});
      } else {
        return res.status(500).send({message: err.message});
      }
    });
};

const updateAvatar = (req, res) => {
  const ownerID = req.user._id;
  const {avatar} = req.body;
  const opts = {runValidators: true, new: true}
  return User.findByIdAndUpdate(ownerID, {avatar}, opts)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      return res.status(200).send({data: user});
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        return res.status(404).send({message: 'Пользователь по указанному _id не найден'});
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({message: 'Переданы некорректные данные при обновлении профиля'});
      } else {
        return res.status(500).send({message: err.message});
      }
    });
};

module.exports = {
  getAllUsers, createUser, getUserById, updateProfile, updateAvatar,
};
