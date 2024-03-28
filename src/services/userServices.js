const AppService = require('./AppService')
const UserModel = require('../Models/userModal')

class UserService extends AppService {
  constructor() {
    super(UserModel)
  }
}

module.exports = UserService
