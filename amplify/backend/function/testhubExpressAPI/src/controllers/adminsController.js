const _ = require('lodash');

const Admin = require('../models/Admin');

const adminSignup = (req, res) => {
  const body = _.pick(req.body, ['username', 'password']);
  const admin = new Admin(body);
  admin
    .save()
    .then(() => {
      const token = admin.generateAuthToken();
      return token;
    })
    .then((token) => {
      res.header('Authorization', token).send({ ...admin, token });
    })
    .catch((err) => {
      res.status(400).send({ message: 'User already exists', error: err });
    });
};

const adminLogin = (req, res) => {
  const body = _.pick(req.body, ['username', 'password']);
  Admin.findByCredentials(body.username, body.password)
    .then((admin) => {
      admin.generateAuthToken().then((token) => {
        res.header('Authorization', token).send({ data: admin, token });
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const adminLogout = (req, res) => {
  req.admin.removeToken(req.headers['Authorization']).then(
    () => {
      res.status(200).send({ success: 'Logout successful' });
    },
    (err) => {
      res.status(400).send({ message: 'Invalid token' });
    }
  );
};

module.exports = { adminSignup, adminLogin, adminLogout };
