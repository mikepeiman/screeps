// let roleUpgrader = require('role.upgrader');
module.exports = {
    run: function (creep) {
        let energy = creep.room.energyAvailable;
        let energyCapacity = creep.room.energyCapacityAvailable;
        let unusedEnergyCapacity = energyCapacity - energy
        creep.memory.currentRole = 'harvester'
        let moveOpts = { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 5 }

        // energy transfer TO targets
        let transferTarget, harvestTarget
        let spawnAndExtensions = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_SPAWN
                || s.structureType == STRUCTURE_EXTENSION)
                && s.energy < s.energyCapacity
        });
        let containerTargets = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_CONTAINER)
                && s.energy < s.energyCapacity
        });
        let towers = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_TOWER)
                && s.energy < s.energyCapacity
        });

        // energy transfer TO target logic
        if (towers.length) {
            transferTarget = creep.pos.findClosestByPath(towers)
        }
        else if (spawnAndExtensions.length) {
            transferTarget = creep.pos.findClosestByPath(spawnAndExtensions)

        } else {
            transferTarget = creep.pos.findClosestByPath(containerTargets)
        }

        // energy harvest FROM targets
        let sources = creep.room.find(FIND_SOURCES_ACTIVE)
        let containerSources = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_CONTAINER)
                && s.store.getUsedCapacity(RESOURCE_ENERGY) > 0
        });
        // console.log(`🚀 ~ file: role.harvester.js ~ line 41 ~ containerSources energy ${containerSources.getUsedCapacity(RESOURCE_ENERGY)}`, containerSources)

        // energy harvest FROM logic
        if (containerSources.length && unusedEnergyCapacity < 1) {
            harvestTarget = creep.pos.findClosestByPath(containerSources)
        } else {
            harvestTarget = creep.pos.findClosestByPath(sources)
        }

        function harvest(resource) {
            let x = creep.harvest(resource, RESOURCE_ENERGY)
            if (x == ERR_NOT_IN_RANGE) {
                creep.memory.currentTask = '⚡ harvest'
                // // creep.say('⚡🥾');
                creep.moveTo(resource, moveOpts);
            } else {
                x
            }
        }

        function transfer(toTarget) {
            if (creep.transfer(toTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.memory.currentTask = '⚡ transfer'
                // // creep.say('⚡🥾');
                creep.moveTo(toTarget, moveOpts);
            }
            if (creep.transfer(toTarget, RESOURCE_ENERGY) == 0) {
                // // creep.say('⚡🔄🔌');
            }
        }

        // core logic: if creep full, transfer. If not full, harvest
        let creepFull = creep.carry.energy == creep.carryCapacity
        if (creepFull) {
            creep.memory.energyFull = true
            creep.memory.transferring == true
            creep.memory.harvesting = false
            creep.memory.currentTask = '⚡ find transfer target'
        } else if (creep.carry.energy > 0 && creep.memory.transferring) {
            creep.memory.energyFull = false
        } else if (creep.carry.energy == 0) {
            creep.memory.energyFull = false
            creep.memory.harvesting = true
            creep.memory.transferring == false
        }

        if (creep.memory.harvesting) {
            creep.memory.currentTask = '➕⚡ gather energy'
            // // creep.say('➕⚡');
            harvest(harvestTarget)
        } else {
            creep.memory.currentTask = '⚡ transfer energy'
            // // creep.say('⚡🔄');
            transfer(transferTarget)
        }
    }
}

