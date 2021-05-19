const router = require('express').Router();
const { getAllUsers, getUsersById, createUser } = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:userId', getUsersById);
router.post('/users', createUser);

module.exports = router;