var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
// let p = require('pathfinder')
let creepGroups = {
    'harvesters': 0,
    'builders': 0,
    'upgraders': 0,
    'explorers': 0,
    'warriors': 0
}

let home = Game.spawns['Spawn1']
let roles = ['harvester', 'upgrader', 'builder', 'explorer', 'warrior']
let creepsTally = 0

// for (let i in Game.creeps) {
//     ++creepsTally
// }
// To see the current number of my creeps in this game
// console.log(`--- # of Creeps: ${creepsTally}`)


module.exports.loop = function () {


    // Uncomment this block to see current and max energy available in spawn and structures
    // for (let i in Game.spawns) {
    //     let spawn = Game.spawns[i];
    //     var energy = spawn.room.energyAvailable;
    //     var energycap = spawn.room.energyCapacityAvailable;
    //     console.log(`***ENERGY TALLY*** available now ${energy} and maximum capacity ${energycap}`)
    // }

    creepGroups['harvesters'] = _.sum(Game.creeps, { memory: { role: 'harvester' } })
    creepGroups['upgraders'] = _.sum(Game.creeps, { memory: { role: 'upgrader' } })
    creepGroups['builders'] = _.sum(Game.creeps, { memory: { role: 'builder' } })
    // creepGroups['explorers'] = _.sum(Game.creeps, { memory: { role: 'explorer' } })
    // creepGroups['warriors'] = _.sum(Game.creeps, { memory: { role: 'warrior' } })

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            // pathfinder.run(creep)
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


    if (creepGroups.builders < 4) {
        console.log(`Time to spawn a builder, tally is ${creepGroups.builders}`)
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], 'builder-' + Game.time, { memory: { role: 'builder' } })
    }

    if (creepGroups.harvesters < 1) {
        console.log(`Time to spawn a harvester, tally is ${creepGroups.harvesters}`)
        home.spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], 'harvester-' + Game.time, { memory: { role: 'harvester' } })
        console.log(`Tried spawning harvester [WORK, WORK, CARRY, MOVE, MOVE], error: ${error}`)
    }
    if (creepGroups.upgraders < 1) {
        console.log(`Time to spawn an upgrader, tally is ${creepGroups.upgraders}`)
        let x =home.spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], 'upgrader-' + Game.time, { memory: { role: 'upgrader' } })
        console.log('Checking return value of spawn attempt: ', x)
    }
    console.log(`Tally creeps values: harvester ${creepGroups.harvesters}, builders ${creepGroups.builders}, upgraders ${creepGroups.upgraders}, explorers ${creepGroups.explorers}`)
}