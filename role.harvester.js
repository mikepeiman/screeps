// let roleUpgrader = require('role.upgrader');
module.exports = {
    run: function (creep) {
        creep.memory.currentRole = 'harvester'

        // Identify energy sources - prioritize untapped source
        let sources = creep.room.find(FIND_SOURCES_ACTIVE)
        let targetSource
        for (let i in sources) {
            if (sources[i].energy == sources[i].energyCapacity) {
                targetSource = sources[i]
            } else {
                targetSource = creep.pos.findClosestByPath(sources);
            }
        }

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
        if (towers.length && Game.creeps.length > 4) {
            structure = creep.pos.findClosestByPath(towers)
        } else {
            structure = creep.pos.findClosestByPath(spawnAndExtensions)
        }

        function harvest(resource) {
            let x = creep.harvest(resource, RESOURCE_ENERGY)
            if (x == ERR_NOT_IN_RANGE) {
                console.log("🚀 ~ file: role.harvester.js ~ line 36 ~ harvest ~ resource", resource)
                creep.memory.currentTask = '⚡ harvest'
                creep.say('⚡🥾');
                creep.moveTo(resource, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 25 });
            } else {
                x
            }
        }

        function transfer(toTarget) {
            if (creep.transfer(toTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.memory.currentTask = '⚡ transfer'
                creep.say('⚡🥾');
                creep.moveTo(toTarget, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 25 });
            }
            if (creep.transfer(toTarget, RESOURCE_ENERGY) == 0) {
                creep.say('⚡🔄🔌');
            }
        }

        // core logic: if creep full, transfer. If not full, harvest
        let creepFull = creep.carry.energy == creep.carryCapacity
        if (creepFull) {
            creep.memory.energyFull = true
            creep.memory.transferring == true
            creep.memory.harvesting = false
            creep.memory.currentTask = '⚡🔄'
        } else if (creep.carry.energy > 0 && creep.memory.transferring) {
            console.log(`${creep} I should be transfering still but not full`)
            creep.memory.energyFull = false
        } else if (creep.carry.energy == 0) {
            creep.memory.energyFull = false
            creep.memory.harvesting = true
            creep.memory.transferring == false
        }

        if(creep.memory.harvesting) {
            creep.memory.currentTask = '➕⚡'
            creep.say('➕⚡');
            harvest(targetSource) 
        } else {
            creep.memory.currentTask = '⚡🔄'
            creep.say('⚡🔄?');
            transfer(structure)
        }
    }
}

