var roleHarvester = {

    /** @param {Creep} creep **/


    run: function (creep) {

        if (creep.store.getFreeCapacity() > 0) {
            // if (Math.random() < 0.5) {
            //     console.log(`In the roleHarvester module, random <0.5`)
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
          
                console.log(`targets available for harvester creep ${creep}`)
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    return 'working'
                } 
            } else {
                console.log(`No targets available for harvester creep ${creep}`)
                return 'idle'
            }
        }
    }
};

module.exports = roleHarvester;