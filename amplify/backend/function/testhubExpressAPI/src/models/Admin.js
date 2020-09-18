const mongoose = require('../db/mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  tokens: [
    {
      access: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

AdminSchema.statics.findByToken = function (token) {
  const Admin = this;
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return Promise.reject({ message: 'Invalid token' });
  }
  return Admin.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth',
  });
};

AdminSchema.statics.findByCredentials = function (username, password) {
  const Admin = this;
  return Admin.findOne({ username }).then((admin) => {
    if (!admin) {
      return Promise.reject({ message: 'User does not exist' });
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, admin.password, (err, res) => {
        if (!res) {
          reject({ message: 'Incorrect password' });
        }
        resolve(admin);
      });
    });
  });
};

AdminSchema.methods.generateAuthToken = function () {
  const admin = this;
  const access = 'auth';
  const token = jwt.sign(
    { _id: admin._id.toHexString(), access },
    process.env.JWT_SECRET
  );

  admin.tokens.push({ access, token });

  return admin.save().then(() => {
    return token;
  });
};

AdminSchema.methods.removeToken = function (token) {
  const admin = this;

  return admin.updateOne({
    $pull: {
      tokens: { token },
    },
  });
};

AdminSchema.methods.toJSON = function () {
  const admin = this;
  const userObject = admin.toObject();

  return _.pick(userObject, ['_id', 'username']);
};

AdminSchema.pre('save', function (next) {
  const admin = this;

  if (admin.isModified('password')) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(admin.password, salt);
    admin.password = hash;
    next();
  } else {
    next();
  }
});

const Admin = mongoose.model('Admin', AdminSchema);

// mongoose generates a DB model for validating the input
module.exports = Admin;
