var createError = require('http-errors');
require('dotenv').config({ silent: true });
var express = require('express');
var path = require('path');
var hbs = require('hbs');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var fileUpload = require('express-fileupload');
var cors = require('cors');
var logger = require('morgan');
var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'devg9magh',
  api_key: '893155489887359',
  api_secret: 'eD69r6JSEZxcnoTRqBVBSpOZ57c'
});

var apiRouter = require('./routes/api');
const login = require('./routes/login');
const galeria = require('./routes/galeria');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Register helpers
hbs.registerHelper('ifEquals', function (a, b, opts) {
  return a === b ? opts.fn(this) : opts.inverse(this);
});

hbs.registerHelper('eq', function (a, b) {
  return a === b;
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// MySQL session store options
var sessionStoreOptions = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  checkExpirationInterval: 900000, // How frequently expired sessions will be cleared; milliseconds.
  expiration: 86400000, // The maximum age of a valid session; milliseconds.
  createDatabaseTable: true, // Whether or not to create the sessions database table, if one does not already exist.
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
};
var sessionStore = new MySQLStore(sessionStoreOptions);
// session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

// make session available in views (optional but helpful)
app.use(function (req, res, next) {
  res.locals.session = req.session;
  res.locals.env = process.env;
  
  // Configurar la URL del frontend
  res.locals.websiteUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  
  next();
});
// Servir archivos estáticos desde la carpeta public en la raíz del backend
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

const secured = async function (req, res, next) {
  try {
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.log(error);
  }
};


app.use(cors());
app.use('/api', apiRouter);
app.use('/login', login);
app.use('/galeria', secured, galeria);
app.get('/', function(req, res) {
  if (req.session.id_usuario) {
    res.redirect('/galeria');
  } else {
    res.redirect('/login');
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

