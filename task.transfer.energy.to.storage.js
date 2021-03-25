module.exports = {
    run: (creep) => {
        let moveOpts = { visualizePathStyle: { stroke: '#aaffff' }, reusePath: 5 }
        let storage = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store.getFreeCapacity() > 100
        })
        for (var res in creep.store) {
            let deposit = creep.transfer(storage[0], res)
            if (deposit == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage[0], moveOpts)
            }
        }
    }
}




