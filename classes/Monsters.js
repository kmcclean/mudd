/**
 * Created by Kevin on 4/22/2016.
 */

//this creates the monster.
Monster = function (name, hit_points, weakness, attack, attack_bonus, damage_die, damage_bonus, attack_type, defense, follow_chance, xp) {
    this.name = name;
    this.hit_points = hit_points;
    this.weakness = weakness;
    this.attack = attack;
    this.attack_bonus = attack_bonus;
    this.damage_die = damage_die;
    this.damage_bonus = damage_bonus;
    this.attack_type = attack_type;
    this.defense = defense;
    this.follow_chance = follow_chance;
    this.experience_points = xp;
};

//This prints out the basic statistics on the monster.
Monster.prototype.get_monster_info  = function() {
    console.log("Name: " + this.name + "\nHit Points: " + this.hit_points + "\nWeakness: " + this.weakness +
        "\nAttack: " + this.attack + "\nAttack_Type: " + this.attack_type + "\nDefense: " + this.defense +
        "\nFollow Chance: " + this.follow_chance);
};

//this is the function that causes the monster to lose hit points, and checks to see whether or not it has survived this round of combat.
Monster.prototype.monster_lose_hit_points = function (damage){
    this.hit_points = this.hit_points - damage;
    return this.hit_points;
};

//this returns the monster's hit points.
Monster.prototype.monster_get_hit_points = function(){
    return this.hit_points;
};

//this returns the monster's defense.
Monster.prototype.monster_get_defense = function(){
    return this.defense;
};

//this returns the monster's name.
Monster.prototype.monster_get_name = function(){
    return this.name;
};

//Gets the monster's weakness.
Monster.prototype.monster_get_weakness = function(){
    return this.weakness;
};

//Gets the monster's attack.
Monster.prototype.monster_get_attack = function(){
    return this.attack;
};

//gets the monster's bonus when attacking.
Monster.prototype.monster_get_attack_bonus = function(){
    return this.attack_bonus;
};

//gets the monster's bonus when damaging the hero.
Monster.prototype.monster_get_damage_bonus = function(){
    return this.damage_bonus;
};

//gets the damage die used by the monster.
Monster.prototype.monster_get_damage_die = function(){
    return this.damage_die;
};

//returns the monster's attack type.
Monster.prototype.monster_get_attack_type = function(){
    return this.attack_type;
};

//returns the damage caused if the monster hits the player.
Monster.prototype.monster_get_attack_damage = function(){
    var die_rolled = Math.floor((Math.random() * this.damage_die) + 1);
    var damage = die_rolled + this.damage_bonus;
    console.log("Monster Damage: " + damage);
    return damage;
};

//gets the monster's follow chance.
Monster.prototype.monster_get_follow_chance = function(){
    return this.follow_chance;
};

//gets the xp value of the monster.
Monster.prototype.monster_get_xp = function(){
    return this.experience_points;
};

//This figures out what the total of the attack roll made by the monster is.
Monster.prototype.monster_attack_roll = function(){
    var attack_roll = Math.floor((Math.random() * 20) + 1);
    var attack_result = attack_roll + this.attack_bonus;
    return attack_result;
};

//this is the function to see if the monster has died.
Monster.prototype.monster_is_alive = function(){
    if(this.hit_points > 0){
        return true;
    }
    else{
        return false;
    }
};

module.exports = Monster;
