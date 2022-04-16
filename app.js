const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./src/_middleware/error_handler');
const { userController } = require('./src/controllers/index');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api routes
app.use('/users', userController);

// global error handler
app.use(errorHandler);

// start server
const port =
  process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 5000;
app.listen(port, () => console.log('Server listening on port ' + port));
