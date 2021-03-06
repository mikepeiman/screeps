var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
// let p = require('pathfinder')
let creepTally = {
    'harvesters': 0,
    'builders': 0,
    'upgraders': 0,
    'explorers': 0,
    'warriors': 0
}

let home = Game.spawns['Spawn1']
let roles = ['harvester', 'upgrader', 'builder', 'explorer', 'warrior']

module.exports.loop = function () {

    creepTally['harvesters'] = _.filter(Game.creeps, {memory: {role: 'harvester'}})
    creepTally['upgraders'] = _.filter(Game.creeps, {memory: {role: 'upgrader'}})
    creepTally['builders'] = _.filter(Game.creeps, {memory: {role: 'builder'}})
    creepTally['explorers'] = _.filter(Game.creeps, {memory: {role: 'explorer'}})
    creepTally['warriors'] = _.filter(Game.creeps, {memory: {role: 'warrior'}})

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            // creepTally.harvesters++
            roleHarvester.run(creep);
            // pathfinder.run(creep)

        }
        if (creep.memory.role == 'upgrader') {
            // creepTally.upgraders++
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            // creepTally.builders++
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'explorer') {
            // creepTally.explorers++
            roleExplorer.run(creep);
        }
    }

    console.log(`Tally creeps values: harvester ${creepTally.harvesters.length}, builders ${creepTally.builders.length}, upgraders ${creepTally.upgraders.length}, explorers ${creepTally.explorers.length}`)

    if (creepTally.harvesters.length < 6) {
        // console.log(`Time to spawn a harvester, tally is ${creepTally.harvesters.length}`)
        home.spawnCreep([WORK, CARRY, MOVE], 'harvester-' + Game.time, { memory: { role: 'harvester' } })
    }
    if (creepTally.builders.length < 6) {
        // console.log(`Time to spawn a builder, tally is ${creepTally.builders.length}`)
        home.spawnCreep([WORK, CARRY, MOVE], 'builder-' + Game.time, { memory: { role: 'builder' } })
    }
    if (creepTally.upgraders.length < 4) {
        // console.log(`Time to spawn an upgrader`)
        home.spawnCreep([WORK, CARRY, MOVE], 'upgrader-' + Game.time, { memory: { role: 'upgrader' } })
    }




}