let buildCreep = (creepName, energyCapacity) => {

    /* 
    parts costs for reference:
    */
    let COSTS = {
        'WORK': 100,
        'CARRY': 50,
        'MOVE': 50,
        'ATTACK': 80,
        'RANGED_ATTACK': 150,
        'HEAL': 250,
        'CLAIM': 600,
        'TOUGH': 10
    }

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


    // I should probably start using class-based inheritance for these guys...
    let creepGroups = {
        // Resource-Hauler maximizes carry capacity, moderate to low movement, minimal work capacity
        'Resource-Hauler': {
            type: 'worker',
            priorities: {},
            composition: {}
        },
        // Harvester-Miner maximizes work capacity, no carry capacity, minimal mobility
        'Harvester-Miner': {
            type: 'worker',
            priorities: {},
            composition: {}
        },
        // Engineers work and carry energy, with decent mobility
        'Engineer': {
            type: 'worker',
            priorities: {},
            composition: {}
        },
        'infantry': {
            type: 'warrior',
            priorities: {},
            composition: {}
        },
        'paladin': {
            type: 'warrior',
            priorities: {},
            composition: {}
        }
    }

    calculateCreepPartsList("Harvester-Miner")
    calculateCreepPartsList("Resource-Hauler")

    function calculateCreepPartsList(creepName) {
        console.log('energyCapacity: ', energyCapacity);
        let creep = creepGroups[creepName]
        let type = creep.type
        let energyBudget = subtractMandatoryPartsCosts(creep, energyCapacity)
        generateCreepComposition(creepName, energyBudget)
    }

    function generateCreepComposition(creepName, energyBudget) {
        console.log(`🚀 ~ file: creep.specs.v2.js ~ line 86 ~ generateCreepComposition ~ creepName`, creepName)
        let creep = creepGroups[creepName]

        let energyHarvestStrategy = "dynamic" // or "static"
        // what's relevant?
        // distance between energy sources and...? I can calculate this. But why?
        // perhaps the important thing is resource-collection strategy. Right now my "normal" is dynamic harvesting.
        // I can code for this as I'm used to it, and then implement a static mining strategy.
        let resourceInventory = "normal"
        // what is this for? It made sense when I wrote it.
        // I guess it might refer to if containers are full or not, things like that...
        // keeping it for ideas, right now seems redundant/useless
        let hostilesInventory = "normal"
        // this should matter to warriors, but perhaps not to workers. This whole module is about building creeps,
        // not directing/insutrcting/mobilizing them. OK. So this variable belongs with creep command, not creep construction.
        // keeping it here for now so I remember to use it there.
        /* **** */
        // Here begins my first attempt at "verbose coding", the concept of using fully-descriptive function and variable names,
        // and as many as necessary to make the entire program human-comprehensible.
        // This is a strategy I am exploring that might improve my actual programming skill, as well as my ability to debug code -
        // especially debugging when the code has been forgotten due to intervening time and other projects. Or, it is even
        // someone else reading the code, who did not write it.
        determineCreepPrioritiesBasedOnCurrentSituation(creepName, energyHarvestStrategy, resourceInventory, hostilesInventory)
        for (let component in COSTS) {
            creep.composition[component] = getNumberOfPartsOfType(creep, component, energyBudget)
        }
    }

    function getNumberOfPartsOfType(creep, partType, energyBudget) {
        let cost = COSTS[partType]
        let buildComponentPercentageAllocation = creep.priorities[partType] || 0
        let result = Math.floor((energyBudget * (buildComponentPercentageAllocation / 100)) / cost)
        return result = isFinite(result) ? result : 0
    }

    function determineCreepPrioritiesBasedOnCurrentSituation(creepName, energyHarvestStrategy, resourceInventory, hostilesInventory) {
        let creep = creepGroups[creepName]
        if (creep.type == "worker") { // creeps that perform infrastructure and resource tasks
            if (creepName == "Resource-Hauler") { // Maximizes carry capacity, moderate to low movement, minimal work capacity
                creep.priorities['CARRY'] = 75;
                creep.priorities['MOVE'] = 25;
            }
            if (creepName == "Harvester-Miner") { // Maximizes work capacity, no carry capacity, minimal mobility
                console.log(`🚀 ~ file: creep.specs.v2.js ~ line 129 ~ determineCreepPrioritiesBasedOnCurrentSituation ~ creepName == "Harvester-Miner"`, creepName == "Harvester-Miner")
                if (energyHarvestStrategy == "dynamic") { // dynamic harvesting: creeps harvest energy and carry it to purpose
                    console.log(`🚀 ~ file: creep.specs.v2.js ~ line 131 ~ determineCreepPrioritiesBasedOnCurrentSituation ~ energyHarvestStrategy == "dynamic"`, energyHarvestStrategy == "dynamic")
                    creep.priorities['WORK'] = 50;
                    creep.priorities['CARRY'] = 25;
                    creep.priorities['MOVE'] = 25;
                } else { // static harvesting

                }
            }
            if (creepName == "Engineer") { // works and carries energy, with decent mobility
                creep.priorities['WORK'] = 50;
                creep.priorities['CARRY'] = 25;
                creep.priorities['MOVE'] = 25;
            }
        } else { // warrior class, creeps that perform military functions: scouting, attack and defense
        }
    }

    function subtractMandatoryPartsCosts(creep, energyCapacity) {
        let mandatoryCost = 150
        let type = creep.type
        if (type == "warrior") {
            mandatoryCost = 50
        }
        return remainingEnergyBudget = energyCapacity - mandatoryCost
    }

    const getBodyCost = (body) => _.sum(body, (p) => BODYPART_COST[p]);

    // NOTE: this is where RCL determines which set of creeps gets built - and breaks the program if it does not exist
    // let creepGroups = creepLevelGroups[rcl - 1].specs
    // ENDNOTE

    // for (let component in COSTS) {
    //     console.log(`🚀 ~ file: creep.specs.v2.js ~ line 1186 ~ creepSpecs ~ component`, component)
    //     //     let t = creepType
    //     let cost = COSTS[component]
    //     console.log(`🚀 ~ file: creep.specs.v2.js ~ line 1189 ~ creepSpecs ~ cost`, cost)
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

module.exports = buildCreep
