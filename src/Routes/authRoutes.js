const express = require('express');
const { createUser, loginCtrl, getAllUsers, getUserById, deleteUserById, updateUserById  } = require('../Controllers/userController');
const {authMiddleware , isAdmin} = require("../Middleware/authMiddleware")
const router = express.Router();

router.post('/register', createUser);
router.post('/login',loginCtrl,isAdmin);
router.get('/allUsers', getAllUsers);
router.get('/:id', authMiddleware,isAdmin,getUserById)
router.delete('/:id', deleteUserById);
router.put('/:id',authMiddleware ,updateUserById)

module.exports = router;

