var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

let creepTally = {
    'harvesters': 0,
    'builders': 0,
    'upgraders': 0,
    'explorers': 0
}


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

    creepTally['harvesters'] = _.filter(Game.creeps, {memory: {role: 'harvester'}})

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

    console.log(`Tally creeps values: harvester ${creepTally.harvesters.length}, builders ${creepTally.builders}, upgraders ${creepTally.upgraders}, explorers ${creepTally.explorers}`)

    if (creepTally.harvesters.length < 2) {
        console.log(`Time to spawn a Harvester`)
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'harvester-' + Game.time, {memory: {role: 'harvester'}})
    }


}