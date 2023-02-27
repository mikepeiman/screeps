module.exports = {
    run: (creep) => {
        let moveOpts = { visualizePathStyle: { stroke: '#ffaa00' },  reusePath: 3 }
        let takeEnergyRuins = creep.room.find(FIND_RUINS, {
            filter: ruin => ruin.store.energy > 0
        })

        function withdraw(resource) {
            let x = creep.withdraw(resource, RESOURCE_ENERGY)
            if (x == ERR_NOT_IN_RANGE) {
                creep.memory.currentTask = '⚡ withdraw from storage'
                creep.moveTo(resource, moveOpts);
            }
        }

        withdraw(takeEnergyRuins[0])
    }
}




