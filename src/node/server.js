const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
// const bookRouter = require('./routes/books');
// const borrowerRouter = require('./routes/borrowers');
const apiRouter = require('./routes/book-api');
const app = express();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost/book-library', {
    promiseLibrary: require('bluebird')
  })
  .then(() => console.log('Connection Successful'))
  .catch((err) => console.error(err));

//Normalize a port into a number/string/false.
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

// Get port from environment and store in Express.
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
// app.use('/api/book', bookRouter);
// app.use('/api/borrower',borrowerRouter)
app.use('/api',apiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

app.listen(port, () => console.log(`Book Library Server is listening on port ${port}!`))
module.exports = app;
