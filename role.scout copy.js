module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if in target room
        if (creep.room.name != creep.memory.target) {
            // find exit to target room
            // var exit = creep.room.findExitTo(creep.memory.target);
            // move to exit
            creep.say('🗺🛸');
            creep.moveTo(new RoomPosition(20,45,'W6N54'))
            // creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        else {
            // now we're in the next room
            // do something
            console.log(`!!!!!!!!!!!!!!!!! Now we're in the next room. Do something`)
        }
    }
};