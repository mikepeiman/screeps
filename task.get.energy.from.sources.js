module.exports = {
    run: (creep) => {
        let moveOpts = { visualizePathStyle: { stroke: '#ffaa00' },  reusePath: 3 }
        let storage = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store.getUsedCapacity() > 0
        })

        function withdraw(resource) {
            let x = creep.withdraw(resource, RESOURCE_ENERGY)
            if (x == ERR_NOT_IN_RANGE) {
                creep.memory.currentTask = '⚡ withdraw from storage'
                creep.moveTo(resource, moveOpts);
            }
        }

        withdraw(storage[0])
    }
}




