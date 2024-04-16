const AppServices = require('./AppServices');
const UserModel = require('../models/userModel');

class UserService extends AppServices {
    constructor() {
        super(UserModel);
    }
}

module.exports = UserService; // Corrected from module.export to module.exports
