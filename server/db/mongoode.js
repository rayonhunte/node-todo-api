const mongoose = require('mongoose');

mongoose.promise = global.Promise; // set to use default promises
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp'); // connect to local host


module.exports = {mongoose}