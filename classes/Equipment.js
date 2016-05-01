/**
 * Created by Kevin on 4/29/2016.
 */
//creates equipment.
Equipment = function(name){
    this.name = name;
};

//gets the name of the equipment.
Equipment.prototype.equipment_get_name = function(){
    return this.name;
};

//if the equipment is a health potion, uses it.
Equipment.prototype.equipment_health_potion = function(){
    return Math.floor((Math.random() * 6) + 1);
};

module.exports = Equipment;
