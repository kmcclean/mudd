var express = require('express');
var mongoose = require('mongoose');
var Heroes = require('../models/heroes.js');

//This searches the database for the hero the user is looking for and returns it back to them.
$(document).ready(function() {

    $('button.find_hero').click(function () {
        alert("Button worked.");
        var hero_name = $(this).attr("player_name");
        Heroes.find({name: hero_name}, function (err, heroes) {
            if (err) {
                return next(err)
            }
            if (!heroes) {
                return next(new Error('No hero found with name ' + req.body.name))
            }

            //http://stackoverflow.com/questions/11242536/generate-table-row-dynamically-on-ajax-success
            for (var i = 0; i < heroes.length; i++) {
                var row = $('<tr>');
                row.append($('<td>').html(heroes[i].name));
                row.append($('<td>').html(heroes[i].score));
                $("hero_search_table").append(row);
            }

        });
    });
});