var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/Book.js');
var Location = require('../models/Location.js');
var Borrower = require('../models/Borrower.js');

// /books/{id}/issue-history get
router.get('/books/:id/issue-history', function(req, res, next) {
  Borrower.find({
    bookid: req.params.id
  }, function(err, history) {
    if (err) return next(err);
    res.json(history);
  });
});

// /books/{id}/location get
router.get('/books/:id/location', function(req, res, next) {
  Location.find({
    bookid: req.params.id
  }, function(err, post) {
    if (err)
      return next(err)
    if (post.length > 0) {
      res.json(post);
    } else {
      res.status(400).json({
        'error': 'Book is not available'
      });
    }
  });
});

// /books/{id}/location put
router.put('/books/:id/location', function(req, res, next) {
  console.log(req.params.id)
  console.log(req.body)
  // Location.findOneAndUpdate({
  //   bookid: req.params.id
  // }, req.body, function(err, post) {
  //   if (err)
  //     return next(err)
  //   if (post.length > 0) {
  //     res.json(post);
  //   } else {
  //     res.status(400).json({
  //       'error': 'Book is not available'
  //     });
  //   }
  // });
});

//search books by isbn/title/author
router.get('/books/:isbn?/:title?/:author?', function(req, res, next) {
  let searchCriteria = {};
  if (req.query.isbn) {
    searchCriteria.isbn = {
      $regex: req.query.isbn,
      $options: 'i'
    };
  }
  if (req.query.title) {
    searchCriteria.title = {
      $regex: req.query.title,
      $options: 'i'
    };
  }
  if (req.query.author) {
    searchCriteria.author = {
      $regex: req.query.author,
      $options: 'i'
    };
  }
  Book.find(searchCriteria, function(err, products) {
    if (err) return next(err);
    res.json(products);
  });
});


// /books/issue post
router.post('/books/:id/issue', function(req, res, next) {
  var bookIssue = req.body;
  bookIssue.bookid = req.params.id;
  Borrower.create(bookIssue, function(err, post) {
    if (err) {
      if (err.code == 11000) {
        res.status(400).json({
          'error': 'This book has been issued already'
        });
      }
      return next(err);
    } else {
      var bookUpdate = {}
      bookUpdate.bookid = post.bookid;
      var status = bookIssue.returnedOn ? "Available" : "Issued";
      //update the book status based on returnedOn param in update request
      Book.findOneAndUpdate({
        "_id": req.params.id
      }, {
        $set: {
          "status": status
        }
      }, function(err, postUpdate) {
        if (err)
          return next(err);
        res.status(200).json({
          'message': 'Succefully issued',
          'details': post
        });
      });
    }
  });
});

// /books/{id}/issue put
router.put('/books/:id/issue', function(req, res, next) {
  var bookIssue = req.body;
  bookIssue.bookid = req.params.id;
  Borrower.findOneAndUpdate({
    "bookid": req.params.id
  }, {
    "$set": bookIssue
  }).exec(function(err, post) {
    if (err) {
      return next(err);
    } else {
      var bookUpdate = {}
      bookUpdate.bookid = post.bookid;
      var status = bookIssue.returnedOn ? "Available" : "Issued";
      //update the book status based on returnedOn param in update request
      Book.findOneAndUpdate({
        "_id": req.params.id
      }, {
        $set: {
          "status": status
        }
      }, function(err, postUpdate) {
        if (err)
          return next(err);
        res.status(200).json({
          'message': 'Succefully updated'
        });
      });
    }
  });
});




router.post('/books/add', function(req, res, next) {
  Book.create(req.body, function(err, post) {
    if (err) {
      if (err.code == 11000) {
        res.status(400).json({
          'error': 'That ISBN already exists'
        });
      }
      return next(err);
    } else {
      res.json(post);
    }
  });
});

//get all books
router.get('/books', function(req, res, next) {
  Book.find(function(err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

//find a book by id
router.get('/books/:id', function(req, res, next) {
  Book.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



module.exports = router;
