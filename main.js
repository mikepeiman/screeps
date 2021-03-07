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

for (let i in Game.creeps) {
    ++creepsTally
}


module.exports.loop = function () {

    creepGroups['harvesters'] = _.sum(Game.creeps, { memory: { role: 'harvester' } })
    creepGroups['upgraders'] = _.sum(Game.creeps, { memory: { role: 'upgrader' } })
    creepGroups['builders'] = _.sum(Game.creeps, { memory: { role: 'builder' } })
    // creepGroups['explorers'] = _.sum(Game.creeps, { memory: { role: 'explorer' } })
    // creepGroups['warriors'] = _.sum(Game.creeps, { memory: { role: 'warrior' } })

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            // creepGroups.harvesters++
            roleHarvester.run(creep);
            // pathfinder.run(creep)
        }
        if (creep.memory.role == 'upgrader') {
            // creepGroups.upgraders++
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            // creepGroups.builders++
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'explorer') {
            // creepGroups.explorers++
            roleExplorer.run(creep);
        }
    }

    // console.log(`--- # of Creeps: ${creepsTally}`)


    // if (creepGroups.builders < 2) {
    //     console.log(`Time to spawn a builder, tally is ${creepGroups.builders}`)
    //     home.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], 'builder-' + Game.time, { memory: { role: 'builder' } })
    // }

    if (creepGroups.harvesters < 4) {
        console.log(`Time to spawn a harvester, tally is ${creepGroups.harvesters}`)
        try {
            home.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], 'harvester-' + Game.time, { memory: { role: 'harvester' } })
        } catch (error) {
            console.log(`Tried spawning harvester [WORK, CARRY, CARRY, MOVE, MOVE], error: ${error}`)
        }

    } else if (creepGroups.upgraders < 6) {
        console.log(`Time to spawn an upgrader, tally is ${creepGroups.upgraders}`)
        home.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], 'upgrader-' + Game.time, { memory: { role: 'upgrader' } })
    }
    console.log(`Tally creeps values: harvester ${creepGroups.harvesters}, builders ${creepGroups.builders}, upgraders ${creepGroups.upgraders}, explorers ${creepGroups.explorers}`)
}