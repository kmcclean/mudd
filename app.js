var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Keys = require('./keys');
var Monster = require('./classes/Monsters');
var Hero = require('./classes/Hero');
var Room = require('./classes/Rooms');
var Combat = require('./classes/Combat');
var Weapon = require('./classes/Weapons');
var Equipment = require('./classes/Equipment');
var MonsterDB = require('./models/mudd');
var Twitter = require('twitter');

var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();

var db = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/monsters');

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

var key = new Keys();
var room_has_monster = false;

var player_index = [];
//This sets up the twitter client so that it can respond to commands during the game.
var client = new Twitter({
  consumer_key: key.get_consumer_key(),
  consumer_secret: key.get_consumer_secret(),
  access_token_key: key.get_access_token(),
  access_token_secret: key.get_access_secret()
});
//
client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
  stream.on('data', function(tweet) {
    //This checks to see if a player is currently playing. If not, it allows them to play. If it does, it continues with the current game.
    if (player_index.length == 0) {

      //creates a new hero and adds them to the index.
      var hero = new_player();
      player_index.push(hero);
    }
      //this checks to see if a room has a monster in it. If it doesn't, the next time this is activated the hero will move to the next room.
      room_has_monster = new_room(hero);

      //if the hero is
    if (room_has_monster) {
      var monster = create_monster();
      var fight = room_combat(hero, monster);
      if (fight) {
        var alive = end_combat(hero, monster);
        if (alive) {
          room_has_monster = false;
        }
        else {
          player_index.pop();
        }
      }
    }
  });

  stream.on('error', function(error) {
    throw error;
  });
});

//this is for testing purposes. once the methods are running correctly, this should taken out for the client stream above.
//while (true) {
////This checks to see if a player is currently playing. If not, it allows them to play. If it does, it continues with the current game.
//  if (player_index.length == 0) {
//
//    //creates a new hero and adds them to the index.
//    var hero = new_player();
//    player_index.push(hero);
//  }
//  //this checks to see if a room has a monster in it. If it doesn't, the next time this is activated the hero will move to the next room.
//  room_has_monster = new_room(hero);
//  //if the hero is
//  if (room_has_monster) {
//    var monster = create_monster();
//    //var combat = create_room_combat();
//    var fight = room_combat(hero, monster);
//    if (fight) {
//      var alive = end_combat(hero, monster);
//      if (alive) {
//        room_has_monster = false;
//      }
//      else {
//        player_index.pop();
//        break;
//      }
//    }
//  }
//}


//this pulls a random test monster.
function random_monster (which_monster) {
  if (which_monster == 1) {
    return new Monster("Orc", 8, "Fire", "Club", 3, 6, 2, "Close", 9, .2, 1);
  }
  if (which_monster == 2) {
    return new Monster("Ogre", 20, "Wind", "Fist", 4, 8, 3, "Close", 14, .3, 2);
  }
}

//when a player starts a new game, this is where their new character is initialized.
function new_player() {
  //creates the weapon
  var weapon = new Weapon("Long Sword", false, "regular", 6);

  // creates an array of weapons to be used by the player in the game.
  var all_weapons = [weapon];

  //creates the hero
  var hero = new Hero("Kevin", weapon, all_weapons);
  console.log("Starting hp: " + hero.hero_get_hit_points());
  return hero;
}

function create_monster() {
  var monster_array = ["Orc", "Ogre"];

  //This is to select a random monster from the monsters that are available.
  var random = Math.floor((Math.random() * monster_array.length) + 1);

  //these will be used to pull monsters from the database.
  var monster_choice = monster_array[random - 1];
  var monster = database_monster(monster_choice);
  console.log("Monster var: " + monster);
  return random_monster(random);
}

//combat occurs here. When the combat is complete, there is a check to see if the hero is still alive.
function create_room_combat(hero, monster){
  return new Combat(hero, monster);
}

function end_combat(hero, monster){
    if (hero.hero_get_hit_points() > 0) {
      console.log("You have defeated the monster in this room.");
      console.log("You gained " + monster.monster_get_xp() + "xp!");
      hero.hero_gain_xp(monster.monster_get_xp());
      console.log("You have " + hero.hero_get_xp() + "xp.");
      if (hero.hero_level_up_check()) {
        console.log("You leveled up! You are now level " + hero.hero_get_level());
      }
      return true;
    }
    //Once the hero has been killed, this shows the final results of the dungeon crawl.
    else {
      console.log("You have been defeated by the monsters in this room.");
      console.log(hero.hero_get_name() + " has been defeated. This hero earned " + hero.hero_get_xp() + "xp.");
      return false;
    }
}

function new_room (hero) {
  //creates the room that the player has entered.
  var room = new Room("You have entered a crypt.");
  console.log(room.get_description());

  //This makes it so only half the rooms have monsters.
  var is_monster = Math.floor((Math.random() * 2) + 1);

  //This is where the combat occurs in the game, if there is a monster in the room.
  if (is_monster == 1) {
    console.log("The room has a monster!");
    return true;
  }

  //if there are no monsters in the room, the check here is performed to see if the hero finds any treasure in the room.
  else {
    var is_treasure = Math.floor((Math.random() * 3) + 1);
    if (is_treasure == 3) {
      var equipment = new Equipment("Health Potion");
      console.log("You found a " + equipment.equipment_get_name() + "!");
      var hit_points = equipment.equipment_health_potion();
      hero.hero_increase_hit_points(hit_points);
      console.log("You gained " + hit_points + " hp! You now have " + hero.hero_get_hit_points() + " hp!");
      return false;
    }
    else if (is_treasure == 2) {
      console.log("You found a new weapon!");
      return false;
    }
    else {
      console.log("There is nothing in this room.");
      return false;
    }
  }
}

function room_combat(hero, monster){

  //the hero attack happens here.
  var attack_roll = hero.hero_attack_roll();
  console.log("You rolled a " + attack_roll + "!");
  if (attack_roll >= monster.monster_get_defense()) {
    console.log("You hit the " + monster.monster_get_name() + "!");
    var hero_damage = hero.get_damage();
    if (monster.monster_lose_hit_points(hero_damage) <= 0) {
      console.log(monster.monster_get_name() + " has been defeated!");
      //return this.hero;
      return true;
    }
    else {
      console.log(monster.monster_get_name() + " has taken " + hero_damage + " points of damage!")
    }
  }
  else {
    console.log(hero.hero_get_name() + " attacked " + monster.monster_get_name() + " & missed!");
  }

  //if the monster survives the attack, it gets to attack here.
  var monster_attack_roll = monster.monster_attack_roll();
  console.log("The " + monster.monster_get_name() + " rolls a " + monster_attack_roll + ".");
  if (monster_attack_roll >= hero.hero_get_defense()) {
    console.log("The " + monster.monster_get_name() + " hit you, " + hero.hero_get_name() + ".");
    var monster_damage = monster.monster_get_attack_damage();
    hero.hero_lose_hit_points(monster_damage);
    if (!hero.hero_is_alive()) {
      return true;
      //return this.hero;
    }
    else {
      console.log(hero.hero_get_name() + " has taken " + monster_damage + " points of damage!");

    }
  }
  else {
    console.log(monster.monster_get_name() + " attacked " + hero.hero_get_name() + " & missed!");
  }
  console.log(hero.hero_get_name() + " HP: " + hero.hero_get_hit_points());
  console.log(monster.monster_get_name() + " HP: " + monster.monster_get_hit_points());
  return false;
}

//this gets a monster from the database.
function database_monster(monster_choice) {

  var monster = MonsterDB.findOne({name: monster_choice}, function (err, monster) {
    if (err) {
      console.log(err);
      return false;
    }
    //If no monster found, then send message to app error handler
    if (!monster) {
      console.log('No monster found with name ' + monster_choice);
      return false;
    }
  return new Monster(monster.name, monster.hit_points, monster.weakness, monster.attack, monster.attack_bonus, monster.damage_die, monster.damage_bonus, monster.attack_type, monster.defense, monster.follow_chance, monster.experience_points);
  });
  if(!monster){
    return false;
  }
  else{
    return monster;
  }

}


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