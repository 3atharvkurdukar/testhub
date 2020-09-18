const mongoose = require('../db/mongoose');

// mongoose generates a DB model for validating the input
const Subject = mongoose.model('Subject', {
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  questions: {
    type: Array,
    required: true,
  },
});

module.exports = Subject;
