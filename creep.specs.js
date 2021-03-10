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
        { level: 1 },
        { level: 2 },
        { level: 3 },
        {
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
                wants: 6,
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
            'upgrader': {
                has: 0,
                wants: 1,
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
                    WORK: 4,
                    CARRY: 11,
                    MOVE: 7,
                    ATTACK: 0,
                    RANGED_ATTACK: 0,
                    HEAL: 0,
                    CLAIM: 0,
                    TOUGH: 0
                },
                cost: 0
            },
        }
    ]

    const getBodyCost = (body) => _.sum(body, (p) => BODYPART_COST[p]);

    // NOTE: this is where RCL determines which set of creeps gets built - and breaks the program if it does not exist
    let creepGroups = creepLevelGroups[rcl-1]
    // ENDNOTE

    for (let creepType in creepGroups) {
        let t = creepType
        let c = creepGroups[t]
        let counter = 0
        let buildComp = []
        if (c.recipe['TOUGH'] > 0) {
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
                    if (z != "TOUGH") {
                        if (counter < max - 1) {
                            buildComp.push(x)
                        } else {
                            buildComp.push(x)
                        }

                    }
                }

            }
            ++counter
            c.composition = buildComp
        }
        c.cost = getBodyCost(c.composition)
    }
    return creepLevelGroups
}

module.exports = creepSpecs
