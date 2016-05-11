/**
 * Created by Kevin on 4/22/2016.
 */

/**
 * Created by Kevin on 4/22/2016.
 */

//this creates the hero.
Hero = function (name, current_weapon, weapons_array) {
    this.name = name;
    this.current_weapon = current_weapon;
    this.weapons_array = weapons_array;


    this.level = 1;
    this.experience_points = 0;
    this.weapon = 3 * this.level;
    this.defense = 7 + (3*this.level);
    this.hit_points = 11;
};

//this gets the basic info on the hero.
Hero.prototype.get_hero_info  = function (){
    console.log("Name: " + this.name + "\nHit Points: " + this.hit_points + "\nWeakness: " + this.weakness +
    "\nAttack: " + this.weapon + "\nAttack_Type: " + this.attack_type + "\nDefense: " + this.defense +
    "\nFollow Chance: " + this.follow_chance);
};

//this is called whenever hit points are lost by the player. It also checks to see if the player has died.
Hero.prototype.hero_lose_hit_points = function (damage){
    this.hit_points = this.hit_points- damage;
    console.log("Hero hp: " + this.hit_points);
    return this.hit_points;
};

//this gets the hero's defense.
Hero.prototype.hero_get_defense = function(){
    return this.defense;
};

//this gets the hero's name.
Hero.prototype.hero_get_name = function(){
    return this.name;
};

//This is where the weapon roll for the hero occurs.
Hero.prototype.hero_attack_roll = function(){
    var attack_roll = Math.floor((Math.random() * 20) + 1);
    var attack_result = attack_roll + this.weapon;
    return attack_result
};


//This gets the appropriate damage die from the weapon that is currently in use.
Hero.prototype.get_damage = function(){
    //var die_rolled = this.current_weapon.weapon_get_damage_roll();
    return Math.floor((Math.random() * 6) + 1);
};


//if the player gains hit points, this is where it it added in.
//Hero.prototype.gain_hit_points = function(life){
//    this.hit_points = this.hit_points + life;
//    if (this.hit_points > this.hit_points){
//        this.hit_points = this.hit_points;
//    }
//};

//this increases the hit points of the player.
Hero.prototype.hero_increase_hit_points = function(new_hit_points){
    this.hit_points = this.hit_points + new_hit_points
};

//this allows the player to switch between their weapons.
Hero.prototype.switch_weapons = function(){
    var weapons = get_weapon_array();
    for (var i = 0; i < weapons.length; i++){
        //show the various weapons.
    }
};

//this adds a weapons to the array if the player picks up a new one.
Hero.prototype.add_weapon = function (new_weapon){
    this.weapons_array.push(new_weapon)
};

//this returns the weapons array.
get_weapon_array = function(){
    return this.weapons_array;
};

//when a player gains experience_points, this is where it is added to their experience_points total.
Hero.prototype.hero_gain_xp = function (monster_xp){
    this.experience_points = this.experience_points + monster_xp;
};

//when a player gains enough experience to level up, this function is called.
Hero.prototype.level_up = function(){
    console.log("Previous level:" + this.level);
    this.level++;
    console.log("Current level: " + this.level);
    set_defense();
    //set_max_hp();
}

//when a player levels up, this increases their maximum defense.
set_defense= function(){
    this.defense = 7 + (3*this.level);
};

//when a player levels up, this increases their maximum hit points.
//set_max_hp = function() {
//    this.hit_points = 7 + (4 * this.level);
//};

//this gets the hero's current level.
Hero.prototype.hero_get_level = function(){
    return this.level;
};

//this checks to see if the player has leveled up. If they have, the game levels them up.
Hero.prototype.hero_level_up_check = function(){
    if(this.level == 1 && this.experience_points >= 3){
        this.level_up();
        return true
    }
    else if(this.level == 2 && this.experience_points >= 8){
        this.level_up();
        return true
    }
    else if(this.level == 3 && this.experience_points >= 15){
        this.level_up();
        return true
    }
    else if(this.level == 4 && this.experience_points >= 21){
        this.level_up();
        return true
    }
    return false;
};

//this checks to see if the hero is still alive.
Hero.prototype.hero_is_alive = function(){
    if(this.hit_points > 0){
        return true;
    }
    else{
        return false;
    }
};

//this gets the hero's hit points.
Hero.prototype.hero_get_hit_points = function(){
    return this.hit_points;
};

//this gets the hero's current weapon.
Hero.prototype.hero_get_current_weapon = function(){
    return this.current_weapon;
};

//this gets the hero's weapon array.
Hero.prototype.hero_get_weapons_array = function(){
    return this.weapons_array;
};

//this gets the hero's xp.
Hero.prototype.hero_get_xp = function(){
    return this.experience_points;
};

module.exports = Hero;


