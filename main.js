let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleWarrior = require('role.warrior');
let gatherEnergy = require('task.gather.energy')
let creepSpecs = require('creep.specs')
// const towerProto = require('prototype.tower.js')
const Traveler = require('traveler')
const roleScout = require('role.scout');
const roleRepairer = require('./role.repairer');
// let idleCreep = require('idleCreep')
// let roleClaimer = require('role.claimer')
// let p = require('pathfinder')
// Room #1: Game.rooms['W14N43']
let creepsFullPopulation = false

// explore Traveler.js
// let pos = Game.creeps['harvester-sameroom-level-3-26228040'].pos

// let sk = Game.getObjectById('5bbcac869099fc012e6359ec')
// let sks = Game.getObjectById('5bbcac869099fc012e6359eb')
// let skbot = Game.getObjectById('6047ebbafc4bbeed6eb13ac1')
// let aBuilder = Game.getObjectById('6047e312dc2f33540f6f449e')
// // let tp = pos.FindPathTo(Game.getObjectById['6047d7d7f201b67fa1efd0e8'])
//  console.log(`:::---:::   explore Traveler.js: source keeper:::   ${sk}   ${JSON.stringify(sk)}`)
//  console.log(`:::---:::   explore Traveler.js: SK source keeper:::   ${sks}   ${JSON.stringify(sks)}`)
//  console.log(`:::---:::   explore Traveler.js: SK fighter :::   ${skbot}   ${JSON.stringify(skbot)}`)
//  console.log(`:::---:::   explore Traveler.js: my builder:::   ${aBuilder}   ${JSON.stringify(aBuilder)}`)
//  console.log(`:::---:::   explore Traveler.js: source keeper ${JSON.stringify(tp)}`)


let spawn = Game.spawns['Spawn1']
let home = spawn.room
let rc = home.controller
let rcl = rc.level

let creepLevelGroups = creepSpecs(rcl)
let creepGroups = creepLevelGroups[rcl - 1]
let warrior = creepGroups['warrior'].cost
console.log("🚀 ~ file: main.js ~ line 40 ~ warrior", warrior)
for (let creepType in creepGroups) {
    let c = creepGroups[creepType]
    console.log(`${creepType} costs: ${c.cost}`)
}

// const getBodyCost = (body) => _.sum(body, (p) => BODYPART_COST[p]);
// for (let creepType in creepGroups) {
//     let c = creepGroups[creepType]
//     c.cost = getBodyCost(c.composition)
//     // console.log(`Checking body composition ${creepType} --- ${c.composition}`)
//     // console.log(`Final check calculating cost of each creep ${creepType}, cost ${creepGroups[creepType].cost}`)
// }

let everyFiveCounter = 5

module.exports.loop = function () {
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    spawn = Game.spawns['Spawn1']
    home = spawn.room
    rc = home.controller
    rcl = rc.level
    let energy = spawn.room.energyAvailable;
    let energyCapacity = spawn.room.energyCapacityAvailable;
    let unusedEnergyCapacity = energyCapacity - energy
    let RCLprogressRemains = home.controller.progressTotal - home.controller.progress
    let takeEnergySources = home.find(FIND_SOURCES_ACTIVE)
    let takeEnergyTombstones = home.find(FIND_TOMBSTONES, {
        filter: tombstone => tombstone.store.energy > 0
    })
    let takeEnergyDroppedResources = home.find(FIND_DROPPED_RESOURCES, {
        filter: resource => resource.resourceType === RESOURCE_ENERGY
    })
    let takeEnergyRuins = home.find(FIND_RUINS, {
        filter: ruin => ruin.store.energy > 0
    })
    const takeEnergyTargets = [...takeEnergyTombstones, ...takeEnergyDroppedResources, ...takeEnergyRuins]


    // console.log(`tick: controller level ${rcl}, ${RCLprogressRemains} remains`)
    // Uncomment this to see current and max energy available in spawn and structures
    // console.log(`***ENERGY TALLY*** available now ${energy} and maximum capacity ${energyCapacity}, leaving ${unusedEnergyCapacity} unfilled`)


    if (everyFiveCounter == 5) {
        for (let creepType in creepGroups) {
            creepGroups[creepType].has = _.sum(Game.creeps, { memory: { role: creepType } })
            // console.log(`Tally creeps values: ${creepType} ${creepGroups[creepType].has}`)
        }
    }

    let checkRepairTargets = true
    let repairTarget
    let targets = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        if (checkRepairTargets) {
            repairTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            });
            checkRepairTargets = false
        }

        if (creep.memory.role == 'harvester') {

            // harvester-level-4-26252887
            // 6048f7e3d624363c203c22f9
            // Game.creeps['harvester-level-4-26253336'].pickup('6048f7e3d624363c203c22f9')

            roleHarvester.run(creep);
            if (unusedEnergyCapacity < 1) {
                if (targets.length) {
                    roleBuilder.run(creep);
                } else {
                    roleUpgrader.run(creep);
                }
            } else {
                // roleHarvester.run(creep);
            }
        }
        if (creep.memory.role == 'upgrader') {
            if (targets.length) {
                roleBuilder.run(creep);
                // } else if (repairTarget != undefined) {
                //     creep.memory.repairing = false
                //     roleRepairer.run(creep)
            } else {
                roleUpgrader.run(creep);
            }
        }
        if (creep.memory.role == 'builder') {
            if (creepGroups['harvester'].has < 2) {
                roleHarvester.run(creep)
            }
            else {
                // if (repairTarget != undefined) {
                //     roleRepairer.run(creep)
                // } else 
                if (targets.length) {
                    roleBuilder.run(creep);
                } else {
                    roleUpgrader.run(creep);
                }
            }
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep)
        }
        if (creep.memory.role == 'scout') {
            // creep.memory.target = Game.rooms['W6N54']
            // console.log(`checking scout creeps, current room name ${creep.room.name} and target ${creep.room.target}`)
            roleScout.run(creep)
        }
        if (creep.memory.role == 'warrior-1') {
            // nearest SK thug: 9,45,W6N54
            // let target = new RoomPosition(12,1,'W6N53')
            let target = new RoomPosition(9, 45, 'W6N54')
            roleWarrior.run(creep, target);
        }
        // if (creep.memory.role == 'claimer') {
        //     console.log(`we have a claimer`)
        //     roleClaimer(name, 'W14N42')
        // }
    }

    for (let creepType in creepGroups) {
        let c = creepGroups[creepType]
        if (c.has < c.wants) {
            // creepsFullPopulation = false
            if (!creepGroups['harvester'].has < creepGroups['harvester'].wants) {
                console.log(`Time to spawn a ${creepType}, tally is ${c.has}. Energy cost will be ${c.cost}`)
                console.log(`***ENERGY TALLY*** available now ${energy} and maximum capacity ${energyCapacity}, leaving ${unusedEnergyCapacity} unfilled`)
                let comp = c.composition
                let name = `${creepType}-level-${rcl}-${Game.time}`
                let mem = { memory: { role: creepType, home: home, level: rcl, working: false } }
                let x = Game.spawns['Spawn1'].spawnCreep(comp, name, mem)
                if (x == 0) {
                    console.log(`Spawning a ${c}`)
                } else {
                    console.log(`Error in spawning: ${x}`)
                }
            } else {
                let comp = creepGroups['harvester'].composition
                let name = `${creepType}-level-${rcl}-${Game.time}`
                let mem = { memory: { role: 'harvester', home: home, level: rcl, working: false } }
                let x = Game.spawns['Spawn1'].spawnCreep(comp, name, mem)
            }
        }
    }


    if (everyFiveCounter == 5) {
        console.log('CPU used end main loop (checking once every five ticks): ', Game.cpu.getUsed())

    }
    everyFiveCounter--
    if (everyFiveCounter == 0) { everyFiveCounter = 5 }

}