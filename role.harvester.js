let taskUpgrade = require('task.upgrade')
let taskPowerTowers = require('task.transfer.energy.to.towers')
let taskFillStorageEnergy = require('task.transfer.energy.to.storage')
let taskFillRoomEnergy = require('task.give.energy.to.room')
let getEnergyFromStorage = require('task.get.energy.from.storage')

module.exports = {
    run: function (creep, emergency) {
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
        let towers = []
        let towersObj = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_TOWER)
                && s.store.getFreeCapacity(RESOURCE_ENERGY) > 50
        });
        for (let i in towersObj) {
            let t = towersObj[i]
            towers = [...towers, t]
        }
        // energy transfer TO target logic
        if (spawnAndExtensions.length) {
            transferTarget = creep.pos.findClosestByPath(spawnAndExtensions)
        } else if (towers.length) {
            let t = _.min(towers, t => t.store.getUsedCapacity(RESOURCE_ENERGY))
            transferTarget = t
        } else {
            transferTarget = creep.pos.findClosestByPath(containerTargets)
        }
        console.log(`🚀 ~ ${creep} role.harvester.js ~ line 39 ~ transferTarget`, transferTarget)


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
        console.log(`🚀 ~ ${creep} role.harvester.js ~ line 61 ~ harvestTarget`, harvestTarget)

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
        }

        // if there is an emergency - a manual flag I set - get energy from storage and fill room ASAP for spawning
        if (emergency) {
            if (!creep.memory.transferring) {
                creep.memory.currentTask = '!!!⚡ withdraw energy'
                getEnergyFromStorage.run(creep)
            } else {
                creep.memory.currentTask = '⚡ fill room energy'
                taskFillRoomEnergy.run(creep)
            }
            // else, no emergency, do regular source harvesting
        } else {
            if (!creep.memory.transferring) {
                creep.memory.currentTask = '➕⚡ gather energy'
                if (harvestTarget) {
                    harvest(harvestTarget)
                } else {
                    creep.memory.idle = true
                    console.log(`creep ${creep} idle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
                }
            } else {
                creep.memory.currentTask = '⚡ transfer energy'
                transfer(transferTarget)
            }
        }
    }
}

