let creepSpecs = (rcl) => {

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

    let creepLevelGroups = [
        {
            level: 1, specs: {
                'harvester': {
                    has: 0,
                    wants: 8,
                    level: rcl,
                    recipe: {
                        WORK: 1,
                        CARRY: 2,
                        MOVE: 2,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'builder': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 1,
                        CARRY: 2,
                        MOVE: 2,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'repairer': {
                    has: 0,
                    wants: 1,
                    level: rcl,
                    recipe: {
                        WORK: 5,
                        CARRY: 15,
                        MOVE: 10,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'salvager': {
                    has: 0,
                    wants: 1,
                    level: rcl,
                    recipe: {
                        WORK: 5,
                        CARRY: 15,
                        MOVE: 10,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'warrior': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 0,
                        CARRY: 0,
                        MOVE: 8,
                        ATTACK: 8,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 24
                    },
                    cost: 0
                },
                'scout': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 0,
                        CARRY: 0,
                        MOVE: 3,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
            }
        },
        {
            level: 2, specs: {
                'harvester': {
                    has: 0,
                    wants: 4,
                    level: rcl,
                    recipe: {
                        WORK: 1,
                        CARRY: 2,
                        MOVE: 2,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'builder': {
                    has: 0,
                    wants: 2,
                    level: rcl,
                    recipe: {
                        WORK: 1,
                        CARRY: 2,
                        MOVE: 2,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'repairer': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 4,
                        CARRY: 11,
                        MOVE: 6,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'upgrader': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 5,
                        CARRY: 9,
                        MOVE: 7,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                }
            }
        },
        {
            level: 3, specs: {
                'harvester': {
                    has: 0,
                    wants: 4,
                    level: rcl,
                    recipe: {
                        WORK: 1,
                        CARRY: 2,
                        MOVE: 2,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'builder': {
                    has: 0,
                    wants: 2,
                    level: rcl,
                    recipe: {
                        WORK: 1,
                        CARRY: 2,
                        MOVE: 2,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'repairer': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 4,
                        CARRY: 11,
                        MOVE: 6,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'upgrader': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 5,
                        CARRY: 9,
                        MOVE: 7,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                }
            }
        },
        {
            level: 4, specs: {
                'harvester': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 5,
                        CARRY: 9,
                        MOVE: 7,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'builder': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 6,
                        CARRY: 10,
                        MOVE: 4,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'repairer': {
                    has: 0,
                    wants: 1,
                    level: rcl,
                    recipe: {
                        WORK: 4,
                        CARRY: 11,
                        MOVE: 6,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'upgrader': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 5,
                        CARRY: 9,
                        MOVE: 7,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'warrior': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 0,
                        CARRY: 0,
                        MOVE: 8,
                        ATTACK: 8,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 24
                    },
                    cost: 0
                },
                'scout': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 0,
                        CARRY: 0,
                        MOVE: 3,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'hauler': {
                    has: 0,
                    wants: 5,
                    level: rcl,
                    recipe: {
                        WORK: 5,
                        CARRY: 9,
                        MOVE: 7,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'salvager': {
                    has: 0,
                    wants: 2,
                    level: rcl,
                    recipe: {
                        WORK: 5,
                        CARRY: 10,
                        MOVE: 6,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
            }
        },
        {
            level: 5, specs: {
                'harvester': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 5,
                        CARRY: 9,
                        MOVE: 7,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'builder': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 9,
                        CARRY: 9,
                        MOVE: 9,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'upgrader': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 5,
                        CARRY: 9,
                        MOVE: 7,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'warrior': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 0,
                        CARRY: 0,
                        MOVE: 8,
                        ATTACK: 8,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 24
                    },
                    cost: 0
                },
                'scout': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 0,
                        CARRY: 0,
                        MOVE: 3,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'hauler': {
                    has: 0,
                    wants: 4,
                    level: rcl,
                    recipe: {
                        WORK: 8,
                        CARRY: 11,
                        MOVE: 9,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'salvager': {
                    has: 0,
                    wants: 1,
                    level: rcl,
                    recipe: {
                        WORK: 5,
                        CARRY: 15,
                        MOVE: 10,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'repairer': {
                    has: 0,
                    wants: 1,
                    level: rcl,
                    recipe: {
                        WORK: 5,
                        CARRY: 15,
                        MOVE: 10,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
            }
        },
        {
            level: 6, specs: {
                'harvester': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 2,
                        CARRY: 4,
                        MOVE: 2,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'builder': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 10,
                        CARRY: 10,
                        MOVE: 10,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'upgrader': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 5,
                        CARRY: 9,
                        MOVE: 7,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'warrior': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 0,
                        CARRY: 0,
                        MOVE: 8,
                        ATTACK: 8,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 24
                    },
                    cost: 0
                },
                'scout': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 0,
                        CARRY: 0,
                        MOVE: 3,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'hauler': {
                    has: 0,
                    wants: 4,
                    level: rcl,
                    recipe: {
                        WORK: 10,
                        CARRY: 12,
                        MOVE: 10,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'miner': {
                    has: 0,
                    wants: 2,
                    level: rcl,
                    recipe: {
                        WORK: 10,
                        CARRY: 12,
                        MOVE: 10,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'salvager': {
                    has: 0,
                    wants: 1,
                    level: rcl,
                    recipe: {
                        WORK: 5,
                        CARRY: 15,
                        MOVE: 10,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'repairer': {
                    has: 0,
                    wants: 1,
                    level: rcl,
                    recipe: {
                        WORK: 5,
                        CARRY: 15,
                        MOVE: 10,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'claimer': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 0,
                        CARRY: 0,
                        MOVE: 1,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 1,
                        TOUGH: 0
                    },
                    cost: 0
                },
            }
        },
        {
            level: 7, specs: {
                'harvester': {
                    has: 0,
                    wants: 2,
                    level: rcl,
                    recipe: {
                        WORK: 12,
                        CARRY: 20,
                        MOVE: 16,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'builder': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 9,
                        CARRY: 9,
                        MOVE: 9,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'upgrader': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 5,
                        CARRY: 9,
                        MOVE: 7,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'warrior': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 0,
                        CARRY: 0,
                        MOVE: 8,
                        ATTACK: 8,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 24
                    },
                    cost: 0
                },
                'paladin': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 0,
                        CARRY: 0,
                        MOVE: 12,
                        ATTACK: 6,
                        RANGED_ATTACK: 6,
                        HEAL: 6,
                        CLAIM: 0,
                        TOUGH: 12
                    },
                    cost: 0
                },
                'scout': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 0,
                        CARRY: 0,
                        MOVE: 3,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'hauler': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 8,
                        CARRY: 11,
                        MOVE: 9,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'salvager': {
                    has: 0,
                    wants: 1,
                    level: rcl,
                    recipe: {
                        [WORK]: 16,
                        [CARRY]: 20,
                        [MOVE]: 14,
                        [ATTACK]: 0,
                        [RANGED_ATTACK]: 0,
                        [HEAL]: 0,
                        [CLAIM]: 0,
                        [TOUGH]: 0
                    },
                    cost: 0
                },
                'repairer': {
                    has: 0,
                    wants: 1,
                    level: rcl,
                    recipe: {
                        WORK: 10,
                        CARRY: 20,
                        MOVE: 15,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
            }
        },
        {
            level: 8, specs: {
                'harvester': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 5,
                        CARRY: 9,
                        MOVE: 7,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'builder': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 9,
                        CARRY: 9,
                        MOVE: 9,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'upgrader': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 5,
                        CARRY: 9,
                        MOVE: 7,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'warrior': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 0,
                        CARRY: 0,
                        MOVE: 8,
                        ATTACK: 8,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 24
                    },
                    cost: 0
                },
                'scout': {
                    has: 0,
                    wants: 0,
                    level: rcl,
                    recipe: {
                        WORK: 0,
                        CARRY: 0,
                        MOVE: 3,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'hauler': {
                    has: 0,
                    wants: 4,
                    level: rcl,
                    recipe: {
                        WORK: 8,
                        CARRY: 11,
                        MOVE: 9,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'salvager': {
                    has: 0,
                    wants: 1,
                    level: rcl,
                    recipe: {
                        WORK: 5,
                        CARRY: 15,
                        MOVE: 10,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
                'repairer': {
                    has: 0,
                    wants: 1,
                    level: rcl,
                    recipe: {
                        WORK: 5,
                        CARRY: 15,
                        MOVE: 10,
                        ATTACK: 0,
                        RANGED_ATTACK: 0,
                        HEAL: 0,
                        CLAIM: 0,
                        TOUGH: 0
                    },
                    cost: 0
                },
            }
        }
    ]

    const getBodyCost = (body) => _.sum(body, (p) => BODYPART_COST[p]);

    // NOTE: this is where RCL determines which set of creeps gets built - and breaks the program if it does not exist
    let creepGroups = creepLevelGroups[rcl - 1].specs
    // ENDNOTE

    for (let creepType in creepGroups) {
        let t = creepType
        let c = creepGroups[t]
        let counter = 0
        let buildComp = []
        if (c.recipe[TOUGH] > 0) {
            for (let z = 0; z < c.recipe['TOUGH']; z++) {
                buildComp.push('tough')
            }
        }
        let arr = Object.values(c.recipe)
        let max = Math.max(...arr)
        while (counter < max) {
            for (let z in c.recipe) {
                let x = `${z.toLowerCase()}`
                if (c.recipe[z] > counter) {
                    if (z != TOUGH && z != HEAL) {
                            buildComp.push(x)
                    }
                }
            }
            ++counter
            c.composition = buildComp
        }
        if (c.recipe[HEAL] > 0) {
            for (let z = 0; z < c.recipe[HEAL]; z++) {
                buildComp.push('heal')
            }
        }
        c.composition = buildComp
        c.cost = getBodyCost(c.composition)
    }

    // for (let creepType in creepGroups) {
    //     let t = creepType
    //     let c = creepGroups[t]
    //     let counter = 0
    //     let buildComp = []
    //     if (c.recipe[TOUGH] > 0) {
    //         for (let z = 0; z < c.recipe[TOUGH]; z++) {
    //             buildComp.push(TOUGH)
    //         }
    //     }
    //     let arr = Object.values(c.recipe)
    //     let max = Math.max(...arr)
    //     while (counter < max) {
    //         for (let z in c.recipe) {
    //         console.log(`🚀 ~ file: creep.specs.js ~ line 983 ~ creepSpecs ~ z`, z)
                
    //             if (c.recipe[z] > counter) {
    //                 if (z != TOUGH && z != HEAL) {
    //                         buildComp.push(z)
    //                 }
    //             }
    //         }
    //         ++counter
    //         c.composition = buildComp
    //     }
    //     if (c.recipe[HEAL] > 0) {
    //         for (let z = 0; z < c.recipe[HEAL]; z++) {
    //             buildComp.push(HEAL)
    //         }
    //     }
    //     c.composition = buildComp
    //     c.cost = getBodyCost(buildComp)
    // }
    return creepLevelGroups
}

module.exports = creepSpecs
