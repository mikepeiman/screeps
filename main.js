var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
// let p = require('pathfinder')
// let WORK = 'WORK', CARRY = 'CARRY', MOVE = 'MOVE'
let creepGroups = {
    'harvester': {
        has: 0,
        wants: 4,
        composition: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]
    },
    'builder': {
        has: 0,
        wants: 0,
        composition: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]
    },
    'upgrader': {
        has: 0,
        wants: 4,
        composition: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]
    },
}

// Uncomment to see the current number of my creeps in this game
// let creepsTally = 0
// for (let i in Game.creeps) {
//     ++creepsTally
// }
// console.log(`--- # of Creeps: ${creepsTally}`)

module.exports.loop = function () {
    console.log('tick')
    let home = Game.spawns['Spawn1']

    // Uncomment this block to see current and max energy available in spawn and structures
    // for (let i in Game.spawns) {
    //     let spawn = Game.spawns[i];
    //     var energy = spawn.room.energyAvailable;
    //     var energycap = spawn.room.energyCapacityAvailable;
    //     console.log(`***ENERGY TALLY*** available now ${energy} and maximum capacity ${energycap}`)
    // }

    creepGroups['harvester'].has = _.sum(Game.creeps, { memory: { role: 'harvester' } })
    creepGroups['upgrader'].has = _.sum(Game.creeps, { memory: { role: 'upgrader' } })
    creepGroups['builder'].has = _.sum(Game.creeps, { memory: { role: 'builder' } })

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            let working = roleHarvester.run(creep);
            console.log(`harvester creep ${creep} working? ${working}`)
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }

    for (const groupName in creepGroups) {
        if (creepGroups[groupName].has < creepGroups[groupName].wants) {
            console.log(`Time to spawn a ${groupName}, tally is ${creepGroups[groupName].has}`)
            let comp = creepGroups[groupName].composition
            let name = groupName + Game.time
            let mem = { memory: { role: groupName } }
            let x = Game.spawns['Spawn1'].spawnCreep(comp, name, mem)
            console.log('spawn as var: ', x)
        }
    }

    console.log(`Tally creeps values: harvester ${creepGroups.harvester.has}, builders ${creepGroups.builder.has}, upgraders ${creepGroups.upgrader.has}`)
}