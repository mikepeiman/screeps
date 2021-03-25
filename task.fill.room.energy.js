module.exports = {
    run: (creep) => {
        // console.log(`🚀 ~ file: task.fill.room.energy.js ~ line 18 ~ creep`, creep)
        let moveOpts = { visualizePathStyle: { stroke: '#aaffff' }, reusePath: 5 }
        let spawnAndExtensions = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_SPAWN
                || s.structureType == STRUCTURE_EXTENSION)
                && s.energy < s.energyCapacity
        });
        let toTarget = creep.pos.findClosestByPath(spawnAndExtensions)
        let x = creep.transfer(toTarget, RESOURCE_ENERGY)

        if (creep.transfer(toTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(toTarget, moveOpts);
        }

    }

}



