// let energySources = require('energySources')
module.exports = {
    // a function to run the logic for this role
    run: function (creep) {
        creep.memory.currentTask = 'harvest'

        let takeEnergySources = creep.room.find(FIND_SOURCES_ACTIVE)
        // let takeEnergyTombstones = creep.room.find(FIND_TOMBSTONES, {
        //     filter: tombstone => tombstone.store.energy > 0
        // })
        // let takeEnergyDroppedResources = creep.room.find(FIND_DROPPED_RESOURCES, {
        //     filter: resource => resource.resourceType === RESOURCE_ENERGY
        // })
        // let takeEnergyRuins = creep.room.find(FIND_RUINS, {
        //     filter: ruin => ruin.store.energy > 0
        // })
        // const takeEnergyTargets = [...takeEnergyTombstones, ...takeEnergyDroppedResources, ...takeEnergyRuins]
        // console.log(`takeEnergyTargets: `, takeEnergyTargets)

        // if creep is bringing energy to a structure but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
            // console.log(`harvester: creep ${creep} now stopped working, need to gather energy`)
            // console.log(`creep.memory.working: ${creep.memory.working}`)
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
            // console.log(`harvester: creep ${creep} working, full of energy`)
            // console.log(`creep.memory.working: ${creep.memory.working}`)
        }

        // if creep is supposed to transfer energy to a structure
        if (creep.memory.working == true) {
            // console.log(`role.harvester.js: creep is working`, creep)
            // find closest spawn, extension or tower which is not full
            var structure = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                    || s.structureType == STRUCTURE_EXTENSION
                    || s.structureType == STRUCTURE_TOWER)
                    && s.energy < s.energyCapacity
            });

            // if we found one
            // console.log(`role.harvester.js: Found a structure to receive energy: ${structure}`, structure)
            if (structure != undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // creep.memory.working = false

            // attempting to cache target
            //     let source, target
            //     if (creep.memory.source) {
            //         console.log(creep, '      ---     if(creep.memory.source)')
            //         target = Game.getObjectById[creep.memory.source.id]
            //     }
            //     if (!target) {
            //         console.log(creep, '      ---     if(!target) {  delete creep.memory.source  }')
            //         delete creep.memory.source
            //         target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            //         creep.memory.source = target
            //     }
            //     if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
            //         // move towards the source
            //         creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
            //     }
            // }


            // creep.memory.working = false
            // console.log(`harvester: creep ${creep} NOT working, gather energy`)
            // console.log(`creep.memory.working: ${creep.memory.working}`)
            // find closest source
            // let source = creep.pos.findClosestByRange(takeEnergyTargets);
            let target = creep.pos.findClosestByRange(takeEnergySources);
            // let target = Game.getObjectById(source.id)
            if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
            }

            // if (source) {
            //     let target = Game.getObjectById(source.id)
            //     console.log(`********** ${creep}  ******** What are my energy sources? `, source, target.pos)
            //     console.log(`source: ${source.id}`)

            //     if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //         // move towards the source
            //         creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
            //     }
            // } else {
            //     let target = creep.pos.findClosestByRange(takeEnergySources);
            //     // let target = Game.getObjectById(source.id)
            //     if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
            //         // move towards the source
            //         creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
            //     }
            // }

            // if (!takeEnergyTargets.length) {
            //     let source = creep.pos.findClosestByRange(takeEnergySources);
            // }
        }
    }
}

