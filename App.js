const express = require('express')
require('dotenv').config()
const cors = require('cors')
const path = require('path')
const PORT = 3000;
const db_connect = require('./DataBase/index')
const userRoutes = require('./Routes/userRoutes')
const authRoutes = require('./Routes/authRoutes')
const app = express()
app.use(cors())
db_connect().then(() => {
  console.log('Connected to MongoDB')
})
app.use(express.json())
console.log({ __dirname })
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/auth', authRoutes)
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
