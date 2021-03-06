var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

let creepTally = {
    'harvesters': 0,
    'builders': 0,
    'upgraders': 0,
    'explorers': 0,
    'warriors': 0
}
let creepsList = {
    'harvesters': 0,
    'builders': 0,
    'upgraders': 0,
    'explorers': 0,
    'warriors': 0
}

let home = Game.spawns['Spawn1']
let roles = ['harvester', 'upgrader', 'builder', 'explorer', 'warrior']

module.exports.loop = function () {


    // for(var name in Game.creeps) {
    //     console.log('The creep names are: ' + name)
    // }

    // var tower = Game.getObjectById('185239c5665481ddb49c5019')
    // if(tower) {
    //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => structure.hits < structure.hitsMax
    //     })
    //     if(closestDamagedStructure){
    //         tower.repair(closestDamagedStructure)
    //     }


    //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
    //     if(closestHostile){
    //         tower.attack(closestHostile)
    //     }
    // }

    // consider a loop to tally number of each type of creep, to manage respawning

    // for (idx in roles) {
    //     let creepRole = creepTally[idx]
    //     console.log(`in roles loop, current idx is ${idx}, creepTally[${roles[idx]}] is ${creepTally[`${roles[idx]}`]}`)
    //     if (creepsList.creepRole.length) { console.log('in roles loop, creepTally value is ' + creepsList.creepRole.length) }
    //     console.log('in roles loop, creepTally value is 0')
    //     creepsList.creepRole = _.filter(Game.creeps, { memory: { role: creepRole } })
    // }

    // console.log(_.filter(Game.creeps, {memory: {role: 'upgrader'}}))


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

    if (creepTally.builders.length < 2) {
        console.log(`Time to spawn a builder`)
        home.spawnCreep([WORK, CARRY, MOVE], 'builder-' + Game.time, { memory: { role: 'builder' } })
    }
    if (creepTally.harvesters.length < 2) {
        console.log(`Time to spawn a harvester`)
        home.spawnCreep([WORK, CARRY, MOVE], 'harvester-' + Game.time, { memory: { role: 'harvester' } })
    }
    if (creepTally.upgraders.length < 4) {
        console.log(`Time to spawn an upgrader`)
        home.spawnCreep([WORK, CARRY, MOVE], 'upgrader-' + Game.time, { memory: { role: 'upgrader' } })
    }




}