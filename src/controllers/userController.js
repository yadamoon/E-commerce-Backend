const bcrypt = require('bcrypt')
const UserService = require('../services/UserServices'); // Updated to match the import statement
const csvParser = require('csv-parser')

class UserController {
  constructor() {
    this.userService = new UserService()
  }
  async createUser(req, res) {
   
    try{ 
      
    const { password, ...rest } = req.body

    // Hash the password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Store the user in the database with the hashed password
    const user = await this.userService.create({
      password: hashedPassword,
      ...rest,
    })
    res.status(201).json(user)   }catch(error){new Error(error)}
  }
  async getUserById(req, res) {

    try{ 
      const user = await this.userService.findById(req.params.id)
      res.json(user)
    }catch(error){
      new Error(error)
    }
   
  }

  async getAllUsers(req, res) {
    try{ 
      const users = await this.userService.findAll()
      res.json(users)
    }catch(error){new Error(error)}
   
  }

  async updateUserById(req, res) {
    try {
        const user = await this.userService.updateById(req.params.id, req.body);
        res.json(user);
    } catch (error) {
        if (error.code === 11000 && error.keyValue.email === req.body.email) {
            res.status(400).json({ error: 'Email is already in use' });
        } else {
            res.status(500).json({ error: 'An error occurred while updating user' });
        }
    }
}

  async deleteUserById(req, res) {
    try{  
     const user = await this.userService.deleteById(req.params.id)
      res.json(user)
    }catch(error){
      new Error(error);
    }
 
  }

  
}

module.exports = UserController
