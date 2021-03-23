module.exports = {
    run: (creep) => {
        let takeEnergyTombstones = creep.room.find(FIND_TOMBSTONES, {
            filter: tombstone => tombstone.store.energy > 0
        })
        let takeEnergyDroppedResources = creep.room.find(FIND_DROPPED_RESOURCES)
        let takeEnergyRuins = creep.room.find(FIND_RUINS, {
            filter: ruin => ruin.store.energy > 0
        })

        let targetSource
        if (takeEnergyDroppedResources.length) {
            targetSource = creep.pos.findClosestByPath(takeEnergyDroppedResources)
            // console.log(`${creep} 🚀 ~ file: role.salvager.js ~ line 16 ~ targetSource`, targetSource)
            // let amt = targetSource.amount
            // console.log("🚀 ~ file: role.salvager.js ~ line 18 ~ amt", amt)
        } else if (takeEnergyTombstones.length) {
            targetSource = creep.pos.findClosestByPath(takeEnergyTombstones)
            // console.log("🚀 ~ file: role.salvager.js ~ line 19 ~ targetSource", targetSource)
            // let amt = targetSource.amount
            // console.log("🚀 ~ file: role.salvager.js ~ line 23 ~ amt", amt)
        } else if (takeEnergyRuins.length) {
            targetSource = creep.pos.findClosestByPath(takeEnergyRuins)
            // console.log("🚀 ~ file: role.salvager.js ~ line 22 ~ targetSource", targetSource)
            // let amt = targetSource.amount
            // console.log("🚀 ~ file: role.salvager.js ~ line 28 ~ amt", amt)
        } else {
            sources = creep.room.find(FIND_SOURCES_ACTIVE)
            targetSource = creep.pos.findClosestByPath(sources)
        }
        // for (var resource in creep.store) {
        // console.log(`🚀 ~ file: role.salvager.js ~ line 36 ~ resource`, resource)
        // }
        // let mineralsOnBoard = creep.store.getUsedCapacity(RESOURCE_MINERALS)
        // console.log(`🚀 ~ file: role.salvager.js ~ line 33 ~ mineralsOnBoard`, mineralsOnBoard)
        if (creep.store.getFreeCapacity() == 0) {
            for (var resource in creep.store) {
                // console.log(`🚀 ~ file: role.salvager.js ~ line 36 ~ resource`, resource)
            }
        }

        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.memory.harvesting = true
            // // creep.say('🔄 harvest');
        }

        // was not upgrading, but has reached full energy capacity - time to upgrade
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.memory.harvesting = false
            // // creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            // // creep.say('⚡ upgrade');
            creep.memory.currentTask = '⚡ upgrade'
            let structure = creep.room.controller
            let upgrade = creep.upgradeController(structure)
            if (upgrade == ERR_NOT_IN_RANGE) {
                // // creep.say('⚡!');
                creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffffff' } });
            } else {
                upgrade
                // // creep.say('⚡⚡');
            }
        } else {
            creep.memory.currentTask = '➕⚡ harvest'
            // // creep.say('➕⚡');
            harvest(targetSource)
        }

        function harvest(resource) {
            // console.log(`🚀 ~ file: role.salvager.js ~ line 74 ~ harvest ~ resource`, resource)
            let x = creep.withdraw(resource, RESOURCE_ENERGY)
            if (x == ERR_NOT_IN_RANGE) {
                // console.log("🚀 ~ file: role.salvager.js ~ line 59 ~ harvest ~ x", x)
                creep.memory.currentTask = '⚡ harvest'
                creep.moveTo(resource, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 25 });
            } else if (x == ERR_INVALID_TARGET) {
                x = creep.pickup(resource, RESOURCE_ENERGY)
                if (x == ERR_NOT_IN_RANGE) {
                    creep.memory.currentTask = '⚡ harvest'
                    creep.moveTo(resource, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 25 });
                } else if (x == ERR_INVALID_TARGET) {
                    x = creep.harvest(resource, RESOURCE_ENERGY)
                    if (x == ERR_NOT_IN_RANGE) {
                        creep.memory.currentTask = '⚡ harvest'
                        creep.moveTo(resource, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 25 });
                    }
                }
            }
        }
    }
}