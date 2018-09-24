var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    useCreateIndex: true,
    unique: true
  },
  title: {
    type: String,
    useCreateIndex: true
  },
  author: {
    type: String,
    useCreateIndex: true
  },
  status: String
});

module.exports = mongoose.model('Book', BookSchema);
