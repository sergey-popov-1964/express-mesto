const User = require('../models/users');

const getAllUsers = (req, res) => {
  console.log("Find all users")
  return User.find({})
    .then((users) => {
      return res.status(200).send({data: users})
    })
    .catch(err => {
        return res.status(500).send({message: err.message})
      }
    );
};

const createUser = (req, res) => {
  const {name, about, avatar} = req.body;
  return User.create({name, about, avatar})
    .then((user) => {
      return res.status(201).send({data: user})
    })
    .catch(err => {
        if (err.name === 'ValidationError') {
          return res.status(400).send({message: 'Переданы некорректные данные при создании пользователя'})
        }
        return res.status(500).send({message: err.message})
      }
    );
};

const getUserById = (req, res) => {
  console.log("Find user by ID")
  const {userId} = req.params
  return User.findById(userId)
    .then((user) => {
      if (user) {
        return res.status(200).send({data: user})
      }
      return res.status(404).send({message: 'Пользователь по указанному _id не найден'})
    })
    .catch(err => {
        return res.status(500).send({message: err.message})
      }
    );
};

const updateProfile = (req, res) => {
  const ownerID = req.user._id;
  const {name, about} = req.body;
  return User.findByIdAndUpdate(ownerID, {name, about})
    .then((user) => {
      if (user) {
        return res.status(201).send({data: user})
      }
      return res.status(404).send({message: 'Пользователь по указанному _id не найден'})
    })
    .catch(err => {
        if (err.name === 'ValidationError') {
          res.status(400).send({message: 'Переданы некорректные данные при обновлении профиля'})
        }
        return res.status(500).send({message: err.message})
      }
    );
}

const updateAvatar = (req, res) => {
  const ownerID = req.user._id;
  const {avatar} = req.body;
  return User.findByIdAndUpdate(ownerID, {avatar})
    .then((user) => {
      if (user) {
        return res.status(200).send({data: user})
      }
      return res.status(404).send({message: 'Пользователь по указанному _id не найден'})
    })
    .catch(err => {
        if (err.name === 'ValidationError') {
          res.status(400).send({message: 'Переданы некорректные данные при обновлении профиля'})
        }
        return res.status(500).send({message: err.message})
      }
    );
}

module.exports = {
  getAllUsers, createUser, getUserById, updateProfile, updateAvatar
}