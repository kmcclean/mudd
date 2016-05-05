/**
 * Created by Kevin on 4/29/2016.
 */
Combat = function(hero, monster){
};

//This is where the combat happens in individual rooms.
Combat.prototype.room_combat = function (hero, monster) {

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
};

module.exports = Combat;