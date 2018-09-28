var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
  bookid: {
    type: String,
    required: true,
    unique: true
  },
  shelfNumber: {
    type: Number,
    required: true
  },
  rowNumber: {
    type: Number,
    required: true
  },
  columNumber: {
    type: Number,
    required: true
  },
  srcNumber: {
    type: Number,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    required: true
  }
});

module.exports = mongoose.model('Location', LocationSchema);
