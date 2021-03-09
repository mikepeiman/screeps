var roleHarvester = {

    /** @param {Creep} creep **/


    run: function (creep) {

        if (creep.store.getFreeCapacity() > 0) {
            delete creep.memory.spawnId
            let source
            if (creep.memory.sourceId) {
                source = Game.getObjectById(creep.memory.sourceId)
                if (!source || source.energy === 0) {
                    delete creep.memory.sourceId
                    source = undefined
                }
            }
            if (!source) {
                source = creep.room.findClosestByPath(FIND_SOURCES, {range: 1});
            }
            if (source) {
                creep.memory.sourceId = source.id
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        }
        else {
            delete creep.memory.sourceId
            let target
            if (creep.memory.spawnId) {
                target = Game.getObjectById(creep.memory.spawnId)
                if (!target || target.store.getFreeCapacity() === 0) {
                    delete creep.memory.spawnId
                    target = undefined
                }
            }
            if (!target) {
                target = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                })
            }
            if (target) {
          
                console.log(`targets available for harvester creep ${creep}`)
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                    return 'working'
                } 
            } else {
                console.log(`No targets available for harvester creep ${creep}`)
                return 'idle'
            }
        }
    }
};