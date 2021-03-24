module.exports = {
    run: (creep) => {

        creep.memory.currentRole = 'salvager'
        // creep.memory.transfering = true
        let moveOpts = { visualizePathStyle: { stroke: '#aaffff' }, reusePath: 5 }

        let controller = creep.room.controller
        let minerals = creep.room.find(FIND_MINERALS)
        let mineralType = minerals[0].mineralType
        let totalCapacity = creep.store.getCapacity()
        let totalLoad = creep.store.getUsedCapacity()
        console.log(`🚀 ~ file: role.salvager.js ~ line 13 ~ totalLoad`, totalLoad)
        let carryingEnergy = creep.store.getUsedCapacity(RESOURCE_ENERGY)
        let carryingMineral = creep.store.getUsedCapacity(mineralType)
        let nonEnergyLoad = totalLoad - carryingEnergy
        let storage = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store.getFreeCapacity() > 100
        })
        let containers = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store.getFreeCapacity() > 100
        })


        let takeEnergyTombstones = creep.room.find(FIND_TOMBSTONES, {
            filter: tombstone => tombstone.store.energy > 0
        })
        let droppedResourcesEnergy = creep.room.find(FIND_DROPPED_RESOURCES, RESOURCE_ENERGY)
        let droppedResourcesMinerals = creep.room.find(FIND_DROPPED_RESOURCES, mineralType)
        let takeEnergyRuins = creep.room.find(FIND_RUINS, {
            filter: ruin => ruin.store.energy > 0
        })

        let targetSource

        if (droppedResourcesEnergy.length) {
            targetSource = creep.pos.findClosestByPath(droppedResourcesEnergy)
            console.log(`${creep} 🚀 ~ file: role.salvager.js ~ line 16 ~ targetSource`, targetSource)
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

        console.log(`🚀 ~ file: role.salvager.js ~ line 58 ~ targetSource`, targetSource)

        // for (var resource in creep.store) {
        // console.log(`🚀 ~ file: role.salvager.js ~ line 36 ~ resource`, resource)
        // }
        // let mineralsOnBoard = creep.store.getUsedCapacity(RESOURCE_MINERALS)
        // console.log(`🚀 ~ file: role.salvager.js ~ line 33 ~ mineralsOnBoard`, mineralsOnBoard)
        // let resourcesOnBoard = []
        // if (creep.store.getUsedCapacity()) {
        //     for (var i in creep.store) {
        //         let amt = creep.store.getUsedCapacity(i)
        //         console.log(`🚀 ~ file: role.salvager.js ~ line 36 ~ i ${i}: ${amt}`,)
        //         resourcesOnBoard = [...resourcesOnBoard, i]
        //     }
        // }


        // was transfering, but out of resource now: begin scavenging agaiN
        if (creep.memory.transfering && totalLoad == 0) {
            creep.memory.transfering = false
        }
        // was not transfering, but full of resource now: begin transfering
        if (!creep.memory.transfering && creep.store.getFreeCapacity() < totalCapacity * .9) {
            creep.memory.transfering = true
            creep.memory.currentTask = '⚡💎 transfer'
        }

        if (creep.memory.transfering) {
            for (var res in creep.store) {
                let deposit = creep.transfer(storage[0], res)
                let amt = creep.store.getUsedCapacity(res)
                console.log(`🚀 ~ file: role.salvager.js ~ line 88 ~ res ${res}: amt `, amt)
                console.log(`🚀 ~ file: role.salvager.js ~ line 89 ~ storage`, storage)
                console.log(`🚀 ~ file: role.salvager.js ~ line 86 ~ deposit result `, deposit)
                if (deposit == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage[0])
                }
            }
        } else {
            harvest(targetSource)
        }

        //     for (var res in creep.store) {
        //         let amt = creep.store.getUsedCapacity(res)
        //         if(res == "energy"){

        //         }
        //     }
        //         transfer(resource)
        //     } else {
        //         transfer(RESOURCE_ENERGY)
        //     }
        // } else {
        //     harvest(targetSource)
        // }


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