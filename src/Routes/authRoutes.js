const express = require('express');
const { createUser, loginCtrl, getAllUsers, getUserById, deleteUserById, updateUserById  } = require('../Controllers/userController');
const {authMiddleware , isAdmin} = require("../Middleware/authMiddleware")
const router = express.Router();

router.post('/register', createUser);
router.post('/login',  loginCtrl,isAdmin);
router.get('/allUsers', getAllUsers);
router.get('/:id', authMiddleware , getUserById)
router.delete('/:id', deleteUserById);
router.put('/:id',updateUserById)

module.exports = router;

