const router = require('express').Router();
const { createUser, getAllUsers } = require('../controllers/users');

router.get('/users', getAllUsers);
// router.get('/users/:userId', getUsersById);
router.post('/users', createUser);

module.exports = router;
