const Admin = require('../models/Admin');

const auth_admin = (req, res, next) => {
  const token = req.header('Authorization');
  if (token) {
    Admin.findByToken(token)
      .then((admin) => {
        if (!admin) {
          return Promise.reject();
        }
        req.admin = admin;
        req.token = token;
        next();
      })
      .catch((err) => {
        res.status(401).send({ message: 'Admin unauthorized' });
      });
  } else {
    res.status(401).send({ message: 'Missing auth token' });
  }
};

module.exports = auth_admin;
