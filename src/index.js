const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

// settings
app.set('puerto', process.env.PORT || 5500);
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use(require('./routes'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// listening the Server
app.listen(app.get('puerto'), () => {
  console.log('Servidor en el puerto ', app.get('puerto'));
});