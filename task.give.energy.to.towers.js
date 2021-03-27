module.exports = {
    run: (creep) => {
        let moveOpts = { visualizePathStyle: { stroke: '#aaffff' }, reusePath: 5 }
        let towers = []
        let towersObj = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_TOWER)
                && s.store.getFreeCapacity(RESOURCE_ENERGY) > 20
        });
        for (let i in towersObj) {
            let t = towersObj[i]
            towers = [...towers, t]
        }
        if (towers.length) {
            let t = _.min(towers, t => t.store.getUsedCapacity(RESOURCE_ENERGY))
            transferTarget = t
        }

        let x = creep.transfer(transferTarget, RESOURCE_ENERGY)
        if (creep.transfer(transferTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(transferTarget, moveOpts);
        }

    }

}



