var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
// var idleCreep = require('idleCreep')
// let roleClaimer = require('role.claimer')
// let p = require('pathfinder')
// Room #1: Game.rooms['W14N43']

let partsCost = {
    WORK: 100,
    MOVE: 50,
    CARRY: 50,
    ATTACK: 80,
    RANGED_ATTACK: 150,
    HEAL: 250,
    CLAIM: 600,
    TOUGH: 10
}
let creepGroups = {
    'harvester': {
        has: 0,
        wants: 5,
        level: 1,
        composition: [WORK, CARRY, CARRY, MOVE, MOVE],
        cost: 0
    },
    'harvester': {
        has: 0,
        wants: 4,
        level: 2,
        composition: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        cost: 0
    },
    'builder': {
        has: 0,
        wants: 6,
        level: 1,
        composition: [WORK, CARRY, CARRY, MOVE, MOVE],
        cost: 0
    },
    'builder': {
        has: 0,
        wants: 7,
        level: 2,
        composition: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
        cost: 0
    },
    'upgrader': {
        has: 0,
        wants: 6,
        level: 1,
        composition: [WORK, CARRY, CARRY, MOVE, MOVE],
        cost: 0
    },
    'upgrader': {
        has: 0,
        wants: 1,
        level: 2,
        composition: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        cost: 0
    },
    'claimer': {
        has: 0,
        wants: 0,
        level: 3,
        composition: [CLAIM, MOVE],
        cost: 0
    },
}

// figure out how to automatically sum the energy cost of building any given creep composition
for (const groupName in creepGroups) {
    let creepCost = 0
    for (let part in creepGroups[groupName].composition) {
        let c = creepGroups[groupName].composition[part]
        let comp = JSON.stringify(c).toUpperCase()
        let component = comp.replace(/['"]+/g, '')
        let val = partsCost[component]
        creepCost += val
    }
    console.log(`this creep ${groupName} total cost ${creepCost}`)
    creepGroups[groupName].cost = creepCost
}
// using @qnz suggestion
const getBodyCost = (body) => _.sum(body, (p) => BODYPART_COST[p]);

let x = getBodyCost(creepGroups['harvester'].composition)
console.log(`returning getBodyCost harvester: ${x}`)

// Uncomment to see the current number of my creeps in this game
// let creepsTally = 0
// for (let i in Game.creeps) {
//     ++creepsTally
// }
// console.log(`--- # of Creeps: ${creepsTally}`)

module.exports.loop = function () {

    // let reserve = Game.creeps['claimer-level-3-26194173'].reserveController(Game.creeps['claimer-level-3-26194173'].room.controller)
    // console.log(`return value from reserve room controller: `, reserve)
    let spawn = Game.spawns['Spawn1']
    let homeRoom = spawn.room
    let rc = homeRoom.controller
    let rcl = rc.level
    let energy = spawn.room.energyAvailable;
    let energyCapacity = spawn.room.energyCapacityAvailable;
    // let unusedEnergyCapacity = energyCapacity - energy
    // let RCLprogressRemains = homeRoom.controller.progressTotal - homeRoom.controller.progress
    // console.log(`tick: controller level ${rcl}, ${RCLprogressRemains} remains`)

    // Uncomment this to see current and max energy available in spawn and structures
    // console.log(`***ENERGY TALLY*** available now ${energy} and maximum capacity ${energyCapacity}, leaving ${unusedCapacity} unfilled`)

    creepGroups['harvester'].has = _.sum(Game.creeps, { memory: { role: 'harvester' } })
    creepGroups['upgrader'].has = _.sum(Game.creeps, { memory: { role: 'upgrader' } })
    creepGroups['builder'].has = _.sum(Game.creeps, { memory: { role: 'builder' } })
    // creepGroups['claimer'].has = _.sum(Game.creeps, { memory: { role: 'claimer' } })
    let targets = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
    for (var name in Game.creeps) {
        let creep = Game.creeps[name];


        // console.log(`main loop, all game creeps positions: ${creep} | `, creep.pos)
        // console.log(`main loop, creep names name: ${name}, creep: ${creep}`)
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);

            // if (creepGroups['harvester'].has < 3) {
            // roleUpgrader.run(creep);
            // }
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
            // roleHarvester.run(creep);
            // if (targets.length) {
            //     roleBuilder.run(creep);
            // } else {
            //     // otherwise, switch to upgrading RCL
            //     roleUpgrader.run(creep);
            // }
        }
        if (creep.memory.role == 'builder') {
            if (targets.length) {
                roleBuilder.run(creep);
            } else {
                // otherwise, switch to upgrading RCL
                roleUpgrader.run(creep);
            }
        }
        // if (creep.memory.role == 'claimer') {
        //     console.log(`we have a claimer`)
        //     roleClaimer(name, 'W14N42')
        // }
    }

    for (const groupName in creepGroups) {
        if (creepGroups[groupName].has < creepGroups[groupName].wants) {
            console.log(`Time to spawn a ${groupName}, tally is ${creepGroups[groupName].has}`)
            let comp = creepGroups[groupName].composition
            let name = `${groupName}-level-${rcl}-${Game.time}`
            let mem = { memory: { role: groupName, level: rcl, working: false } }
            let x = Game.spawns['Spawn1'].spawnCreep(comp, name, mem)
            // console.log('spawn result: ', x)
        } else {
            // console.log(`${groupName} has full inventory of creeps currently`)
            // if (groupName == 'harvester') {
            //     console.log(`My name is ${creep} harvester and I have full capacity`)
            //     for (var name in Game.creeps) {
            //         var creep = Game.creeps[name];
            //         roleUpgrader.run(creep);
            //     }
            // }
        }
    }

    // console.log(`Tally creeps values: harvester ${creepGroups.harvester.has}, builders ${creepGroups.builder.has}, upgraders ${creepGroups.upgrader.has}, claimers ${creepGroups.claimer.has}`)
}