var mongoose = require('mongoose');

var BorrowerSchema = new mongoose.Schema({
  bookid: {
    type: String,
    useCreateIndex: true
  },
  readerId:{
    type: String,
    useCreateIndex: true
  },
  borrowedOn: {
    type: Date
  },
  returnedOn: {
    type: Date
  }
});

module.exports = mongoose.model('Borrower', BorrowerSchema);
