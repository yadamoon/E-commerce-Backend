const express = require('express')
const UserController = require('../Controllers/userController')
// const { authGuard } = require('../Middleware/authMiddleware')
const router = express.Router()
const userController = new UserController()

router.post('/', userController.createUser.bind(userController))
router.get('/:id', userController.getUserById.bind(userController))
router.get('/',  userController.getAllUsers.bind(userController))
router.put(
  '/:id',
  
  userController.updateUserById.bind(userController)
)
router.delete(
  '/:id',userController.deleteUserById.bind(userController)
)
module.exports = router
