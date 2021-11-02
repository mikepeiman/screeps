let creepSpecs = (energyCapacity) => {

    /* 
    parts costs for reference:
                        WORK:           100
                        CARRY:           50
                        MOVE:            50
                        ATTACK:          80
                        RANGED_ATTACK:  150
                        HEAL:           250
                        CLAIM:          600
                        TOUGH:           10
    */

    /*
    What creep types are needed really? Most of mine have been multitasking.
    1. Harvester: maximum work, minimum move; maybe carry, depending on type of harvesting/mining
    2. Hauler: minimum work, maximum carry, min/moderate move
    3. Salvage & repair: moderate work, moderate carry, moderate/high move
    4. Melee warrior: tough, attack, repair, move
    5. Ranged warrior: ranged attack, move
    6. Medic: tough, repair, move
    */

    /*
    How to generate these creeps?
    Apply weighting values for what parts to prioritize, take current energy capacity as an argument, and calculate rounded number of parts, accounting for different parts costs
    This also allows an easy de facto adjustment for RCL levels, by using simple conditions on current energy capacity
    Can start with one move part on every creep, thus allowing to allocate 100% remaining to work, for example, and still have movement
    Eg.:
    */

    

    let creepGroups = {
        'harvester-dynamic': {
            type: 'worker',
            priorities: {
                WORK: 40,
                CARRY: 20,
                MOVE: 20,
                ATTACK: 0,
                RANGED_ATTACK: 0,
                HEAL: 0,
                CLAIM: 0,
                TOUGH: 0
            },
        },
        'harvester-static': {
            type: 'worker',
            priorities: {
                WORK: 100,
                CARRY: 0,
                MOVE: 0,
                ATTACK: 0,
                RANGED_ATTACK: 0,
                HEAL: 0,
                CLAIM: 0,
                TOUGH: 0
            },
        }, 
        'hauler': {
            type: 'worker',
            priorities: {
                WORK: 0,
                CARRY: 2,
                MOVE: 2,
                ATTACK: 0,
                RANGED_ATTACK: 0,
                HEAL: 0,
                CLAIM: 0,
                TOUGH: 0
            },
        },
        'salvage-repair': {
            type: 'worker',
            priorities: {
                WORK: 1,
                CARRY: 2,
                MOVE: 2,
                ATTACK: 0,
                RANGED_ATTACK: 0,
                HEAL: 0,
                CLAIM: 0,
                TOUGH: 0
            },
        },
        'infantry': {
            type: 'warrior',
            priorities: {
                WORK: 0,
                CARRY: 0,
                MOVE: 25,
                ATTACK: 35,
                RANGED_ATTACK: 0,
                HEAL: 0,
                CLAIM: 0,
                TOUGH: 40
            },
        },
        'paladin': {
            type: 'warrior',
            priorities: {
                WORK: 0,
                CARRY: 0,
                MOVE: 25,
                ATTACK: 25,
                RANGED_ATTACK: 0,
                HEAL: 25,
                CLAIM: 0,
                TOUGH: 25
            },
        }
    }

    function calculateCreepPartsList(energyCapacity) {
        console.log('energyCapacity: ', energyCapacity);
        for(let creepType in creepGroups) {
            let creep = creepGroups[creepType]
            let type = creep.type
            console.log(`🚀 ~ file: creep.specs.v2.js ~ line 121 ~ calculateCreepPartsList ~ type`, type)
            // let minSpecs = {
            //     WORK: 0,
            //     CARRY: 0,
            //     MOVE: 1,
            //     ATTACK: 0,
            //     RANGED_ATTACK: 0,
            //     HEAL: 0,
            //     CLAIM: 0,
            //     TOUGH: 0
            // }

            // if(type == "worker") {
            //     minSpecs.WORK = 1
            // }
        }
    }
calculateCreepPartsList(energyCapacity)

function subtractMandatoryPartsCosts(creepType, energyCapacity) {
    let mandatoryCost = 150
    let type = creepGroups[creepType].type
    if(type == "warrior") {
        mandatoryCost = 50
    } 
    return remainingEnergyBudget = energyCapacity - mandatoryCost
}

console.log(`🚀 ~ file: creep.specs.v2.js ~ line 141 ~ subtractMandatoryPartsCosts ~ subtractMandatoryPartsCosts`, subtractMandatoryPartsCosts("paladin", energyCapacity))




    // let creepLevelGroups = [
    //     {
    //         level: 1, specs: {
    //             'harvester': {
    //                 has: 0,
    //                 wants: 5,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 1,
    //                     CARRY: 2,
    //                     MOVE: 2,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'builder': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 1,
    //                     CARRY: 2,
    //                     MOVE: 2,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'repairer': {
    //                 has: 0,
    //                 wants: 1,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 5,
    //                     CARRY: 15,
    //                     MOVE: 10,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'salvager': {
    //                 has: 0,
    //                 wants: 1,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 5,
    //                     CARRY: 15,
    //                     MOVE: 10,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'warrior': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 0,
    //                     CARRY: 0,
    //                     MOVE: 8,
    //                     ATTACK: 8,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 24
    //                 },
    //                 cost: 0
    //             },
    //             'scout': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 0,
    //                     CARRY: 0,
    //                     MOVE: 3,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //         }
    //     },
    //     {
    //         level: 2, specs: {
    //             'harvester': {
    //                 has: 0,
    //                 wants: 4,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 3,
    //                     CARRY: 3,
    //                     MOVE: 2,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'builder': {
    //                 has: 0,
    //                 wants: 4,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 3,
    //                     CARRY: 3,
    //                     MOVE: 2,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'repairer': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 4,
    //                     CARRY: 11,
    //                     MOVE: 6,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'upgrader': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 5,
    //                     CARRY: 9,
    //                     MOVE: 7,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             }
    //         }
    //     },
    //     {
    //         level: 3, specs: {
    //             'harvester': {
    //                 has: 0,
    //                 wants: 4,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 3,
    //                     CARRY: 3,
    //                     MOVE: 2,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'builder': {
    //                 has: 0,
    //                 wants: 2,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 3,
    //                     CARRY: 3,
    //                     MOVE: 2,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'salvager': {
    //                 has: 0,
    //                 wants: 1,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 3,
    //                     CARRY: 3,
    //                     MOVE: 2,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'repairer': {
    //                 has: 0,
    //                 wants: 1,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 3,
    //                     CARRY: 3,
    //                     MOVE: 2,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'upgrader': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 5,
    //                     CARRY: 9,
    //                     MOVE: 7,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             }
    //         }
    //     },
    //     {
    //         level: 4, specs: {
    //             'harvester': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 5,
    //                     CARRY: 9,
    //                     MOVE: 7,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'builder': {
    //                 has: 0,
    //                 wants: 20,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 6,
    //                     CARRY: 10,
    //                     MOVE: 4,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'repairer': {
    //                 has: 0,
    //                 wants: 1,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 4,
    //                     CARRY: 11,
    //                     MOVE: 6,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'upgrader': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 5,
    //                     CARRY: 9,
    //                     MOVE: 7,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'warrior': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 0,
    //                     CARRY: 0,
    //                     MOVE: 8,
    //                     ATTACK: 8,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 24
    //                 },
    //                 cost: 0
    //             },
    //             'scout': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 0,
    //                     CARRY: 0,
    //                     MOVE: 3,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'hauler': {
    //                 has: 0,
    //                 wants: 5,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 5,
    //                     CARRY: 9,
    //                     MOVE: 7,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'salvager': {
    //                 has: 0,
    //                 wants: 1,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 5,
    //                     CARRY: 10,
    //                     MOVE: 6,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //         }
    //     },
    //     {
    //         level: 5, specs: {
    //             'harvester': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 5,
    //                     CARRY: 9,
    //                     MOVE: 7,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'builder': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 9,
    //                     CARRY: 9,
    //                     MOVE: 9,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'upgrader': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 5,
    //                     CARRY: 9,
    //                     MOVE: 7,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'warrior': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 0,
    //                     CARRY: 0,
    //                     MOVE: 8,
    //                     ATTACK: 8,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 24
    //                 },
    //                 cost: 0
    //             },
    //             'scout': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 0,
    //                     CARRY: 0,
    //                     MOVE: 3,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'hauler': {
    //                 has: 0,
    //                 wants: 4,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 8,
    //                     CARRY: 11,
    //                     MOVE: 9,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'salvager': {
    //                 has: 0,
    //                 wants: 1,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 5,
    //                     CARRY: 15,
    //                     MOVE: 10,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'repairer': {
    //                 has: 0,
    //                 wants: 1,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 5,
    //                     CARRY: 15,
    //                     MOVE: 10,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'miner': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 12,
    //                     CARRY: 12,
    //                     MOVE: 8,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //         }
    //     },
    //     {
    //         level: 6, specs: {
    //             'harvester': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 2,
    //                     CARRY: 4,
    //                     MOVE: 2,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'builder': {
    //                 has: 0,
    //                 wants: 2,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 10,
    //                     CARRY: 10,
    //                     MOVE: 10,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'upgrader': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 5,
    //                     CARRY: 9,
    //                     MOVE: 7,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'warrior': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 0,
    //                     CARRY: 0,
    //                     MOVE: 8,
    //                     ATTACK: 8,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 24
    //                 },
    //                 cost: 0
    //             },
    //             'raider': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 0,
    //                     CARRY: 0,
    //                     MOVE: 10,
    //                     ATTACK: 6,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 4,
    //                     CLAIM: 0,
    //                     TOUGH: 20
    //                 },
    //                 cost: 0
    //             },
    //             'scout': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 0,
    //                     CARRY: 0,
    //                     MOVE: 3,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'hauler': {
    //                 has: 0,
    //                 wants: 2,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 10,
    //                     CARRY: 15,
    //                     MOVE: 10,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'miner': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 12,
    //                     CARRY: 12,
    //                     MOVE: 8,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'salvager': {
    //                 has: 0,
    //                 wants: 1,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 10,
    //                     CARRY: 15,
    //                     MOVE: 10,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'repairer': {
    //                 has: 0,
    //                 wants: 1,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 5,
    //                     CARRY: 15,
    //                     MOVE: 10,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'claimer': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 0,
    //                     CARRY: 0,
    //                     MOVE: 1,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 1,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //         }
    //     },
    //     {
    //         level: 7, specs: {
    //             'harvester': {
    //                 has: 0,
    //                 wants: 2,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 12,
    //                     CARRY: 20,
    //                     MOVE: 16,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'builder': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 10,
    //                     CARRY: 20,
    //                     MOVE: 15,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'upgrader': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 5,
    //                     CARRY: 9,
    //                     MOVE: 7,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'warrior': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 0,
    //                     CARRY: 0,
    //                     MOVE: 8,
    //                     ATTACK: 8,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 24
    //                 },
    //                 cost: 0
    //             },
    //             'paladin': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 0,
    //                     CARRY: 0,
    //                     MOVE: 12,
    //                     ATTACK: 6,
    //                     RANGED_ATTACK: 6,
    //                     HEAL: 6,
    //                     CLAIM: 0,
    //                     TOUGH: 12
    //                 },
    //                 cost: 0
    //             },
    //             'scout': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 0,
    //                     CARRY: 0,
    //                     MOVE: 3,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'miner': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 12,
    //                     CARRY: 12,
    //                     MOVE: 8,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'hauler': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 10,
    //                     CARRY: 10,
    //                     MOVE: 10,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'salvager': {
    //                 has: 0,
    //                 wants: 1,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 10,
    //                     CARRY: 15,
    //                     MOVE: 10,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'repairer': {
    //                 has: 0,
    //                 wants: 1,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 10,
    //                     CARRY: 20,
    //                     MOVE: 15,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //         }
    //     },
    //     {
    //         level: 8, specs: {
    //             'miner': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 12,
    //                     CARRY: 12,
    //                     MOVE: 8,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'harvester': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 5,
    //                     CARRY: 9,
    //                     MOVE: 7,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'builder': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 9,
    //                     CARRY: 9,
    //                     MOVE: 9,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'upgrader': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 5,
    //                     CARRY: 9,
    //                     MOVE: 7,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'warrior': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 0,
    //                     CARRY: 0,
    //                     MOVE: 8,
    //                     ATTACK: 8,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 24
    //                 },
    //                 cost: 0
    //             },
    //             'scout': {
    //                 has: 0,
    //                 wants: 0,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 0,
    //                     CARRY: 0,
    //                     MOVE: 3,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'hauler': {
    //                 has: 0,
    //                 wants: 4,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 8,
    //                     CARRY: 11,
    //                     MOVE: 9,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'salvager': {
    //                 has: 0,
    //                 wants: 1,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 5,
    //                     CARRY: 15,
    //                     MOVE: 10,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //             'repairer': {
    //                 has: 0,
    //                 wants: 1,
    //                 level: rcl,
    //                 recipe: {
    //                     WORK: 5,
    //                     CARRY: 15,
    //                     MOVE: 10,
    //                     ATTACK: 0,
    //                     RANGED_ATTACK: 0,
    //                     HEAL: 0,
    //                     CLAIM: 0,
    //                     TOUGH: 0
    //                 },
    //                 cost: 0
    //             },
    //         }
    //     }
    // ]

    const getBodyCost = (body) => _.sum(body, (p) => BODYPART_COST[p]);

    // NOTE: this is where RCL determines which set of creeps gets built - and breaks the program if it does not exist
    // let creepGroups = creepLevelGroups[rcl - 1].specs
    // ENDNOTE

    // for (let creepType in creepGroups) {
    //     let t = creepType
    //     let c = creepGroups[t]
    //     let counter = 0
    //     let buildComp = []
    //     // console.log(`🚀 ~ file: creep.specs.js ~ line 1020 ~ creepSpecs ~ c.recipe[TOUGH]`, c.recipe['MOVE'])

    //     if (c.recipe['TOUGH'] > 0) {
    //         for (let z = 0; z < c.recipe['TOUGH']; z++) {
    //             buildComp.push('tough')
    //         }
    //     }
    //     let arr = Object.values(c.recipe)
    //     let max = Math.max(...arr)
    //     while (counter < max) {
    //         for (let z in c.recipe) {
    //             // console.log(`🚀 ~ file: creep.specs.js ~ line 998 ~ creepSpecs ~ z ${z} `)
    //             let x = `${z.toLowerCase()}`
    //             if (c.recipe[z] > counter) {
    //                 if (x != 'tough' && x != 'heal') {
    //                     buildComp.push(x)
    //                 }
    //             }
    //         }
    //         ++counter
    //         c.composition = buildComp
    //     }
    //     if (c.recipe['HEAL'] > 0) {
    //         for (let z = 0; z < c.recipe['HEAL']; z++) {
    //             buildComp.push('heal')
    //         }
    //     }
    //     c.composition = buildComp
    //     // console.log(`🚀 ~ file: creep.specs.js ~ line 1014 ~ creepSpecs ~ buildComp ${t}::: `, buildComp)
    //     c.cost = getBodyCost(c.composition)
    // }

    return 1
}

module.exports = creepSpecs
