// let _ = require('lodash')
let newComp = (rcl) => {

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
                wants: 4,
                level: rcl,
                recipe: {
                    WORK: 3,
                    CARRY: 7,
                    MOVE: 5,
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
                wants: 4,
                level: rcl,
                recipe: {
                    WORK: 4,
                    CARRY: 4,
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
                    CARRY: 4,
                    MOVE: 4,
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
                    WORK: 4,
                    CARRY: 4,
                    MOVE: 4,
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
                    MOVE: 6,
                    ATTACK: 5,
                    RANGED_ATTACK: 0,
                    HEAL: 0,
                    CLAIM: 0,
                    TOUGH: 18
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
            console.log(`YEEEEEEES tough parts`)
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

    let spawn = Game.spawns['Spawn1']
    let comp = creepGroups["warrior"].composition
    let test = spawn.spawnCreep(comp, 'TESSSSTY', {dryRun: true})
    let cost = getBodyCost(comp)
    console.log(`++++++++++++++++++++ new creep spawn test result ${test} and cost ${cost} and composition ${comp}`)

    for (let creepType in creepGroups) {
        let t = creepType
        let c = creepGroups[t]
        let cost = c.cost
        console.log(`🚀 ~ file: newComposition.js ~ creepType{${creepType}} ~ creepGroups[t]{${creepGroups[t].composition}}  newComp ~ cost: `, cost)
    }
    console.log('CPU used end newComposition.js: ', Game.cpu.getUsed())
    return creepLevelGroups
}

module.exports = newComp
