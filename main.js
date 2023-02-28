let roleHarvester = require('role.harvester');
let roleResourceMover = require('role.resource.mover');
let roleSalvager = require('role.salvager');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleMiner = require('role.miner');
let roleWarrior = require('role.warrior');
let gatherEnergy = require('task.gather.energy')
let recycleCreep = require('creep.recycle')
let creepSpecs = require('creep.specs')
let buildCreep = require('buildCreep')
const Traveler = require('traveler')
const roleScout = require('role.scout');
const roleRepairer = require('role.repairer');
const renewCreep = require('renew.creep')
const renewCheck = require('renew.check')
// let idleCreep = require('idleCreep')
let roleClaimer = require('role.claimer')
let creepsFullPopulation = false

let taskTransferResources = require('task.resource.transfer');

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
let hostiles = home.find(FIND_HOSTILE_CREEPS, {
    filter: (c) => c.owner.username != "cplive" && c.owner.username != "Brun1L" && c.owner.username != "mrmartinstreet"
});
let hostilesInRoom
if (hostiles[0]) {
    hostilesInRoom = true
}

// roleTower.run(home)
// for (let creepType in creepGroups) {
//     let c = creepGroups[creepType]
//     console.log(`${creepType} costs: ${c.cost}`)
// }
let everyHundredCounter = 100
let everyFiveCounter = 5
let renewCreepTimer = 0
require('prototype.tower')

module.exports.loop = function () {

    spawn = Game.spawns['Spawn1']
    home = spawn.room

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
    // // some logs to look at what's in the room
    let allMyStructures = spawn.room.find(FIND_MY_STRUCTURES)
    // console.log(`🚀 ~ file: main.js:83 ~ allMyStructures:`, allMyStructures)
    // let allHostileStructures = spawn.room.find(FIND_HOSTILE_STRUCTURES)
    // console.log(`🚀 ~ file: main.js:86 ~ allHostileStructures:`, allHostileStructures)
    // let allStructures = spawn.room.find(FIND_STRUCTURES)
    // console.log(`🚀 ~ file: main.js:86 ~ allStructures:`, allStructures)
    // let allRuins = spawn.room.find(FIND_RUINS)
    // console.log(`🚀 ~ file: main.js:86 ~ allRuins:`, allRuins)
    // let allMinerals = spawn.room.find(FIND_MINERALS)
    // console.log(`🚀 ~ file: main.js:86 ~ allMinerals:`, allMinerals)


    rc = home.controller
    rcl = rc.level

    let hostiles = home.find(FIND_HOSTILE_CREEPS);
    // let hostiles = home.find(FIND_HOSTILE_CREEPS, {
    //     filter: (c) => c.owner.username != "cplive" && c.owner.username != "Brun1L" && c.owner.username != "mrmartinstreet"
    // });


    let energy = spawn.room.energyAvailable;
    let roomEnergyCapacity = spawn.room.energyCapacityAvailable;
    let currentEnergyAvailable = spawn.room.energyAvailable
    let creepLevelGroups = buildCreep(roomEnergyCapacity)
    let roomCreeps = Game.creeps
    let creepGroups = buildCreep(roomEnergyCapacity)
    // console.log(`🚀 ~ file: main.js ~ line 94 ~ creepGroups`, Object.keys(creepGroups))

    let unusedEnergyCapacity = roomEnergyCapacity - energy
    console.log(`🚀 ~ file: main.js:113 ~ unusedEnergyCapacity ${unusedEnergyCapacity} = roomEnergyCapacity ${roomEnergyCapacity} - energy ${energy}`)
    let RCLprogressRemains = home.controller.progressTotal - home.controller.progress

    let minerals = home.find(FIND_MINERALS)
    let mineralsAmount = minerals[0].mineralAmount
    let mineralRegen = minerals[0].ticksToRegeneration

    if (hostiles[0]) {
        creepTaskPriority = "powerTowers"
    } else {
        creepTaskPriority = "upgradeController"
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
    // console.log(`***ENERGY TALLY*** available now ${energy} and maximum capacity ${roomEnergyCapacity}, leaving ${unusedEnergyCapacity} unfilled`)

    let tally = 0
    // if (everyFiveCounter == 5) {
    for (let creepType in creepGroups) {
        // console.log(`🚀 ~ file: main.js ~ line 131 ~ creepType`, creepType)
        let creep = creepGroups[creepType]
        // console.log(`🚀 ~ file: main.js ~ line 133 ~ creep`, creep.name, creep.role)
        creep.has = _.sum(Game.creeps, { memory: { role: creep.role } })
        // let harvester = creepGroups["harvester"] || ''
        // let salvager = creepGroups["salvager"] || ''
        // if (harvester.has < 1) {
        //     spawnPriority = "harvester"
        // } else if (salvager.has < 1) {
        //     spawnPriority = "salvager"
        // } else {
        //     spawnPriority = "false"
        // }

        // console.log(`Tally creeps values: ${creepType} ${creepGroups[creepType].has}`)
        tally += creepGroups[creepType].has
    }
    // }

    // Automatically set whether we want to have any builders. This variable 'buildTargets' is also used
    // to determine work priorities for other creep types.
    // This approach seems terribly inefficient; it would be better to simply reassign the appropriate number of creeps
    // from other tasks, as the creeps can be very general-purpose.
    let buildTargets = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
    // if (buildTargets.length) {
    //     creepGroups['Engineer'].wants = 2
    //     // #todo reduce to 1 when the rebuild is complete
    //     // creepGroups['hauler'].wants = 2
    // } else {
    //     creepGroups['Engineer'].wants = 0
    //     // creepGroups['hauler'].wants = 4
    // }

    // if (everyHundredCounter == 100) {
    //     if (mineralsAmount > 500 && mineralsAmount < 2000) {
    //         console.log(`(mineralsAmount > 500 && mineralsAmount < 2000) ~~~ mineralsAmount ${mineralsAmount} mineralRegen ${mineralRegen} creepGroups["miner"].wants ${creepGroups["miner"].wants}`)
    //         if (creepGroups["miner"].has > 1) {
    //             creepGroups["miner"].wants = 0
    //             console.log(`(mineralsAmount > 500 && mineralsAmount < 2000)(creepGroups["miner"].has > 1) ~~~ mineralsAmount ${mineralsAmount} mineralRegen ${mineralRegen} creepGroups["miner"].wants ${creepGroups["miner"].wants}`)
    //         } else {
    //             creepGroups["miner"].wants = 1
    //             console.log(`(mineralsAmount > 500 && mineralsAmount < 2000)(else) ~~~ mineralsAmount ${mineralsAmount} mineralRegen ${mineralRegen} creepGroups["miner"].wants ${creepGroups["miner"].wants}`)
    //         }
    //     } else if (mineralsAmount < 100 && mineralRegen > 150) {
    //         creepGroups["miner"].wants = 0
    //         console.log(`else if(mineralsAmount < 100 && mineralRegen > 150) ~~~ mineralsAmount ${mineralsAmount} mineralRegen ${mineralRegen} creepGroups["miner"].wants ${creepGroups["miner"].wants}`)
    //     } else {
    //         // #todo uncomment this once base is rebuilt
    //         // creepGroups["miner"].wants = 2
    //         console.log(`else ~~~ mineralsAmount ${mineralsAmount} mineralRegen ${mineralRegen} creepGroups["miner"].wants ${creepGroups["miner"].wants}`)
    //     }
    // }
    everyHundredCounter--
    if (everyHundredCounter == 0) {
        everyHundredCounter = 100
    }



    let towersNeedEnergy = home.find(FIND_MY_STRUCTURES, {
        filter: (s) => (s.structureType == STRUCTURE_TOWER)
            && s.energy < s.roomEnergyCapacity
    });

    // let takeEnergyRuins = creep.room.find(FIND_RUINS, {
    //     filter: ruin => ruin.store.energy > 20
    // })

    for (let name in Game.creeps) {
        // console.log('name: ', name);
        let creep = Game.creeps[name];
        // console.log(`creep: , ${creep}, HOME: ${creep.memory.home}, XFER: ${creep.memory.transferring}, ROLE: ${creep.memory.role}`);
        // if(creep.memory.nextTask == "renew") {
        //     renewCreep(creep,spawn)
        // }

        // if(creep.memory.nextTask != "renew") {
        if (creep.memory.role == 'harvester') {
            console.log(`⛽ ~ file: main.js:227 ~ creep.memory.role == 'harvester':`, creep.name)
            // recycleCreep(creep, spawn)
            if (unusedEnergyCapacity < 1 && tally > 3) {
                console.log(`🚀 ~ file: main.js:230 ~ unusedEnergyCapacity < 1 && tally > 3:`, unusedEnergyCapacity < 1 && tally > 3)
                if (buildTargets.length) {
                    console.log(`🚀 ~ file: main.js:233 ~ buildTargets.length:`, buildTargets.length)
                    // console.log('buildTargets: ', buildTargets);
                    roleBuilder.run(creep);
                } else if (takeEnergyRuins.length > 0){
                    console.log(`🚀 ~ file: main.js:233 ~ CREEP ROLE HARVESTER: takeEnergyRuins.length > 0:`, takeEnergyRuins.length > 0)
                    roleSalvager.run(creep);
                } else {
                    console.log(`roleHarvester run on harvester creep ${creep}`);
                    roleSalvager.run(creep);
                    // roleHarvester.run(creep, emergencySpawn, hostilesInRoom);
                }
            } else {
                console.log(`⛽🚜 ~ file: main.js: 244 ~ run role harvester `, creep.name)
                roleHarvester.run(creep, emergencySpawn, hostilesInRoom);
            }
        }

        
        if (creep.memory.role == 'resources') {
            console.log(`🚀 ~ file: main.js:247 ~ RESOURCES creep:`, creep)
            // if (unusedEnergyCapacity < 1 && tally > 3) {
            //     if (buildTargets.length) {
            //         roleBuilder.run(creep);
            //     } else {
            //         roleUpgrader.run(creep);
            //     }
            // } else {
                taskTransferResources.run(creep)
            // roleResourceMover.run(creep);
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
            roleHarvester.run(creep, emergencySpawn, hostilesInRoom);
            // }
        }
        if (creep.memory.role == 'salvager') {
            if (creepGroups['Dynamic-Harvester-Miner'].has < 2 && creepGroups['Static-Harvester-Miner'].has < 2) {
                // console.log(`salvager => harvest role`)
                roleHarvester.run(creep, emergencySpawn, hostilesInRoom);
            } else {
                roleSalvager.run(creep, creepTaskPriority);
            }
        }
        let storageExists = allMyStructures.filter(s => s.structureType == "storage")
        // console.log(`🚀 ~ file: main.js:265 ~ storageExists:`, storageExists)
        if (creep.memory.role == 'miner') {
            if (mineralsAmount && storageExists.length) {
                roleMiner.run(creep);
                // console.log(`a miner ${creep} is assigned miner role`)
            } else if (unusedEnergyCapacity > 0) {
                roleHarvester.run(creep)
                // console.log(`a miner ${creep} is assigned harvester role`)
            } else {
                // console.log(`a miner ${creep} is assigned salvager role`)
                roleSalvager.run(creep)
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
            // TODO NOTE remove this when refactoring. This is for game start when I don't need repairers
            // if (mineralsAmount && storageExists.length) {
            //     roleMiner.run(creep);
            //     // console.log(`a miner ${creep} is assigned miner role`)
            // } else
             if (unusedEnergyCapacity > 0) {
                roleHarvester.run(creep)
                // console.log(`a miner ${creep} is assigned harvester role`)
            } else {
                // console.log(`a miner ${creep} is assigned salvager role`)
                roleSalvager.run(creep)
            }
            // roleRepairer.run(creep)
            // roleHarvester.run(creep)
        }
        if (creep.memory.role == 'scout') {
            // creep.memory.target = Game.rooms['E25S12']
            // console.log(`checking scout creeps, current room name ${creep.room.name} and target ${creep.room.target}`)
            roleScout.run(creep)
        }
        if (creep.memory.role == 'claimer') {
            // creep.memory.target = Game.rooms['E25S12']
            // console.log(`checking scout creeps, current room name ${creep.room.name} and target ${creep.room.target}`)
            roleClaimer.run(creep, 11, 34, 'E25S12')
        }
        if (creep.memory.role == 'warrior') {
            // can make note of targets here
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
    console.log(`***ENERGY TALLY*** available now ${currentEnergyAvailable} and maximum capacity ${roomEnergyCapacity}, leaving ${unusedEnergyCapacity} unfilled`)
    if (spawnPriority != "false") {
        creepType = spawnPriority
        console.log('creepType: ', creepType);
        c = buildCreep(roomEnergyCapacity)
        console.log(`🚀 ~ file: main.js ~ line 292 ~ c`, c)
        console.log(`Time to spawn a ${creepType}, ***${spawnPriority.toUpperCase()} priority***. Tally is ${c.has}. Energy cost will be ${c.cost}, available now ${energy}/${roomEnergyCapacity}`)
        let comp = c.composition
        let name = `${creepType}-level-${rcl}-${Game.time}`
        let mem = { memory: { role: creepType, home: home.name, level: rcl, working: false } }
        let x = spawn.spawnCreep(comp, name, mem)
    } else {
        for (let creepType in creepGroups) {
            let c = creepGroups[creepType]
            // console.log(`🚀 ~ file: main.js ~ line 301 ~ c`, c.name)
            //  && creepType == 'hauler'
            if (c.has < c.wants) {
                console.log(`Time to spawn a ${creepType}, tally is ${c.has}. Energy cost will be ${c.cost}, available now ${energy}/${roomEnergyCapacity}`)
                let comp = c.blueprint
                let name = `${creepType}-${c.cost}-${Game.time}`
                let mem = { memory: { role: c.role, home: home.name, level: rcl, working: false } }
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