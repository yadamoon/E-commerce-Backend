const express = require('express');
const { createUser, loginCtrl, getAllUsers, getUserById, deleteUserById, updateUserById } = require('../Controllers/userController');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginCtrl);
router.get('/allUsers', getAllUsers);
router.get('/:id', getUserById)
router.delete('/:id', deleteUserById);
router.put('/:id',updateUserById)

module.exports = router;

