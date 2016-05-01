/**
 * Created by Kevin on 4/29/2016.
 */
Combat = function(hero, monster){
    this.hero = hero;
    this.monster = monster;
};

//This is where the combat happens in individual rooms.
Combat.prototype.room_combat = function (){

    //combat continues in this loop until one of the combatants is defeated.
    while(true) {

        //the hero attack happens here.
        var attack_roll = this.hero.hero_attack_roll();
        console.log("You rolled a " + attack_roll + "!");
        if (attack_roll >= this.monster.monster_get_defense()) {
            console.log("You hit the " + this.monster.monster_get_name() + "!");
            var hero_damage = this.hero.get_damage();
            if (this.monster.monster_lose_hit_points(hero_damage) <= 0) {
                console.log(this.monster.monster_get_name() + " has been defeated!");
                //return this.hero;
                return true;
            }
            else {
                console.log(this.monster.monster_get_name() + " has taken " + hero_damage + " points of damage!")
            }
        }
        else {
            console.log(this.hero.hero_get_name() + " attacked " + this.monster.monster_get_name() + " & missed!");
        }

        //if the monster survives the attack, it gets to attack here.
        var monster_attack_roll = this.monster.monster_attack_roll();
        console.log("The " + this.monster.monster_get_name() + " rolls a " + monster_attack_roll + ".");
        if (monster_attack_roll >= this.hero.hero_get_defense()) {
            console.log("The " + this.monster.monster_get_name() + " hit you, " + this.hero.hero_get_name() + ".");
            var monster_damage = this.monster.monster_get_attack_damage();
            this.hero.hero_lose_hit_points(monster_damage);
            if (!this.hero.hero_is_alive()) {
                return false;
                //return this.hero;
            }
            else {
                console.log(this.hero.hero_get_name() + " has taken " + monster_damage + " points of damage!");
                console.log(this.hero.hero_get_name() + " has " + this.hero.hero_get_hit_points() + " hit points left!");
            }
        }
        else {
            console.log(this.monster.monster_get_name() + " attacked " + this.hero.hero_get_name() + " & missed!");
        }
    }
};

module.exports = Combat;