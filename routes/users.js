const routesUser = require('express').Router();
const { createUser, getAllUsers, getUserById } = require('../controllers/users');

routesUser.get('/users', getAllUsers);
routesUser.get('/users/:userId', getUserById);
routesUser.post('/users', createUser);

module.exports = routesUser;
