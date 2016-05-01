/**
 * Created by Kevin on 4/27/2016.
 */

//creates a room.
Room = function(description){
    this.description = description;
};

//gets a description of the room.
Room.prototype.get_description = function (){
    return this.description;
};

module.exports = Room;