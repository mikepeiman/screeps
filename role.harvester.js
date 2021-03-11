// let energySources = require('energySources')
module.exports = {
    // a function to run the logic for this role
    run: function (creep) {
        // console.log('CPU used enter harvester.run(): ', Game.cpu.getUsed())
        let takeEnergySources = creep.room.find(FIND_SOURCES_ACTIVE)
        let takeEnergyTombstones = creep.room.find(FIND_TOMBSTONES, {
            filter: tombstone => tombstone.store.energy > 0
        })
        // console.log("🚀 ~ file: role.harvester.js ~ line 10 ~ takeEnergyTombstones", takeEnergyTombstones)
        let takeEnergyDroppedResources = creep.room.find(FIND_DROPPED_RESOURCES, {
            filter: resource => resource.resourceType === RESOURCE_ENERGY
        })
        // console.log("🚀 ~ file: role.harvester.js ~ line 14 ~ takeEnergyDroppedResources", takeEnergyDroppedResources)
        let takeEnergyRuins = creep.room.find(FIND_RUINS, {
            filter: ruin => ruin.store.energy > 0
        })
        // console.log("🚀 ~ file: role.harvester.js ~ line 17 ~ takeEnergyRuins", takeEnergyRuins)
        let takeEnergyTargets = [...takeEnergyTombstones, ...takeEnergyDroppedResources, ...takeEnergyRuins]
        // takeEnergyTargets = creep.pos.findClosestByPath(takeEnergyTargets)
        // console.log(`takeEnergyTargets: `, takeEnergyTargets)

        // if creep is bringing energy to a structure but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
            creep.memory.currentTask = '⚡ harvest'
            creep.say('⚡🚛');
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
            creep.memory.currentTask = '🚗 move to transfer'
            creep.say('🚗 move to transfer');
        }

        // if creep is supposed to transfer energy to a structure
        if (creep.memory.working == true) {
            // find closest spawn, extension or tower which is not full
            let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                    || s.structureType == STRUCTURE_EXTENSION
                    || s.structureType == STRUCTURE_TOWER)
                    && s.energy < s.energyCapacity
            });

            // if we found one
            // console.log(`role.harvester.js: ${creep}::ROLE::${creep.memory.role}::TASK::${creep.memory.task} Found a structure to receive energy: ${structure}`, structure)
            if (structure != undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.memory.currentTask = '⚡🔄 transfer'
                    creep.say('⚡🔄');
                    // move towards it
                    creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 25 });
                }
            }
        }
        // if creep is supposed to harvest energy
        else {
            // find closest source, preference for dropped resources

            for (let i in takeEnergyTargets) {
                // console.log("🚀 ~ file: role.harvester.js ~ line 64 ~ takeEnergyTargets[i]", takeEnergyTargets[i])
            }

            // console.log("🚀 ~ file: role.harvester.js ~ line 61 ~ nearestTarget", nearestTarget.id)
            // let obj = Game.getObjectById(nearestTarget.id)
            // console.log("🚀 ~ file: role.harvester.js ~ line 63 ~ obj", obj)

            let nearestTarget = creep.pos.findClosestByPath(takeEnergyTargets);
            if (nearestTarget) {
                // console.log("🚀 ~ file: role.harvester.js ~ line 75 ~ takeEnergyTargets", takeEnergyTargets)
                // console.log(`nearestTarget for energy pickup: `, nearestTarget)
                creep.memory.currentTask = '⚡ harvest 🎁 pickup'
                if (creep.withdraw(nearestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.say('🎁 pickup');
                    creep.moveTo(nearestTarget, { visualizePathStyle: { stroke: '#ffaa00' } });
                }/* else {
                    // console.log(`${creep} pickupResult ${pickupResult}`)
                    if (creep.pickup(nearestTarget) == 0) {
                        creep.say('🎁🍓');
                    } else {
                        creep.moveTo(nearestTarget, { visualizePathStyle: { stroke: '#ffaa00' } });
                        creep.say('🎁???');
                        creep.pickup(nearestTarget)
                        // console.log(`^^^^^^^^^^^^^^^^^    ${creep} can't understand pickupResult ${pickupResult}, nearestTarget ${nearestTarget}`)
                    }
*/

            } else {
                let nearestSource = creep.pos.findClosestByPath(takeEnergySources);
                let harvestResult = creep.harvest(nearestSource)
                if (harvestResult == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    // creep.say('🔄 harvest');
                    creep.moveTo(nearestSource, { visualizePathStyle: { stroke: '#ffaa00' } });
                } else {
                    // console.log(`${creep} harvestResult ${harvestResult}`)
                    if (harvestResult == 0) {
                        creep.say('⚡✅');
                    } else {
                        creep.say('⚡???');
                    }
                }
            }
        }
    }
}

