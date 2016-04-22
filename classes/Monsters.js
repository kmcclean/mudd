/**
 * Created by Kevin on 4/22/2016.
 */

//this creates the monster.
Monster = function (given_name, life, weak_point, attack_name, attack_distance, defense_num, follow_per, xp) {
    this.name = given_name;
    this.hit_points = life;
    this.weakness = weak_point;
    this.attack = attack_name;
    this.attack_type = attack_distance;
    this.defense = defense_num;
    this.follow_chance = follow_per;
    this.xp = xp;

    this.get_monster_info  = "Name: " + this.name + "\nHit Points: " + this.hit_points + "\nWeakness: " + this.weakness +
            "\nAttack: " + this.attack + "\nAttack_Type: " + this.attack_type + "\nDefense: " + this.defense +
            "\nFollow Chance: " + this.follow_chance
};

//this is the function that causes the monster to lose hit points, and checks to see whether or not it has survived this round of combat.
var lose_hit_points = function (damage){
    console.log(this.hit_points);
    this.hit_points = this.hit_points - damage;
    if(death_check()){
        return false;
    }
    console.log(this.hit_points);
    return true;
};

//this is the function to see if the monster has died.
function death_check(hp){
    if (hp <= 0){
        return true;
    }
    return false;
}

//this gets the info on the monster.
//var get_monster_info  = function() {
//    return "Name: " + this.name + "\nHit Points: " + this.hit_points + "\nWeakness: " + this.weakness +
//    "\nAttack: " + this.attack + "\nAttack_Type: " + this.attack_type + "\nDefense: " + this.defense +
//    "\nFollow Chance: " + this.follow_chance
//};

module.exports = {
    Monster:Monster,
    lose_hit_points:lose_hit_points,
  //  get_monster_info:get_monster_info
};