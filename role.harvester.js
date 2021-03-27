let taskUpgradeController = require('task.give.energy.to.upgrade.controller')
let taskPowerTowers = require('task.transfer.energy.to.towers')
let taskFillStorageEnergy = require('task.transfer.energy.to.storage')
let taskFillRoomEnergy = require('task.give.energy.to.room')
let getEnergyFromStorage = require('task.get.energy.from.storage')
const taskGiveEnergyToUpgradeController = require('./task.give.energy.to.upgrade.controller')
const taskGiveEnergyToTowers = require('./task.give.energy.to.towers')
const taskGetEnergyFromStorage = require('./task.get.energy.from.storage')

module.exports = {
    run: function (creep, spawnEmergency, hostilesInRoom) {
        let moveOpts = { visualizePathStyle: { stroke: '#ffaa00' }, ignoreCreeps: false, reusePath: 3 }
        let energy = creep.room.energyAvailable;
        let energyCapacity = creep.room.energyCapacityAvailable;
        // console.log(`🚀 ~ file: role.harvester.js ~ line 11 ~ energyCapacity`, energyCapacity)
        let unusedEnergyCapacity = energyCapacity - energy
        let roomEnergyFull = unusedEnergyCapacity == 0
        // console.log(`🚀 ~ file: role.harvester.js ~ line 13 ~ unusedEnergyCapacity`, unusedEnergyCapacity)
        creep.memory.currentRole = 'harvester'
        let hostiles = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: (c) => c.owner.username != "cplive" && c.owner.username != "Brun1L" && c.owner.username != "mrmartinstreet"
        });
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
        let lowestEnergyTower
        if (towers.length) {
            lowestEnergyTower = _.min(towers, t => t.store.getUsedCapacity(RESOURCE_ENERGY))
            lowestEnergyTowerValue = lowestEnergyTower.store.getFreeCapacity()
        }
        // energy transfer TO target logic
        if (spawnAndExtensions.length) {
            transferTarget = creep.pos.findClosestByPath(spawnAndExtensions)
        } else if (towers.length && lowestEnergyTowerValue < 600) {
            transferTarget = lowestEnergyTower
        } else {
            transferTarget = "upgradeController"
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
        }

        // if there is an spawnEmergency - a manual flag I set - get energy from storage and fill room ASAP for spawning
        if (hostiles[0]) {
            if (!creep.memory.transferring) {
                taskGetEnergyFromStorage.run(creep)
            } else {
                if (towers.length) {
                    taskGiveEnergyToTowers.run(creep)
                } else if (!roomEnergyFull) {
                    creep.memory.currentTask = '⚡ fill room energy'
                    taskFillRoomEnergy.run(creep)
                }
            }
        } else if (spawnEmergency) {
            if (!creep.memory.transferring) {
                creep.memory.currentTask = '!!!⚡ withdraw energy'
                getEnergyFromStorage.run(creep)
            } else if (!roomEnergyFull) {
                creep.memory.currentTask = '⚡ fill room energy'
                taskFillRoomEnergy.run(creep)
            } else if (towers.length) {
                taskGiveEnergyToTowers.run(creep)
            } else {
                taskGiveEnergyToUpgradeController.run(creep)
            }
            // else, no spawnEmergency, do regular source harvesting
        } else {
            if (!creep.memory.transferring) {
                creep.memory.currentTask = '➕⚡ gather energy'
                if (harvestTarget) {
                    harvest(harvestTarget)
                } else {
                    creep.memory.idle = true
                    // console.log(`creep ${creep} idle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
                }
            } else {
                if (transferTarget == "upgradeController") {
                    taskUpgradeController.run(creep)
                } else {
                    creep.memory.currentTask = '⚡ transfer energy'
                    transfer(transferTarget)
                }

            }
        }
    }
}

