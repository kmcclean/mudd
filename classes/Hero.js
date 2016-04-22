/**
 * Created by Kevin on 4/22/2016.
 */

/**
 * Created by Kevin on 4/22/2016.
 */

//this creates the hero.
Hero = function (name, current_hp, weapon, weapons_list, attack_name, attack_distance, defense) {

    this.name = name;
    this.current_weapon = weapon;
    this.weapons_list = weapons_list;

    this.level = 1;
    this.xp = 0;
    this.defense = 7 + (3*this.level);
    this.max_hp = 7 + (4*this.level);
    this.current_hp = max_hp;
    this.get_hero_info  = "Name: " + this.name + "\nHit Points: " + this.hit_points + "\nWeakness: " + this.weakness +
        "\nAttack: " + this.attack + "\nAttack_Type: " + this.attack_type + "\nDefense: " + this.defense +
        "\nFollow Chance: " + this.follow_chance
};

//this is called whenever hit points are lost by the player. It also checks to see if the player has died.
lose_hit_points = function (damage){
    console.log(this.hit_points);
    this.current_hp= this.this.current_hp- damage;
    if(death_check(current_hp)){
        return false;
    };
    console.log(this.hit_points);
    return true;
};

//this is the function to see if the player has died.
function death_check(hp){
    if (hp <= 0){
        return true;
    }
    return false;
}

//if the player gains hit points, this is where it it added in.
gain_hit_points = function(life){
    this.current_hp = this.current_hp + life;
    if (this.current_hp > this.max_hp){
        this.current_hp = this.max_hp;
    }
};

//this increases the maximum hit points, which occurs when the player levels up.
increase_maximum_hit_points = function(){
    this.maximum_hp = this.maximum_hp + 3
};

//this allows the player to switch between their weapons.
switch_weapons = function(){
    var weapons = get_weapon_array();
    for (var i = 0; i < weapons.length; i++){
        //show the various weapons.
    }
};

//this adds a weapons to the array if the player picks up a new one.
add_weapon = function (new_weapon){
    this.weapons_list.push(new_weapon)
};

//this returns the weapons array.
get_weapon_array = function(){
    return weapons_list;
};

//when a player gains xp, this is where it is added to their xp total.
gain_xp = function (monster_xp){
    this.xp = this.xp + monster_xp;
};

//when a player gets enough experience to level up, this function is called.
level_up = function(){
    this.level++;
    set_defense();
    set_max_hp();
};

//when a player levels up, this increases their maximum defense.
set_defense= function(){
    this.defense = 7 + (3*this.level);
};

//when a player levels up, this increases their maximum hit points.
set_max_hp = function() {
    this.max_hp = 7 + (4 * this.level);
};

//this checks to see if the player has leveled up. If they have, the game levels them up.
level_up_check = function (level, xp){
    if(level == 1 && xp >= 3){
        level_up()
    }
    else if(level == 2 && xp >= 8){
        level_up()
    }
    else if(level == 1 && xp >= 15){
        level_up()
    }
    else if(level == 1 && xp >= 21){
        level_up()
    }
};


module.exports = {
    Monster:Monster,
    lose_hit_points:lose_hit_points,
    gain_hit_points: gain_hit_points,
    increase_maximum_hit_points:increase_maximum_hit_points,
    switch_weapons:switch_weapons,
    add_weapon:add_weapon
};
