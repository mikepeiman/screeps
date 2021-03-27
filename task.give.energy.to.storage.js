module.exports = {
    run: (creep) => {
        let moveOpts = { visualizePathStyle: { stroke: '#aaffff' }, reusePath: 5 }
        let storage = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store.getFreeCapacity() > 0
        })
        let toTarget = creep.pos.findClosestByPath(storage)
        let x = creep.transfer(toTarget, RESOURCE_ENERGY)

        if (creep.transfer(toTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(toTarget, moveOpts);
        }

    }

}



