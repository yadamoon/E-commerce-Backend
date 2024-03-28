const bcrypt = require('bcrypt')
const UserService = require('../services/userServices')
const csvParser = require('csv-parser')

class UserController {
  constructor() {
    this.userService = new UserService()
  }

  async createUser(req, res) {
    const { password, ...rest } = req.body

    // Hash the password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    // Store the user in the database with the hashed password
    const users = await this.userService.create({
      password: hashedPassword,
      ...rest,
    })
    res.status(201).json(users)
  }

  async getUserById(req, res) {
    const users = await this.userService.findById(req.params.id)
    res.json(users)
  }

  async getAllUsers(req, res) {
    const users = await this.userService.findAll()
    res.json(users)
  }

  async updateUserById(req, res) {
    const users = await this.userService.updateById(req.params.id, req.body)
    res.json(users)
  }

  async deleteUserById(req, res) {
    const users = await this.userService.deleteById(req.params.id)
    res.json(users)
  }

  
}

module.exports = UserController
