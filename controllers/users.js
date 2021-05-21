const User = require('../models/users');

module.exports.getAllUsers = (req, res) => {
  console.log("Find all users")
  User.find({})
    .then( (users) => {
      res.send({data: users})
      console.log(users)
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
    .then((user) => res.send({data: user}))
    .catch(err => res.status(500).send({message: err.message}));
};

module.exports.getUserById = (req, res) => {
  console.log("Find user by ID")
  User.findById(req.params.userId)
    .then( (user) => {
      res.send({data: user})
      console.log(user)
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

