const express = require('express');
const { createUser , loginCtrl } = require('../Controllers/userController');
const router = express.Router();

router.post('/register', createUser);
router.post('/login',loginCtrl);
module.exports = router;

