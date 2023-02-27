let taskUpgrade = require('task.upgrade')
let taskPowerTowers = require('task.transfer.energy.to.towers')
let taskFillStorageEnergy = require('task.transfer.energy.to.storage')
let taskFillRoomEnergy = require('task.fill.room.energy')
let taskBuild = require('task.give.energy.to.construction')
module.exports = {
    run: (creep, taskPriority) => {

        taskPriority = "upgradeController"

        creep.memory.currentRole = 'salvager'
        let moveOpts = { visualizePathStyle: { stroke: '#ff00ff' }, reusePath: 5 }

        let energy = creep.room.energyAvailable;
        let energyCapacity = creep.room.energyCapacityAvailable;
        let unusedEnergyCapacity = energyCapacity - energy
        let controller = creep.room.controller
        let minerals = creep.room.find(FIND_MINERALS)
        let mineralType = minerals[0].mineralType
        let totalLoad = creep.store.getUsedCapacity()
        let carryingEnergy = creep.store.getUsedCapacity(RESOURCE_ENERGY)
        let carryingMineral = creep.store.getUsedCapacity(mineralType)
        let carryingResources = []


        let buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(buildTargets.length){
            taskPriority = "build"
        }


        for (let r in creep.store) {
            if(r != 'energy') {
                carryingResources.push(r)
            }
        }

        let nonEnergyLoad = totalLoad - carryingEnergy
        let storage = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store.getFreeCapacity() > 100
        })
        let containers = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store.getFreeCapacity() > 100
        })

        let tombstones = creep.room.find(FIND_TOMBSTONES, {
        })

        // TODO: complete salvage pickup for tombstones and dropped resources other than energy
        // a good approach might be to not distinguish between and resource type, and just pick it all up in sequence
        tombstones.forEach(tombstone => {
            for (let i in tombstone.store) {
                let res = tombstone.store[i]
                let t = res.resourceType
                let a = res.amount
                // console.log(`🚀 ~ item ${i}: role.salvager.js ~ line 35 ~ res ${res} type ${t} amount ${a}`)
            }
        });

        let takeEnergyTombstones = creep.room.find(FIND_TOMBSTONES, {
            filter: tombstone => tombstone.store.energy > 0
        })
        let droppedResourcesOther = creep.room.find(FIND_DROPPED_RESOURCES, {
            filter: res => res.resourceType != RESOURCE_ENERGY
        })
        let droppedResourcesEnergy = creep.room.find(FIND_DROPPED_RESOURCES, RESOURCE_ENERGY)
        let droppedResourcesMinerals = creep.room.find(FIND_DROPPED_RESOURCES, mineralType)
        let takeEnergyRuins = creep.room.find(FIND_RUINS, {
            filter: ruin => ruin.store.energy > 0
        })
        // console.log(`🚀 ~ file: role.salvager.js:71 ~ takeEnergyRuins:`, takeEnergyRuins)
        let targetSource

        if (droppedResourcesEnergy.length) {
            targetSource = creep.pos.findClosestByPath(droppedResourcesEnergy)
            // console.log(`${creep} 🚀 ~ ${creep}: role.salvager.js ~ line 16 ~ targetSource`, targetSource)
        } else if (takeEnergyTombstones.length) {
            targetSource = creep.pos.findClosestByPath(takeEnergyTombstones)
        } else if (takeEnergyRuins.length) {
            // console.log(`🚀 ~ file: role.salvager.js:80 ~ takeEnergyRuins is TRUE:`, takeEnergyRuins.length)
            targetSource = creep.pos.findClosestByPath(takeEnergyRuins)
            // console.log(`🚀 ~ file: role.salvager.js:82 ~ targetSource:`, targetSource)
        } else {
            sources = creep.room.find(FIND_SOURCES_ACTIVE)
            targetSource = creep.pos.findClosestByPath(sources)
        }

        // console.log(`🚀 ~ file: role.salvager.js ~ line 58 ~ creep.store.getUsedCapacity()`, creep.store.getUsedCapacity())
        // was transfering, but out of resource now: begin salvaging/harvesting again
        if (creep.memory.transfering && creep.store.getUsedCapacity() == 0) {
            creep.memory.transfering = false
        }
        // was not transfering, but full of resource now: begin transfering
        if (!creep.memory.transfering && creep.store.getFreeCapacity() == 0) {
            creep.memory.transfering = true
            creep.memory.currentTask = '⚡💎 transfer'
        }

        if (creep.memory.transfering) {
            // console.log(`🚀 ~ file: role.salvager.js ~ line 82 ~ taskPriority`, taskPriority)
            // console.log(`🚀 ~ file: role.salvager.js ~ line 98 ~ carryingMineral`, carryingMineral)

            if (carryingResources[0]) {
                let deposit = creep.transfer(storage[0], carryingResources[0])
                if (deposit == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage[0])
                }
            } else {
                if(taskPriority == "build"){
                    taskBuild.run(creep, buildTargets)
                }
                if (taskPriority == "upgradeController") {
                    taskUpgrade.run(creep)
                }
                if (taskPriority == "fillRoomEnergy") {
                    taskFillRoomEnergy.run(creep)
                    if (unusedEnergyCapacity == 0) {
                        taskPowerTowers.run(creep)
                    }
                }
                if (taskPriority == "fillStorage") {
                    taskFillStorageEnergy.run(creep)
                }
                if (taskPriority == "powerTowers") {
                    taskPowerTowers.run(creep)
                }
            }
        }
        else {
            harvest(targetSource)
        }

        function transfer(resource) {
            if (carryingMineral > 0) {
                let deposit = creep.transfer(storage, resource)
                if (deposit == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage)
                }
            } else {
                let upgrade = creep.upgradeController(controller)
                if (upgrade == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller)
                }
            }


        }

        function harvest(resource) {
            // console.log(`🚀 ~ file: role.salvager.js ~ line 74 ~ harvest ~ resource`, resource)
            let x = creep.withdraw(resource, RESOURCE_ENERGY)
            if (x == ERR_NOT_IN_RANGE) {
                // console.log("🚀 ~ file: role.salvager.js ~ line 59 ~ harvest ~ x", x)
                creep.memory.currentTask = '⚡ withdraw from ruin or tombstone'
                creep.moveTo(resource, moveOpts);
            } else if (x == ERR_INVALID_TARGET) {
                x = creep.pickup(resource, RESOURCE_ENERGY)
                if (x == ERR_NOT_IN_RANGE) {
                    creep.memory.currentTask = '⚡ pickup energy'
                    creep.moveTo(resource, moveOpts);
                } else if (x == ERR_INVALID_TARGET) {
                    x = creep.harvest(resource, RESOURCE_ENERGY)
                    if (x == ERR_NOT_IN_RANGE) {
                        creep.memory.currentTask = '⚡ harvest source'
                        creep.moveTo(resource, moveOpts);
                    }
                }
            }
        }
    }
}