let taskUpgradeController = require('task.give.energy.to.upgrade.controller')
let taskPowerTowers = require('task.transfer.energy.to.towers')
let taskFillStorageEnergy = require('task.transfer.energy.to.storage')
let taskFillRoomEnergy = require('task.give.energy.to.room')
let getEnergyFromStorage = require('task.get.energy.from.storage')
const taskGiveEnergyToUpgradeController = require('./task.give.energy.to.upgrade.controller')
const taskGiveEnergyToTowers = require('./task.give.energy.to.towers')
const taskGetEnergyFromStorage = require('./task.get.energy.from.storage')
const taskGiveEnergyToBuild = require('./task.give.energy.to.construction')

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
        let energySource = false

        // energy transfer TO targets
        let transferTarget, harvestTarget
        transferTarget = "upgradeController"
        let buildTargets = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
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
                && s.store.getFreeCapacity(RESOURCE_ENERGY) > 250
        });
        for (let i in towersObj) {
            let t = towersObj[i]
            towers = [...towers, t]
        }
        let lowestEnergyTower
        if (towers.length) {
            lowestEnergyTower = _.min(towers, t => t.store.getUsedCapacity(RESOURCE_ENERGY))
            lowestEnergyTowerCapacity = lowestEnergyTower.store.getFreeCapacity(RESOURCE_ENERGY)
            console.log(`🚀 ~ file: role.harvester.js ~ line 49 ~ ${lowestEnergyTower} lowestEnergyTowerCapacity`, lowestEnergyTowerCapacity)
        }
        // energy transfer TO target logic
        if (spawnAndExtensions.length) {
            transferTarget = creep.pos.findClosestByPath(spawnAndExtensions)
        } else if (towers.length && lowestEnergyTowerCapacity > 400) {
            transferTarget = lowestEnergyTower
        } else if (buildTargets.length) {
            transferTarget = "constructionSite"
        } else {
            transferTarget = "upgradeController"
        }
        console.log(`🚀 ~ file: role.harvester.js ~ line 64 ~ transferTarget`, transferTarget)



        // energy harvest FROM targets
        let sources = creep.room.find(FIND_SOURCES_ACTIVE)
        let containerSources = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE)
                && s.store.getUsedCapacity(RESOURCE_ENERGY) > 50000
        });
        console.log(`🚀 ~ file: role.harvester.js:73 ~ containerSources:`, containerSources)

        let droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
            filter: resource => resource.resourceType == RESOURCE_ENERGY
        })
        // console.log(`🚀 ~ file: role.harvester.js:77 ~ droppedEnergy:`, droppedEnergy, droppedEnergy.length)
        let tombstoneEnergy = creep.room.find(FIND_TOMBSTONES, {
            filter: tombstone => tombstone.store.energy > 0
        })
        // console.log(`🚀 ~ file: role.harvester.js:81 ~ tombstoneEnergy:`, tombstoneEnergy, tombstoneEnergy.length)
        let ruinsEnergy = creep.room.find(FIND_RUINS, {
            filter: ruin => ruin.store.energy > 0
        })
        // console.log(`🚀 ~ file: role.harvester.js:85 ~ ruinsEnergy:`, ruinsEnergy, ruinsEnergy.length)
        let collectEnergyTargets = []
        ruinsEnergy.length ? collectEnergyTargets.push(ruinsEnergy) : false
        tombstoneEnergy.length ? collectEnergyTargets.push(tombstoneEnergy) : false
        droppedEnergy.length ? collectEnergyTargets.push(droppedEnergy) : false
        // console.log(`🚀♻▶🔳💎 ~ file: role.harvester.js:90 ~ collectEnergyTargets:`, collectEnergyTargets, collectEnergyTargets.length)
        collectEnergyTargets.filter(t => {
            console.log(`🚀 ~ file: role.harvester.js:94 ~ t:`, t)
            return t.length > 0 ? t : null
        })
        // energy harvest FROM logic

        // console.log(`🚉 ~ file: role.harvester.js:75 ~ creep.name:`, creep.name)
        if (collectEnergyTargets.length > 0) {
            // console.log(`🚀 ~ file: role.harvester.js:89 ~ collectEnergyTargets.length > 0:`, collectEnergyTargets.length > 0)
            collectEnergyTargets.forEach(target => {
                // console.log(`🚀 ~ file: role.harvester.js:90 ${creep.name} ~ target ${target} pos ${target.pos} length ${target.length}`)
            })

            harvestTarget = creep.pos.findClosestByPath(collectEnergyTargets[0])
            energySource = "ruin"
            // console.log(`🚀 ~ file: role.harvester.js:77 ~ harvestTarget:`, harvestTarget)
        } else {
            // if (containerSources.length) {
            //     harvestTarget = creep.pos.findClosestByPath(containerSources)
            //     // console.log(`🚀 ~ file: role.harvester.js:80 ~ harvestTarget:`, harvestTarget)
            //     energySource = "container"
            // } else {

            harvestTarget = creep.pos.findClosestByPath(sources)
            // console.log(`🚀 CREEP ${creep} 🥓🥓🥓~ file: role.harvester.js:117 ~ harvestTarget for energy sources:`, harvestTarget)
            // console.log(`🚀 ~ file: role.harvester.js:84 ~ harvestTarget:`, harvestTarget)
            energySource = "source"

        }

        function harvest(resource) {
            // console.log(`🚀 ~ file: role.harvester.js:92 ~ harvest ~ resource:`, resource)
            let x
            if (energySource == "source") {
                // console.log(`🚀 ~ file: role.harvester.js:95 ~ harvest ~ !energySource:`, !energySource)
                x = creep.harvest(resource, RESOURCE_ENERGY)
                creep.moveTo(resource, moveOpts);
                // console.log(`🚀 ~ file: role.harvester.js:128 ~ harvest ~ x:`, x)
                if (x == -7) {
                    x = creep.pickup(resource, RESOURCE_ENERGY)
                    // console.log(`🚀 ~ file: role.harvester.js:132 ~ harvest ~ x:`, x)
                    creep.moveTo(resource, moveOpts);
                    x = creep.withdraw(resource, RESOURCE_ENERGY)
                    // console.log(`🚀 ~ file: role.harvester.js:135 ~ harvest ~ withdraw x:`, x)
                }
            } else {
                // console.log(`🚀 ~ file: role.harvester.js:98 ~ harvest ~ !energySource:`, energySource)
                x = creep.withdraw(resource, RESOURCE_ENERGY)
                // console.log(`🚀 ~ file: role.harvester.js:134 ~ harvest resource ${resource} loc ${resource.pos} ~ x:`, x)
                if (x == -7) {
                    x = creep.pickup(resource, RESOURCE_ENERGY)
                    // console.log(`🚀 ~ file: role.harvester.js:141 ~ harvest ~ x:`, x)
                    creep.moveTo(resource, moveOpts);
                }
            }

            if (x == ERR_NOT_IN_RANGE) {
                // console.log(`🚦⛵ ~ file: role.harvester.js:101 ~ harvest ~ x == ERR_NOT_IN_RANGE:`, x == ERR_NOT_IN_RANGE)
                creep.memory.currentTask = '⚡ harvest'
                creep.moveTo(resource, moveOpts);
            } else if (x !== 0) {
                x
                // console.log(`🚩 ~ file: role.harvester.js:107 ~ harvest ~ x:`, x)
            } else {
                x
                // console.log(`✅✨ ~ file: role.harvester.js:110 ~ harvest ~ x:`, x)
            }
        }

        function transfer(toTarget) {
            // console.log(`🚀 ~ file: role.harvester.js:162 ~ transfer ~ toTarget:`, toTarget)
            if (creep.transfer(toTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(toTarget, moveOpts);
            }
        }

        // core logic: if creep full, transfer. If not full, harvest
        let creepFull = creep.carry.energy == creep.carryCapacity
        // console.log(`🚀 ~ file: role.harvester.js ~ line 103 ~ creepFull`, creepFull)
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
        // if there is are hostiles, get storage energy
        if (hostiles[0]) {
            // console.log(`🚀 ~ file: role.harvester.js ~ line 118 ~ hostiles[0]`, hostiles[0])
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
            // if there is an spawnEmergency - a manual flag I set - get energy from storage and fill room ASAP for spawning
        } else if (spawnEmergency) {
            // console.log(`🚀 ~ file: role.harvester.js ~ line 129 ~ spawnEmergency`, spawnEmergency)
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
            if (creep.memory.transferring == false) {
                // console.log('!creep.memory.transferring: NOT XFER XFER XFER',);
                creep.memory.currentTask = '➕⚡ gather energy'
                if (harvestTarget) {
                    console.log(`🚜🚜🚜🚜🚜 ~ file: role.harvester.js:200 ~ ${creep} harvestTarget:`, harvestTarget)
                    harvest(harvestTarget)
                } else {
                    // creep.memory.idle = true
                    harvest(containerSources[0])
                    console.log(`🚀 ~ file: role.harvester.js:206 ~ containerSources[0]:`, containerSources[0])
                    console.log(`🚀 ~ file: role.harvester.js:204 ~ creep ${creep} idle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
                }
            } else {
                if (transferTarget == "upgradeController") {
                    // console.log(`🚀🔥🔥🔥 ~ file: role.harvester.js ~ line 148 ~ transferTarget upgradeController`, transferTarget)
                    taskUpgradeController.run(creep)
                } else if (transferTarget.structureType == STRUCTURE_TOWER) {
                    console.log(`🚀 ~ file: role.harvester.js:226 ~ transferTarget.structureType == STRUCTURE_TOWER:`, transferTarget.structureType == STRUCTURE_TOWER)
                    transfer(transferTarget)
                } else if (spawnAndExtensions.length) {
                    creep.memory.currentTask = '⚡ transfer energy'
                    // taskUpgradeController.run(creep)
                    transfer(transferTarget)
                } else {
                    console.log(`🚀🔧🔧🔧 ~ file: role.harvester.js:165 ~ ${creep.name} taskGiveEnergyToBuild: ${buildTargets[0]}`,)
                    taskGiveEnergyToBuild.run(creep, buildTargets)
                }

            }
        }
    }
}

