let transferEnergy = (creep) => {
    // if creep is supposed to transfer energy to a structure
    if (creep.memory.working == true) {
        // find closest spawn, extension or tower which is not full
        let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_SPAWN
                || s.structureType == STRUCTURE_EXTENSION
                || s.structureType == STRUCTURE_TOWER)
                && s.energy < s.energyCapacity
        });

        // if we found one
        console.log(`role.harvester.js: ${creep}::ROLE::${creep.memory.role}::TASK::${creep.memory.task} Found a structure to receive energy: ${structure}`, structure)
        if (structure != undefined) {
            // try to transfer energy, if it is not in range
            if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.memory.currentTask = '⚡🔄 transfer'
                creep.say('⚡🔄');
                // move towards it
                creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 25 });
            }
        }
    }  