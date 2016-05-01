var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var Monster = require('./classes/Monsters');
var Hero = require('./classes/Hero');
var Room = require('./classes/Rooms');
var Combat = require('./classes/Combat');
var Weapon = require('./classes/Weapons');
var Equipment = require('./classes/Equipment');

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

//creates the monster
var orc = new Monster("Orc", 8, "Fire", "Club", 3, 6, 2, "Close", 9, .2, 1);
var ogre = new Monster("Ogre", 20, "Wind", "Fist", 4, 8, 3, "Close", 14,.3, 2);

//creates the weapon
var weapon = new Weapon("Long Sword", false, "regular", 6);

// creates an array of weapons to be used by the player in the game.
var all_weapons = [weapon];

//creates the hero
var hero = new Hero("Kevin", weapon, all_weapons);
console.log("Starting hp: " + hero.hero_get_hit_points());
var monster_array = [orc, ogre];


//This is where combat occurs.
while (true) {

  //This is to select a random monster from the monsters that are available.
  var random = Math.floor((Math.random() * monster_array.length) + 1);
  var monster = monster_array[random-1];


  //creates the room that the player has entered.
  var room = new Room("You have entered a crypt.");
  console.log(room.get_description());

  //This makes it so only half the rooms have monsters.
  var is_monster = Math.floor((Math.random() * 2) + 1);

  //This is where the combat occurs in the game, if there is a monster in the room.
  if (is_monster == 1) {
    console.log("The room has a monster!");
    //combat occurs on these two lines. When the combat is complete, there is a check to see if the hero is still alive.
    var combat = new Combat(hero, monster);
    if (combat.room_combat()){
      console.log("You have defeated the monster in this room.");
      console.log("You gained " + monster.monster_get_xp() + "xp!");
      hero.hero_gain_xp(monster.monster_get_xp());
      console.log("You have " + hero.hero_get_xp() + "xp.");
      if(hero.hero_level_up_check()){
        console.log("You leveled up! You are now level " + hero.hero_get_level());
      }
    }
    else{
      console.log("You have been defeated by the monsters in this room.");
      break;
    }
  }

  //if there are no monsters in the room, the check here is performed to see if the hero finds any treasure in the room.
  else {
    var is_treasure = Math.floor((Math.random() * 3) + 1);
    if (is_treasure == 3) {
      var equipment = new Equipment("Health Potion");
      console.log("You found a " + equipment.equipment_get_name() + "!");
      var hit_points = equipment.equipment_health_potion();
      hero.hero_increase_hit_points(hit_points);
      console.log("You gained " + hit_points + " hp! You now have " + hero.hero_get_hit_points() + " hp!")
    }
    else if (is_treasure == 2){
      console.log("You found a new weapon!");
    }
    else{
      console.log("There is nothing in this room.");
    }
  }
}

//Once the hero has been killed, this shows the final results of the dungeon crawl.
console.log(hero.hero_get_name() + " has been defeated. This hero earned " + hero.hero_get_xp() + "xp." );

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

module.exports = app;
