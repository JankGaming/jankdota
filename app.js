'use strict';

let express = require('express');
let http = require('http');
let path = require('path');

var app = express();

// Set the port.
app.set('port', process.env.JANKDOTA_PORT || 3000);

// Configure view engine.
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Set up middleware.
app.use(express.favicon(path.join(__dirname, 'public/img/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.methodOverride());

// Redirect to canonical domain
app.use(function(req,res,next){
  if(req.headers.host === 'www.jankdota.com'){
    res.writeHead(301, {'Location':'http://jankdota.com'+req.url, 'Expires': (new Date).toGMTString()});
    res.end();
  }
  else{
    next();
  }
});

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.locals.title = 'JankDota';

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/herostats', (req, res) => {
  res.redirect('http://herostats.io');
});

app.get('/jankbot', (req, res) => {
  res.render('jankbot');
});

app.get('/info/about', (req, res) => {
  res.render('info/about');
});

app.get('/info/contact', (req, res) => {
  res.render('info/contact');
});

// 404 page.
app.use(function(req, res, next) {
  res.status(404).render('errors/404.jade');
  next();
});

// Start the server.
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
