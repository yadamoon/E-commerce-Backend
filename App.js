const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 3000;
const db_connect = require('./src/dataBase/index');
const userRoutes = require('./src/routes/userRoutes')
const { notFound, errorHandler } = require('./src/middleware/errorHandler');
const cookieParser = require('cookie-parser');
const authRoute = require('./src/routes/authRoutes')
const app = express();
app.use(cors());
db_connect().then(() => {
  console.log('Connected to MongoDB');
  app.use(express.json());
  console.log({ __dirname });
  app.use(bodyParser.json()); // Parse JSON bodies
  app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
  app.use(cookieParser()); // Invoke cookieParser as a function

  // Apply other routes
  app.use('/api/v1/user', userRoutes);
  app.use('/api/v1/auth',authRoute);

  // Error handling middleware
  app.use(notFound);
  app.use(errorHandler);

  // Start the server
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
