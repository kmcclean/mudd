var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Heroes = require('../models/heroes.js');
//mongoose.connect('mongodb://localhost:27017/heroes');
//var db = mongoose.connection;
/* GET home page. */
router.get('/', function(req, res, next) {

  Heroes.find(function(err, heroes){
    if(err){return next(err)}

    var stillInDungeon = [];
    var deadHeroes = [];
    var valhalla = [];
    for (var i = 0; i < heroes.length; i++){
      if (heroes[i].score == -1){
        stillInDungeon.push(heroes[i])
      }
      else{
        deadHeroes.push(heroes[i])
      }
    }
    var scoreList = [];
    for (var j = 0; j < deadHeroes.length; j++){
      scoreList.push(deadHeroes[j].score)
    }
    scoreList.sort(function(a, b){return b-a});
    var counter = 0;
    for (var k = 0; k < scoreList.length; k++){
      var score = scoreList[k];
      for (var l=0; l < deadHeroes.length; l++){
        if (deadHeroes[l].score == score){
          valhalla.push(deadHeroes[l]);
          counter++;
        }
      }
      if (counter >= 10){
        break;
      }
    }
    return res.render('index', { title: 'Welcome to the Evil Dungeon', highscores: valhalla, stillPlaying: stillInDungeon});
  });
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/rules', function(req, res, next){
  res.render('rules');
});

router.post('/', function(req, res, next){

  res.redirect('/');
});


module.exports = router;