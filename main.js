var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
// let p = require('pathfinder')
let creepGroups = {
    'harvester': {
        has: 0,
        wants: 5,
        composition: "WORK, WORK, CARRY, MOVE, MOVE"
    },
    'builder': {
        has: 0,
        wants: 3,
        composition: "WORK, WORK, CARRY, MOVE, MOVE"
    },
    'upgrader': {
        has: 0,
        wants: 1,
        composition: "WORK, WORK, CARRY, MOVE, MOVE"
    },

}


let roles = ['harvester', 'upgrader', 'builder', 'explorer', 'warrior']
let creepsTally = 0

// for (let i in Game.creeps) {
//     ++creepsTally
// }
// To see the current number of my creeps in this game
// console.log(`--- # of Creeps: ${creepsTally}`)


module.exports.loop = function () {
    let home = Game.spawns['Spawn1']

    // Uncomment this block to see current and max energy available in spawn and structures
    // for (let i in Game.spawns) {
    //     let spawn = Game.spawns[i];
    //     var energy = spawn.room.energyAvailable;
    //     var energycap = spawn.room.energyCapacityAvailable;
    //     console.log(`***ENERGY TALLY*** available now ${energy} and maximum capacity ${energycap}`)
    // }

    creepGroups['harvester'].has = _.sum(Game.creeps, { memory: { role: 'harvester' }})
    creepGroups['upgrader'].has = _.sum(Game.creeps, { memory: { role: 'upgrader' }})
    creepGroups['builder'].has = _.sum(Game.creeps, { memory: { role: 'builder' }})
    // creepGroups['explorers'] = _.sum(Game.creeps, { memory: { role: 'explorer' } })
    // creepGroups['warriors'] = _.sum(Game.creeps, { memory: { role: 'warrior' } })

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'explorer') {
            roleExplorer.run(creep);
        }
    }

    for(const groupName in creepGroups) {
        // console.log(`checking new creepGroup objects loop: groupName ${groupName} has ${creepGroups[groupName].has} and wants ${creepGroups[groupName].wants}`)
        if(creepGroups[groupName].has < creepGroups[groupName].wants){
            console.log(`Time to spawn a ${groupName}, tally is ${creepGroups[groupName].has}`)
            home.spawnCreep([`${groupName.composition}`, `${groupName}${Game.time}`, {memory: {role: `${groupName}`}}])
        }
    }

    // console.log(`Tally creeps values: harvester ${creepGroups.harvester.has}, builders ${creepGroups.builder.has}, upgraders ${creepGroups.upgrader.has}`)
}