var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Borrower = require('../models/Borrower.js');

router.post('/issue-book', function(req, res, next) {
  Borrower.create(req.body, function(err, post) {
    if (err)
      return next(err);
    res.json(post);
  });
});

//get all books
router.get('/issued-details', function(req, res, next) {
  // Book.find(function(err, products) {
  //   if (err) return next(err);
  //   res.json(products);
  // });
});
//
// //find a book by id
// router.get('/find-book/:id', function(req, res, next) {
//   Book.findById(req.params.id, function(err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });
//
// //search books by isbn/title/author
// router.get('/search-books/:isbn?/:title?/:author?', function(req, res, next) {
//   let searchCriteria = {};
//   if (req.query.isbn) {
//     searchCriteria.isbn = {
//       $regex: req.query.isbn,
//       $options: 'i'
//     };
//     // searchCriteria.isbn = req.query.isbn;
//   }
//   if (req.query.title) {
//     searchCriteria.title = {
//       $regex: req.query.title,
//       $options: 'i'
//     };
//   }
//   if (req.query.author) {
//     searchCriteria.author = {
//       $regex: req.query.author,
//       $options: 'i'
//     };
//   }
//   Book.find(searchCriteria, function(err, products) {
//     if (err) return next(err);
//     res.json(products);
//   });
// });

module.exports = router;
