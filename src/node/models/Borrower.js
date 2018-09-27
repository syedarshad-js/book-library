var mongoose = require('mongoose');

var BorrowerSchema = new mongoose.Schema({
  bookid: {
    type: String
  },
  name:{
    type: String
  },
  borrowedOn: {
    type: Date
  },
  returnedOn: {
    type: Date
  }
});

module.exports = mongoose.model('Borrower', BorrowerSchema);
