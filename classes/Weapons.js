Weapons = function(name, ranged, damage_type, damage_die){
    this.name = name;
    this.ranged = ranged;
    this.damage_type = damage_type;
    this.damage_die = damage_die;
};

//gets the name of a weapon.
Weapons.prototype.weapon_get_name = function(){
    return this.name;
};

//gets the range of the weapon.
Weapons.prototype.weapon_get_ranged = function(){
    return this.ranged;
};

//gets the damage type of a weapon.
Weapons.prototype.weapon_get_damage_type = function(){
    return this.damage_type;
};

//gets the damage die of a weapon.
Weapons.prototype.weapon_get_damage_die = function(){
    return this.damage_die;
};


module.exports = Weapons;