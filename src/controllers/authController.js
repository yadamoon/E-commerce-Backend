const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserService = require('../services/UserServices')


class AuthController {
  constructor() {
    this.userService = new UserService()
  }

  async login(req, res) {
    try {
      const user = await this.userService.findOne({
        email: req.body.email,
      })

      if (!user)
        return res.status(401).json({ message: 'Invalid email or password' })

      // Compare the passwords
      const passwordsMatch = await bcrypt.compare(
        req.body.password,
        user.password
      )

      // If the passwords don't match, return an error
      if (!passwordsMatch)
        return res.status(401).json({ message: 'Invalid username or password' })

      // If the user's credentials are valid, generate a JWT
      const payload = { userId: user._id, email: user.email }
      const secret = process.env.JWT_SECRET
      const options = { expiresIn: '1h' }
      const token = jwt.sign(payload, secret, options)

      res.json({ id: user._id, email: user.email, role:user.role,token })
    } catch (e) {
      console.log({ e })
    }
  }
}

module.exports = AuthController
