// 'mongoose' is a MongoDB based module that allows faster,
// simpler and much easier database connectivity
const mongoose = require('mongoose');

// By default, mongoose uses Third-party promises.
// So, we can make sure it uses deafult ES6 promises
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    serverSelectionTimeoutMS: 10000,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => console.error.bind(console, 'connection error:', err));

mongoose.connection.on('error', (err) => console.error(err));

module.exports = mongoose;
