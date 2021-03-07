let dests = [[26,34], [25,34],[24,34],[23,34]]
var idleCreep = {

    /** @param {Creep} creep **/


    run: function (creep) {

        if (creep.store.getFreeCapacity() > 0) {
            // if (Math.random() < 0.5) {
            //     console.log(`In the idleCreep module, random <0.5`)
            //     // pathfinder.run(creep)
            // }
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {

                // for (dest in dests) {
                //     let x = creep.moveTo(dest)
                //     if(x != 0){console.log(`This creep ${creep} cannot get to ${dest}`)} else {return}
                // }

            }
        }
    }
};

module.exports = idleCreep;