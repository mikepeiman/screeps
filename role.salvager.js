module.exports = {
    run: (creep) => {
        let takeEnergyTombstones = creep.room.find(FIND_TOMBSTONES, {
            filter: tombstone => tombstone.store.energy > 0
        })
        let takeEnergyDroppedResources = creep.room.find(FIND_DROPPED_RESOURCES, {
            filter: resource => resource.resourceType === RESOURCE_ENERGY
        })
        let takeEnergyRuins = creep.room.find(FIND_RUINS, {
            filter: ruin => ruin.store.energy > 0
        })

        let targetSource
        if (takeEnergyDroppedResources.length) {
            targetSource = creep.pos.findClosestByPath(takeEnergyDroppedResources)
        } else if (takeEnergyTombstones.length) {
            targetSource = creep.pos.findClosestByPath(takeEnergyTombstones)
        } else if (takeEnergyRuins.length) {
            targetSource = creep.pos.findClosestByPath(takeEnergyRuins)
        } else {
            sources = creep.room.find(FIND_SOURCES_ACTIVE)
            targetSource = creep.pos.findClosestByPath(sources)
        }

        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.memory.harvesting = true
            creep.say('🔄 harvest');
        }

        // was not upgrading, but has reached full energy capacity - time to upgrade
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.memory.harvesting = false
            creep.say('⚡ upgrade');
        }

        let creepFull = creep.carry.energy == creep.carryCapacity
        if (creep.memory.upgrading) {
            creep.say('⚡ upgrade');
            creep.memory.currentTask = '⚡ upgrade'
            let structure = creep.room.controller
            let upgrade = creep.upgradeController(structure)
            if (upgrade == ERR_NOT_IN_RANGE) {
                creep.say('⚡!');
                creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffffff' } });
            } else {
                upgrade
                creep.say('⚡⚡');
            }
        } else {
            creep.memory.currentTask = '➕⚡ harvest'
            creep.say('➕⚡');
            console.log("🚀 ~ file: role.salvager.js ~ line 60 ~ targetSource", targetSource)
            harvest(targetSource)
        }

        function harvest(resource) {
            let x = creep.withdraw(resource, RESOURCE_ENERGY)
            if (x == ERR_NOT_IN_RANGE) {

                creep.memory.currentTask = '⚡ harvest'
                creep.say('⚡🥾');
                creep.moveTo(resource, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 25 });
            } else if (x == ERR_INVALID_TARGET) {
                x = creep.pickup(resource, RESOURCE_ENERGY)
                if (x == ERR_NOT_IN_RANGE) {
                    creep.memory.currentTask = '⚡ harvest'
                    creep.say('⚡🥾');
                    creep.moveTo(resource, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 25 });
                } else if (x == ERR_INVALID_TARGET) {
                    x = creep.harvest(resource, RESOURCE_ENERGY)
                    if (x == ERR_NOT_IN_RANGE) {
                        creep.memory.currentTask = '⚡ harvest'
                        creep.say('⚡🥾');
                        creep.moveTo(resource, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 25 });
                    }
                }
            }
        }
    }
}