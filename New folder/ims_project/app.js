const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');
const upload = multer()

const hbs = require("hbs");

const indexRouter = require('./routes/index');

const app = express();

const staticpath = path.join(__dirname,);
const templatespath = path.join(__dirname,"./templates/views");
const partialpath = path.join(__dirname,"./templates/partials");
app.use(express.urlencoded({extended:true}));
app.use(express.static(staticpath));
app.set("view engine","hbs");
app.set("views", templatespath);
hbs.registerPartials(partialpath);

// Define a custom helper for "if equals"
hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
  return arg1 === arg2 ? options.fn(this) : options.inverse(this);
});

// hbs.registerHelper('isSelectedStore', function(selectedStores, storeId) {
//   console.log("here")
//   console.log(selectedStores,storeId)
//   return selectedStores.includes(storeId);
// });
hbs.registerHelper('isEqual', function (value1, value2, options) {
  return value1 === value2 ? options.fn(this) : options.inverse(this);
});



app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  console.log(err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(8000, () => {
  console.log('Listening on port 8000...');
});

module.exports = app;
