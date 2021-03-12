// let roleUpgrader = require('role.upgrader');
module.exports = {
    run: function (creep) {

        creep.memory.currentRole = 'harvester'
        console.log(`creep ${creep} assigned Harvester role. creep.carry.energy  ${creep.carry.energy}`)
        console.log(`creep ${creep} assigned Harvester role. creep.carryCapacity  ${creep.carryCapacity}`)

        //  identify energy resources aside from sources; prioritize these dropped energy
        let takeEnergyTombstones = creep.room.find(FIND_TOMBSTONES, {
            filter: tombstone => tombstone.store.energy > 0
        })
        let takeEnergyDroppedResources = creep.room.find(FIND_DROPPED_RESOURCES, {
            filter: resource => resource.resourceType === RESOURCE_ENERGY
        })
        let takeEnergyRuins = creep.room.find(FIND_RUINS, {
            filter: ruin => ruin.store.energy > 0
        })
        let takeEnergyTargets = [...takeEnergyTombstones, ...takeEnergyDroppedResources, ...takeEnergyRuins]

        // Identify energy sources - prioritize untapped source
        let sources = creep.room.find(FIND_SOURCES_ACTIVE)
        let targetSource
        if (takeEnergyTombstones.length) {
            console.log("🚀 ~ file: role.harvester.js ~ line 25 ~ takeEnergyTombstones", takeEnergyTombstones)
            targetSource = creep.pos.findClosestByPath(takeEnergyTombstones)
        } else if (takeEnergyDroppedResources.length) {
            console.log("🚀 ~ file: role.harvester.js ~ line 33 ~ takeEnergyDroppedResources", takeEnergyDroppedResources)
            targetSource = creep.pos.findClosestByPath(takeEnergyDroppedResources)
        } else if (takeEnergyRuins.length) {
            console.log("🚀 ~ file: role.harvester.js ~ line 34 ~ takeEnergyRuins", takeEnergyRuins)
            targetSource = creep.pos.findClosestByPath(takeEnergyRuins)
        } else {
            for (let i in sources) {
                console.log("🚀 ~ file: role.harvester.js ~ line 35 ~ sources", sources)
                if (sources[i].energy == sources[i].energyCapacity) {
                    targetSource = sources[i]
                } else {
                    targetSource = creep.pos.findClosestByPath(sources);
                }
            }
        }

        let harvestResult = creep.harvest(targetSource)


        // Some initial code to refactor towards memory-stored targets
        // let targetSourceId 
        // if (targetSourceId) {
        //     targetSourceId = targetSource.id
        // }
        // creep.memory.targetSourceId = targetSourceId

        // identify energy transfer targets - prioritize spawn and extensions
        let structure
        let spawnAndExtensions = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_SPAWN
                || s.structureType == STRUCTURE_EXTENSION)
                && s.energy < s.energyCapacity
        });
        let towers = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_TOWER)
                && s.energy < s.energyCapacity
        });
        if (spawnAndExtensions.length) {
            structure = creep.pos.findClosestByPath(spawnAndExtensions)
        } else {
            structure = creep.pos.findClosestByPath(towers)
        }


        function harvest(resource) {
            let x = creep.harvest(resource, RESOURCE_ENERGY)
            if (x == ERR_NOT_IN_RANGE) {
                console.log("🚀 ~ file: role.harvester.js ~ line 75 ~ harvest ~ x", x)
                creep.memory.currentTask = '⚡ harvest'
                creep.say('⚡🥾');
                // move towards it
                creep.moveTo(resource, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 25 });
            } else if (x == ERR_INVALID_TARGET) {
                console.log(`---   WRONG RESOURCE TYPE   ---   Harvest is wrong   --- ${x}`)


                let y = creep.pickup(resource, RESOURCE_ENERGY)
                console.log("🚀 ~ file: role.harvester.js ~ line 83 ~ harvest ~ y", y)
                if (y == ERR_NOT_IN_RANGE) {
                    creep.moveTo(resource, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 25 });
                } else if (y == ERR_INVALID_TARGET) {
                    creep.say('no pickup');
                    console.log(`---   WRONG RESOURCE TYPE   ---   pickup is wrong   --- ${x}`)
                }


                let z = creep.withdraw(resource, RESOURCE_ENERGY)
                console.log("🚀 ~ file: role.harvester.js ~ line 91 ~ harvest ~ z", z)
                creep.say('no harvest');
                if (z == ERR_NOT_IN_RANGE) {
                    creep.moveTo(resource, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 25 });
                    creep.say('⚡withdraw');
                }
                
            } else {
                console.log(`---   WRONG RESOURCE TYPE   ---   withdraw is wrong AND SO IS EVERYTHING!   --- ${x}`)
            }


        }


        function transfer(toTarget) {
            if (creep.transfer(toTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                console.log("🚀 ~ file: role.harvester.js ~ line 97 ~ transfer ~ toTarget", toTarget)
                creep.memory.currentTask = '⚡ transfer'
                creep.say('⚡🥾');
                // move towards it
                creep.moveTo(toTarget, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 25 });
            }
            if (creep.transfer(toTarget, RESOURCE_ENERGY) == 0) {
                creep.say('⚡🔄🔌');
            }
        }

        // core logic: if creep full, transfer. If not full, harvest
        let creepFull = creep.carry.energy == creep.carryCapacity
        if (creepFull) {
            console.log("🚀 ~ file: role.harvester.js ~ line 43 ~ creepFull (of energy): ", creepFull)
            creep.memory.energyFull = true
            creep.memory.transferring == true
            creep.memory.harvesting = false
            creep.memory.currentTask = '⚡🔄'
            creep.say('⚡🔄?');
            transfer(structure)
        } else {
            console.log("🚀 ~ file: role.harvester.js ~ line 43 ~ creepFull (of energy): ", creepFull)
            console.log(`NOT FULL so HARVEST targetSource ${targetSource}`)
            creep.memory.energyFull = false
            creep.memory.harvesting = true
            creep.memory.transferring == false
            creep.memory.currentTask = '➕⚡'
            creep.say('➕⚡');
            harvest(targetSource)
        }

        // if creep is bringing energy to a structure but has no energy left
        // if (creep.memory.transferring == true && creep.carry.energy == 0) {
        // if (creep.memory.energyFull) {
        //     // switch state
        //     creep.memory.transferring = true;
        //     creep.memory.harvesting = false

        // } else {
        //     // switch state
        //     creep.memory.transferring = false;
        //     creep.memory.harvesting = true

        // }




        // // if creep is supposed to transfer energy to a structure
        // if (creep.memory.energyFull) {
        //     // find closest spawn, extension or tower which is not full



        //     // if we found one
        //     // console.log(`role.harvester.js: ${creep}::ROLE::${creep.memory.role}::TASK::${creep.memory.task} Found a structure to receive energy: ${structure}`, structure)
        //     if (structure != undefined) {
        //         // try to transfer energy, if it is not in range
        //         if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //             console.log("🚀 ~ file: role.harvester.js ~ line 122 ~ structure", structure)
        //             creep.memory.currentTask = '⚡🔄 transfer'
        //             creep.say('⚡🥾');
        //             // move towards it
        //             creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 25 });
        //         } else {
        //             creep.say('⚡🔄');
        //         }
        //     }
        // }
        // // if creep is supposed to harvest energy
        // else {
        //     let nearestTarget = creep.pos.findClosestByPath(takeEnergyTargets);

        //     if (nearestTarget) {
        //         takeEnergyTargets.forEach(t => {
        //             console.log("🚀 ~ file: role.harvester.js ~ line 71 ~ t", t)
        //             console.log("🚀 ~ file: role.harvester.js ~ line 71 ~ t position", t.pos)
        //         })

        //         creep.memory.currentTask = '🎁 pickup ⚡'
        //         if (creep.withdraw(nearestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE || creep.pickup(nearestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //             // move towards the source
        //             creep.say('🎁 pickup');
        //             creep.moveTo(nearestTarget, { visualizePathStyle: { stroke: '#ffaa00' } });
        //         } else if (creep.pickup(nearestTarget) == 0) {
        //             creep.say('🎁🍓');
        //         }
        //         // else {
        //         //     creep.moveTo(nearestTarget, { visualizePathStyle: { stroke: '#ffaa00' } });
        //         //     creep.say('🎁???');
        //         //     creep.pickup(nearestTarget)
        //         //     // console.log(`^^^^^^^^^^^^^^^^^    ${creep} can't understand pickupResult ${pickupResult}, nearestTarget ${nearestTarget}`)
        //         // }


        //     } else {

        //         if (harvestResult == ERR_NOT_IN_RANGE || harvestResult == -7) {
        //             // move towards the source
        //             creep.say('⚡🔄');
        //             creep.moveTo(targetSource, { visualizePathStyle: { stroke: '#ffaa00' }, ignoreCreeps: true });
        //         } else {
        //             creep.harvest(targetSource)
        //             if (harvestResult == 0) {
        //                 creep.say('⚡✅');
        //             } else {
        //                 creep.say('⚡???');
        //             }
        //         }
        //     }
        // }
    }
}

