var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/Book.js');
var Location = require('../models/Location.js');

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

// 
// { _id: '5baa080cece8911e2d7c1f4b',
//   bookid: '5ba8e7296582ab408b3be7af',
//   shelfNumber: 1,
//   rowNumber: 2,
//   columNumber: 1,
//   srcNumber: 121,
//   status: 'Active' }


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


//   Book.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });

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



// /books/{id}/location  put
router.put('/books/:id/location', function(req, res, next) {
  // Book.find(function(err, products) {
  //   if (err) return next(err);
  //   res.json(products);
  // });
});

// /books/issue post
router.post('/books/issue', function(req, res, next) {
  // Book.create(req.body, function(err, post) {
  //   if (err) {
  //     if (err.code == 11000) {
  //       res.status(400).json({
  //         'error': 'That ISBN already exists'
  //       });
  //     }
  //     return next(err);
  //   } else {
  //     res.json(post);
  //   }
  // });
});

// /books/{id}/issue put
router.put('/books/:id/issue', function(req, res, next) {
  // Book.create(req.body, function(err, post) {
  //   if (err) {
  //     if (err.code == 11000) {
  //       res.status(400).json({
  //         'error': 'That ISBN already exists'
  //       });
  //     }
  //     return next(err);
  //   } else {
  //     res.json(post);
  //   }
  // });
});

// /books/{id}/issue-history get
router.get('/books/:id/issue-history', function(req, res, next) {
  // Book.find(function(err, products) {
  //   if (err) return next(err);
  //   res.json(products);
  // });
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
