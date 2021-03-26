let roleHarvester = require('role.harvester');
let roleSalvager = require('role.salvager');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleMiner = require('role.miner');
let roleWarrior = require('role.warrior');
let gatherEnergy = require('task.gather.energy')
let recycleCreep = require('creep.recycle')
let creepSpecs = require('creep.specs')
const Traveler = require('traveler')
const roleScout = require('role.scout');
const roleRepairer = require('role.repairer');
const renewCreep = require('renew.creep')
const renewCheck = require('renew.check')
// let idleCreep = require('idleCreep')
let roleClaimer = require('role.claimer')
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
let spawnPriority = "false"
let rc = home.controller
let rcl = rc.level
let creepLevelGroups = creepSpecs(rcl)
// !!!   IMPORTANT   !!!   MUST ensure there is creep spec data before leveling up RCL, otherwise no new creeps will be spawned.
let creepGroups = creepLevelGroups[rcl - 1].specs

// priorities for energy harvester creeps:  ["fillStorage", "fillRoomEnergy", "powerTowers", "upgradeController" ]
let energyHarvesterCreepsPriorities = ["fillStorage", "fillRoomEnergy", "powerTowers", "upgradeController"]
let emergencySpawn = false
let creepTaskPriority

// roleTower.run(home)
for (let creepType in creepGroups) {
    let c = creepGroups[creepType]
    console.log(`${creepType} costs: ${c.cost}`)
}
let everyHundredCounter = 100
let everyFiveCounter = 5
let renewCreepTimer = 0
require('prototype.tower')

module.exports.loop = function () {
    let towers = home.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
    for (let i in towers) {
        let tower = towers[i]
        tower.defend()
    }
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

    let hostiles = home.find(FIND_HOSTILE_CREEPS, {
        filter: (c) => c.owner.username != "cplive" && c.owner.username != "Brun1L" && c.owner.username != "mrmartinstreet"
    });


    let energy = spawn.room.energyAvailable;
    let energyCapacity = spawn.room.energyCapacityAvailable;
    let unusedEnergyCapacity = energyCapacity - energy
    let RCLprogressRemains = home.controller.progressTotal - home.controller.progress
    let takeEnergySources = home.find(FIND_SOURCES_ACTIVE)
    let takeEnergyTombstones = home.find(FIND_TOMBSTONES, {
        filter: tombstone => tombstone.store.energy > 0
    })
    let takeEnergyDroppedResources = home.find(FIND_DROPPED_RESOURCES)
    let takeEnergyRuins = home.find(FIND_RUINS, {
        filter: ruin => ruin.store.energy > 0
    })
    const takeEnergyTargets = [...takeEnergyTombstones, ...takeEnergyDroppedResources, ...takeEnergyRuins]
    let minerals = home.find(FIND_MINERALS)
    let mineralsAmount = minerals[0].mineralAmount
    let mineralRegen = minerals[0].ticksToRegeneration

    if (hostiles[0]) {
        creepTaskPriority = "powerTowers"
    } else {
        creepTaskPriority = "fillRoomEnergy"
    }
    // renewCreepTimer++
    // if (renewCreepTimer > 15) {
    //     for (let name in Game.creeps) {
    //         let creep = Game.creeps[name];
    //         console.log(`🚀 ~ file: main.js ~ line 85 ~ renewCreepTimer`, renewCreepTimer)
    //         renewCheck(creep, spawn)
    //     }
    //     renewCreepTimer = 0
    // }

    // console.log(`tick: controller level ${rcl}, ${RCLprogressRemains} remains`)
    // Uncomment this to see current and max energy available in spawn and structures
    // console.log(`***ENERGY TALLY*** available now ${energy} and maximum capacity ${energyCapacity}, leaving ${unusedEnergyCapacity} unfilled`)

    let tally = 0
    // if (everyFiveCounter == 5) {
    for (let creepType in creepGroups) {
        creepGroups[creepType].has = _.sum(Game.creeps, { memory: { role: creepType } })
        let hauler = creepGroups["hauler"]
        let salvager = creepGroups["salvager"]
        if (hauler.has < 1) {
            spawnPriority = "hauler"
        } else if (salvager.has < 1) {
            spawnPriority = "salvager"
        } else {
            spawnPriority = "false"
        }

        // console.log(`Tally creeps values: ${creepType} ${creepGroups[creepType].has}`)
        tally += creepGroups[creepType].has
    }
    // }

    // Automatically set whether we want to have any builders. This variable 'buildTargets' is also used
    // to determine work priorities for other creep types.
    // This approach seems terribly inefficient; it would be better to simply reassign the appropriate number of creeps
    // from other tasks, as the creeps can be very general-purpose.
    let buildTargets = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
    if (buildTargets.length) {
        creepGroups['builder'].wants = 1
        // creepGroups['hauler'].wants = 2
    } else {
        creepGroups['builder'].wants = 0
        // creepGroups['hauler'].wants = 4
    }

    if (everyHundredCounter == 100) {
        if (mineralsAmount > 500 && mineralsAmount < 2000) {
            console.log(`(mineralsAmount > 500 && mineralsAmount < 2000) ~~~ mineralsAmount ${mineralsAmount} mineralRegen ${mineralRegen} creepGroups["miner"].wants ${creepGroups["miner"].wants}`)
            if (creepGroups["miner"].has > 1) {
                creepGroups["miner"].wants = 0
                console.log(`(mineralsAmount > 500 && mineralsAmount < 2000)(creepGroups["miner"].has > 1) ~~~ mineralsAmount ${mineralsAmount} mineralRegen ${mineralRegen} creepGroups["miner"].wants ${creepGroups["miner"].wants}`)
            } else {
                creepGroups["miner"].wants = 1
                console.log(`(mineralsAmount > 500 && mineralsAmount < 2000)(else) ~~~ mineralsAmount ${mineralsAmount} mineralRegen ${mineralRegen} creepGroups["miner"].wants ${creepGroups["miner"].wants}`)
            }
        } else if (mineralsAmount < 100 && mineralRegen > 150) {
            creepGroups["miner"].wants = 0
            console.log(`else if(mineralsAmount < 100 && mineralRegen > 150) ~~~ mineralsAmount ${mineralsAmount} mineralRegen ${mineralRegen} creepGroups["miner"].wants ${creepGroups["miner"].wants}`)
        } else {
            creepGroups["miner"].wants = 2
            console.log(`else ~~~ mineralsAmount ${mineralsAmount} mineralRegen ${mineralRegen} creepGroups["miner"].wants ${creepGroups["miner"].wants}`)
        }
    }
    everyHundredCounter--
    if (everyHundredCounter == 0) {
        everyHundredCounter = 100
    }



    let towersNeedEnergy = home.find(FIND_MY_STRUCTURES, {
        filter: (s) => (s.structureType == STRUCTURE_TOWER)
            && s.energy < s.energyCapacity
    });

    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        // if(creep.memory.nextTask == "renew") {
        //     renewCreep(creep,spawn)
        // }

        // if(creep.memory.nextTask != "renew") {
        if (creep.memory.role == 'harvester') {
            // recycleCreep(creep, spawn)
            // if (unusedEnergyCapacity < 1 && tally > 3) {
            //     if (buildTargets.length) {
            //         roleBuilder.run(creep);
            //     } else {
            //         roleUpgrader.run(creep);
            //     }
            // } else {
            roleHarvester.run(creep, emergencySpawn);
            // }
        }
        if (creep.memory.role == 'hauler') {
            // if (unusedEnergyCapacity < 1 && tally > 3) {
            //     if (buildTargets.length) {
            //         roleBuilder.run(creep);
            //     } else {
            //         roleUpgrader.run(creep);
            //     }
            // } else {
                roleHarvester.run(creep);
            // }
        }
        if (creep.memory.role == 'salvager') {
            roleSalvager.run(creep, creepTaskPriority);
        }
        if (creep.memory.role == 'miner') {
            if (mineralsAmount) {
                roleMiner.run(creep);
            } else if (unusedEnergyCapacity > 0) {
                roleHarvester.run(creep)
            } else {
                roleUpgrader.run(creep)
            }

        }
        if (creep.memory.role == 'upgrader') {
            if (buildTargets.length) {
                roleBuilder.run(creep);
            } else {
                roleUpgrader.run(creep);
            }
        }
        if (creep.memory.role == 'builder') {
            if (buildTargets.length) {
                roleBuilder.run(creep);
            } else {
                roleHarvester.run(creep)
            }
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep)
            // roleHarvester.run(creep)
        }
        if (creep.memory.role == 'scout') {
            // creep.memory.target = Game.rooms['W6N54']
            // console.log(`checking scout creeps, current room name ${creep.room.name} and target ${creep.room.target}`)
            roleScout.run(creep)
        }
        if (creep.memory.role == 'claimer') {
            // creep.memory.target = Game.rooms['W6N54']
            // console.log(`checking scout creeps, current room name ${creep.room.name} and target ${creep.room.target}`)
            roleClaimer.run(creep, 'W6N54')
        }
        if (creep.memory.role == 'warrior') {
            // nearest SK thug: 9,45,W6N54
            let t1 = new RoomPosition(9, 45, 'W6N54')
            let t2 = new RoomPosition(9, 45, 'W6N54')
            // let target = new RoomPosition(9, 45, 'W6N54')
            roleWarrior.move(creep, spawn);
            // roleWarrior.attack(creep, t2);
        }
        if (creep.memory.role == 'raider') {
            // nearest SK thug: 9,45,W6N54
            // 2021-03-25 invaderCore next door West: 24,9,W7N53
            let moveTarget = new RoomPosition(9, 45, 'W6N54')
            let attackTarget = new RoomPosition(24, 9, 'W7N53')
            // let target = new RoomPosition(9, 45, 'W6N54')
            roleWarrior.move(creep, attackTarget);
            // roleWarrior.attack(creep, t2);
            // recycleCreep(creep, spawn)
        }

    }
    // console.log(`***ENERGY TALLY*** available now ${energy} and maximum capacity ${energyCapacity}, leaving ${unusedEnergyCapacity} unfilled`)
    if (spawnPriority != "false") {
        creepType = spawnPriority
        c = creepGroups[creepType]
        console.log(`Time to spawn a ${creepType}, ***${spawnPriority.toUpperCase()} priority***. Tally is ${c.has}. Energy cost will be ${c.cost}, available now ${energy}/${energyCapacity}`)
        let comp = c.composition
        let name = `${creepType}-level-${rcl}-${Game.time}`
        let mem = { memory: { role: creepType, home: home.name, level: rcl, working: false } }
        let x = spawn.spawnCreep(comp, name, mem)
    } else {
        for (let creepType in creepGroups) {
            let c = creepGroups[creepType]
            //  && creepType == 'hauler'
            if (c.has < c.wants) {
                console.log(`Time to spawn a ${creepType}, tally is ${c.has}. Energy cost will be ${c.cost}, available now ${energy}/${energyCapacity}`)
                let comp = c.composition
                let name = `${creepType}-level-${rcl}-${Game.time}`
                let mem = { memory: { role: creepType, home: home.name, level: rcl, working: false } }
                let x = Game.spawns['Spawn1'].spawnCreep(comp, name, mem)
                if (x == 0) {
                    console.log(`Spawning a ${creepType}`)
                } else {
                    // console.log(`Error in spawning: ${x}`)
                }
            }
        }
    }



    if (everyFiveCounter == 5) {
        console.log('CPU used end main loop (checking once every five ticks): ', Game.cpu.getUsed())
    }
    everyFiveCounter--
    if (everyFiveCounter == 0) {
        everyFiveCounter = 5
    }

}