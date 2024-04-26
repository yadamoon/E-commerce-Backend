const bcrypt = require('bcrypt')
const UserService = require('../services/UserServices'); // Corrected file name
const csvParser = require('csv-parser')
class UserController {
  constructor() {
    this.userService = new UserService()
  }

  // async createUser(req, res) {
  //   const { password, ...rest } = req.body

  //   // Hash the password
  //   const saltRounds = 10
  //   const hashedPassword = await bcrypt.hash(password, saltRounds)

  //   // Store the user in the database with the hashed password
  //   const user = await this.userService.create({
  //     password: hashedPassword,
  //     ...rest,
  //   })
  //   res.status(201).json(user)
  // }
  async createUser(req, res) {
    const { password, ...rest } = req.body;

    // Check if password is present in the request body
    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    try {
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Store the user in the database with the hashed password
        const user = await this.userService.create({
            password: hashedPassword,
            ...rest,
        });
        res.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

  async getUserById(req, res) {
    const user = await this.userService.findById(req.params.id)
    res.json(user)
  }

  async getAllUsers(req, res) {
    const users = await this.userService.findAll()
    res.json(users)
  }

  async updateUserById(req, res) {
    const user = await this.userService.updateById(req.params.id, req.body)
    res.json(user)
  }

  async deleteUserById(req, res) {
    const user = await this.userService.deleteById(req.params.id)
    res.json(user)
  }

  
}

module.exports = UserController
