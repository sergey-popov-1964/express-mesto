const routesUser = require('express').Router();
const {
  getAllUsers, getUserById, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

routesUser.get('/users', getAllUsers);
routesUser.get('/users/me', getCurrentUser);
routesUser.get('/users/:userId', getUserById);
routesUser.patch('/users/me/', updateProfile);
routesUser.patch('/users/me/avatar', updateAvatar);

module.exports = routesUser;
