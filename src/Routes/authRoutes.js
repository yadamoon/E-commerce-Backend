const express = require('express');
const { createUser,
    loginCtrl,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserById,
    blockUser,
    unBlockUser,
    handleRefreshToken } = require('../Controllers/userController');
const { authMiddleware, isAdmin } = require("../Middleware/authMiddleware")
const router = express.Router();
router.post('/register', createUser);
router.post('/login', loginCtrl);
router.get('/allUsers', getAllUsers);
router.get('/:id', authMiddleware, isAdmin, getUserById);
router.delete('/:id', deleteUserById);
router.put('/:id', authMiddleware, updateUserById);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unBlockUser);
router.get('/refresh', authMiddleware, handleRefreshToken);


module.exports = router;

