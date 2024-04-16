const express = require('express');
const { createUser,
    loginCtrl,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserById,
    blockUser,
    unBlockUser,
    handleRefreshToken,
    logOut
 } = require('../controllers/userController');
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware")
const router = express.Router();
router.post('/register', createUser);
router.post('/login', loginCtrl);
router.get('/allUsers', getAllUsers);
router.get('/:id', authMiddleware, isAdmin, getUserById);
router.get('/refresh', handleRefreshToken);
router.get('/logOut',logOut)
router.delete('/:id', deleteUserById);
router.put('/:id', authMiddleware, updateUserById);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unBlockUser);



module.exports = router;

