const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });

var express = require('express');
var bodyParser = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const {
  getSubjectQuestions,
  updateSubjectQuestions,
} = require('./controllers/subjectsController');
const {
  adminSignup,
  adminLogin,
  adminLogout,
} = require('./controllers/adminsController');
const auth_admin = require('./middleware/auth_admin');

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
    'Authorization'
  );
  next();
});

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to TESTHUB ' });
});

app.post('/admins', adminSignup);
app.post('/admins/login', adminLogin);
app.post('/admins/logout', auth_admin, adminLogout);

app.get('/questions/:subject', getSubjectQuestions);
app.patch('/questions/:subject', updateSubjectQuestions);

// Catch all
app.use('*', (req, res) => {
  res.status(404).json({
    message: `Path ${req.originalUrl} does not exist`,
  });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`App started at ${port}`);
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
