// let roleUpgrader = require('role.upgrader');
module.exports = {
    run: function (creep) {
        creep.memory.currentRole = 'harvester'
        let moveOpts = { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 3 }

        // Identify energy sources - prioritize untapped source
        let sources = creep.room.find(FIND_SOURCES_ACTIVE)
        let targetSource = creep.pos.findClosestByPath(sources)
        // for (let i in sources) {
        //     if (sources[i].energy == sources[i].energyCapacity) {
        //         targetSource = sources[i]
        //     } else {
        //         targetSource = creep.pos.findClosestByPath(sources);
        //     }
        // }

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
  
        if (towers.length) {
            structure = creep.pos.findClosestByPath(towers)
        } else {
            structure = creep.pos.findClosestByPath(spawnAndExtensions)
        }

        function harvest(resource) {
            let x = creep.harvest(resource, RESOURCE_ENERGY)
            if (x == ERR_NOT_IN_RANGE) {
                creep.memory.currentTask = '⚡ harvest'
                // // creep.say('⚡🥾');
                creep.moveTo(resource, moveOpts);
            } else {
                x
            }
        }

        function transfer(toTarget) {
            if (creep.transfer(toTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.memory.currentTask = '⚡ transfer'
                // // creep.say('⚡🥾');
                creep.moveTo(toTarget, moveOpts);
            }
            if (creep.transfer(toTarget, RESOURCE_ENERGY) == 0) {
                // // creep.say('⚡🔄🔌');
            }
        }

        // core logic: if creep full, transfer. If not full, harvest
        let creepFull = creep.carry.energy == creep.carryCapacity
        if (creepFull) {
            creep.memory.energyFull = true
            creep.memory.transferring == true
            creep.memory.harvesting = false
            creep.memory.currentTask = '⚡ find transfer target'
        } else if (creep.carry.energy > 0 && creep.memory.transferring) {
            creep.memory.energyFull = false
        } else if (creep.carry.energy == 0) {
            creep.memory.energyFull = false
            creep.memory.harvesting = true
            creep.memory.transferring == false
        }

        if(creep.memory.harvesting) {
            creep.memory.currentTask = '➕⚡ gather energy'
            // // creep.say('➕⚡');
            harvest(targetSource) 
        } else {
            creep.memory.currentTask = '⚡ transfer energy'
            // // creep.say('⚡🔄');
            transfer(structure)
        }
    }
}

