var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var monster = require('./classes/Monsters');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

orc = monster;
ogre = monster;

orc.Monster("Orc", 10, "Fire", "Club", "Close", 9, .2, 1);
ogre = new monster.Monster("Ogre", 20, "Wind", "Fist", "Close", 14,.3, 2);

console.log(orc.get_monster_info);
orc.lose_hit_points(5);
console.log(orc.get_monster_info);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//this is where random monsters are created.
//function Monster (name, hit_points, weakness, attack, attack_type, defense){
//  this.name = name;
//  this.hit_points = hit_points;
//  this.weakness = weakness;
//  this.attack = attack;
//  this.attack_type = attack_type;
//  this.defense = defense;
//  this.get_monster_info = function (){
//    return "Name: " +  this.name + "\nHit Points: " + this.hit_points + "\nWeakness: " + this.weakness +
//        "\nAttack: " + this.attack + "\nAttack_Type: " + this.attack_type + "\nDefense: " + this.defense
//  }
//}


module.exports = app;
