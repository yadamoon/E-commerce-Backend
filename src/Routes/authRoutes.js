const express = require('express');
const { createUser, loginCtrl, getAllUsers, getUserById } = require('../Controllers/userController');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginCtrl);
router.get('/allUsers', getAllUsers);
router.get('/:id', getUserById)
module.exports = router;

