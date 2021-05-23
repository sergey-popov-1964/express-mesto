const routesUser = require('express').Router();
const { createUser, getAllUsers, getUserById, updateProfile, updateAvatar} = require('../controllers/users');

routesUser.get('/users', getAllUsers);
routesUser.post('/users', createUser);
routesUser.get('/users/:userId', getUserById)
routesUser.patch('/users/me/', updateProfile);
routesUser.patch('/users/me/avatar', updateAvatar);

module.exports = routesUser;
