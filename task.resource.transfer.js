module.exports = {
    run: function (creep) {

        let moveOpts = { visualizePathStyle: { stroke: '#00ff00' }, ignoreCreeps: false, reusePath: 3 }
        let energy = creep.room.energyAvailable;
        let energyCapacity = creep.room.energyCapacityAvailable;
        // console.log(`🚀 ~ file: role.harvester.js ~ line 11 ~ energyCapacity`, energyCapacity)
        let unusedEnergyCapacity = energyCapacity - energy
        let roomEnergyFull = unusedEnergyCapacity == 0
        // console.log(`🚀 ~ file: role.harvester.js ~ line 13 ~ unusedEnergyCapacity`, unusedEnergyCapacity)
        creep.memory.currentRole = 'resource-mover'
        let hostiles = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: (c) => c.owner.username != "cplive" && c.owner.username != "Brun1L" && c.owner.username != "mrmartinstreet"
        });
        let energySource = false
        let harvestResourceType = `${RESOURCE_ENERGY}`

        let ruinsWithResources = creep.room.find(FIND_RUINS, {
            filter: r => r.store.getUsedCapacity() > 0
        })
        console.log(`🚀 ~ file: role.resource.mover.js:17 ~ ruinsWithResources:`, ruinsWithResources.length)



        // energy transfer TO targets
        let transferTarget, harvestTarget
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
        let containerDestinations = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE)
                && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        })
        console.log(`🚀 ~ file: role.resource.mover.js:42 ~ containerDestinations:`, containerDestinations)
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
        } else if (containerDestinations.length) {
            transferTarget = containerDestinations[0]
        } else {
            transferTarget = "upgradeController"
        }
        // console.log(`🚀 ~ file: role.harvester.js ~ line 57 ~ transferTarget`, transferTarget)


        // resource NOT ENERGY withdraw from targets
        if (ruinsWithResources.length > 0) {
            harvestResourceType = 'RUINS'
            ruinsWithResources.sort((a, b) => b.store.getUsedCapacity() - a.store.getUsedCapacity())
            // for (let i = 0; i < ruinsWithResources.length; i++) {
            //     let ruin = ruinsWithResources[i]
            //     console.log(`🚀 ~ file: RESOURCE MOVER.js:82 ~ ruin ${ruin} - store ${ruin.store}`, ruin.store.getUsedCapacity())
            //     RESOURCES_ALL.forEach(resource => {
            //         ruin.store[resource] > 0 ? console.log(`${ruin.structure}: ${ruin.id} contains resource ${resource}: ${ruin.store[resource]}`) : false
            //     })
            // }
        }


        // energy harvest FROM targets
        let sources = creep.room.find(FIND_SOURCES_ACTIVE)
        let containerSources = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_CONTAINER)
                && s.store.getUsedCapacity(RESOURCE_ENERGY) > 0
        });
        let takeEnergyRuins = creep.room.find(FIND_RUINS, {
            filter: ruin => ruin.store.energy > 20
        })
        // energy harvest FROM logic

        //  console.log(`🚉 ~ file: role.harvester.js:75 ~ creep.name:`, creep.name)
        if (takeEnergyRuins.length > 0) {
            // console.log(`🚀 ~ file: role.harvester.js:75 ~ takeEnergyRuins.length > 0:`, takeEnergyRuins.length > 0)
            harvestTarget = creep.pos.findClosestByPath(takeEnergyRuins)
            energySource = "ruin"
            // console.log(`🚀 ~ file: role.harvester.js:77 ~ harvestTarget:`, harvestTarget)
        } else if (containerSources.length) {
            harvestTarget = creep.pos.findClosestByPath(containerSources)
            // console.log(`🚀 ~ file: role.harvester.js:80 ~ harvestTarget:`, harvestTarget)
            energySource = "container"
        } else {
            harvestTarget = creep.pos.findClosestByPath(sources)
            // console.log(`🚀 ~ file: role.harvester.js:84 ~ harvestTarget:`, harvestTarget)
            energySource = "source"
        }
        // console.log(`🚀 ~ file: role.harvester.js ~ line 76 ~ harvestTarget ${harvestTarget} type ${harvestTarget.store}`)

        function harvest(resource, harvestResourceType) {
            // console.log(`🚀 ~ file: role.harvester.js:92 ~ harvest ~ resource:`, resource)
            let x
            if (energySource == "source") {
                // console.log(`🚀 ~ file: role.harvester.js:95 ~ harvest ~ !energySource:`, !energySource)
                x = creep.harvest(resource, harvestResourceType)
            } else {
                // console.log(`🚀 ~ file: role.harvester.js:98 ~ harvest ~ !energySource:`, energySource)
                x = creep.withdraw(resource, harvestResourceType)
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

        function transfer(toTarget, resourceType) {
            console.log(`🚀 ~ file: role.resource.mover.js:147 ~ transfer ~ toTarget, resourceType:`, toTarget, resourceType)
            let x = creep.transfer(toTarget, resourceType)
            console.log(`🚀 ~ file: role.resource.mover.js:149 ~ transfer ~  x:`,  x)
            creep.moveTo(toTarget, moveOpts);
            if (creep.transfer(toTarget, resourceType) == ERR_NOT_IN_RANGE) {
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
        } else {
            if (creep.memory.transferring == false) {
                // console.log('!creep.memory.transferring: NOT XFER XFER XFER',);
                creep.memory.currentTask = '➕⚡ gather energy'
                if (harvestTarget) {
                    // console.log(`🚀 ~ file: role.harvester.js ~ line 145 ~ harvestTarget`, harvestTarget)
                    harvest(harvestTarget, harvestResourceType)
                } else {
                    creep.memory.idle = true
                    console.log(`creep ${creep} idle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
                }
            } else {
                console.log(`${creep.name} 🚚🚛🚚🚀 ~ file: role.resource.mover.js:169 ~ transferTarget:`, transferTarget)
                if (transferTarget == "upgradeController") {
                    taskUpgradeController.run(creep)
                } else if (buildTargets.length) {
                    console.log(`🚀🔧🔧🔧 ~ file: role.harvester.js:165 ~ ${creep.name} taskGiveEnergyToBuild: ${buildTargets[0]}`,)
                    taskGiveEnergyToBuild.run(creep, buildTargets)
                } else {
                    creep.memory.currentTask = '⚡ transfer energy'
                    // taskUpgradeController.run(creep)
                    console.log(`🚀 ~ file: role.resource.mover.js:178 ~ transferTarget:`, transferTarget)
                    transfer(transferTarget, `${RESOURCE_ENERGY}`)
                }

            }
        }
    }
}

