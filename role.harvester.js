let taskUpgrade = require('task.upgrade')
let taskPowerTowers = require('task.transfer.energy.to.towers')
let taskFillStorageEnergy = require('task.transfer.energy.to.storage')
let taskFillRoomEnergy = require('task.fill.room.energy')

module.exports = {
    run: function (creep) {
        let energy = creep.room.energyAvailable;
        let energyCapacity = creep.room.energyCapacityAvailable;
        let unusedEnergyCapacity = energyCapacity - energy
        creep.memory.currentRole = 'harvester'
        let moveOpts = { visualizePathStyle: { stroke: '#ffaa00' }, ignoreCreeps: true, reusePath: 10 }
        let containerSource = false
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
        if (spawnAndExtensions.length) {
            transferTarget = creep.pos.findClosestByPath(spawnAndExtensions)
        } else if (towers.length) {
            // let tEnergy = t.store.getUsedCapacity()
            let t = _.min(towers, t=> t.store.getUsedCapacity(RESOURCE_ENERGY) )
            transferTarget = creep.pos.findClosestByPath(t)
        } else {
            transferTarget = creep.pos.findClosestByPath(containerTargets)
        }

        // energy harvest FROM targets
        let sources = creep.room.find(FIND_SOURCES_ACTIVE)
        let containerSources = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_CONTAINER)
                && s.store.getUsedCapacity(RESOURCE_ENERGY) > 0
        });


        // energy harvest FROM logic
        if (containerSources.length) {
            harvestTarget = creep.pos.findClosestByPath(containerSources)
            containerSource = true
        } else {
            harvestTarget = creep.pos.findClosestByPath(sources)
            containerSource = false
        }

        function harvest(resource) {
            let x
            if (!containerSource) {
                x = creep.harvest(resource, RESOURCE_ENERGY)
            } else {
                x = creep.withdraw(resource, RESOURCE_ENERGY)
            }

            if (x == ERR_NOT_IN_RANGE) {
                creep.memory.currentTask = '⚡ harvest'
                creep.moveTo(resource, moveOpts);
            } else {
                x
            }
        }

        function transfer(toTarget) {
            if (creep.transfer(toTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(toTarget, moveOpts);
            }
        }

        // core logic: if creep full, transfer. If not full, harvest
        let creepFull = creep.carry.energy == creep.carryCapacity
        if (creepFull) {
            creep.memory.transferring = true
            creep.memory.idle = false
            creep.memory.currentTask = '⚡ find transfer target'
        } else if (creep.carry.energy > 0 && creep.memory.transferring) {
            creep.memory.energyFull = false
        } else if (creep.carry.energy == 0) {
            creep.memory.idle = false
            creep.memory.transferring = false
        } else if(creep.memory.idle) {
            transfer(transferTarget)
        }

        if (!creep.memory.transferring) {
            creep.memory.currentTask = '➕⚡ gather energy'
            if (harvestTarget) {
                harvest(harvestTarget)
            } else {
                creep.memory.idle = true
                console.log(`creep ${creep} idle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
            }
            // console.log(`🚀 ~ file: role.harvester.js ~ line 95 ~ harvestTarget`, harvestTarget)
        } else {
            creep.memory.currentTask = '⚡ transfer energy'
            transfer(transferTarget)
        }
    }
}

