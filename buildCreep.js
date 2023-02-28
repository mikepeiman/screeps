let buildCreep = (energyCapacity) => {
// console.log(`🚀⛲⛲⛲⛲⛲⛲⛲⛲⛲⛲ ~ file: buildCreep.js:2 ~ buildCreep ~ energyCapacity:`, energyCapacity)

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
    let CREEP_TYPES = {
        // Resource-Hauler maximizes carry capacity, moderate to low movement, minimal work capacity
        'Resource-Hauler': {
            name: 'Resource-Hauler',
            type: 'worker',
            has: 0,
            wants: 0,
            priorities: {
                'WORK': 1,
                'CARRY': 75,
                'MOVE': 25,
            },
            composition: {},
            blueprint: []
        },
        // Dynamic-Harvester-Miner balances work capacity, carry capacity, and mobility
        'Dynamic-Harvester-Miner': {
            name: 'Dynamic-Harvester-Miner',
            type: 'worker',
            role: 'harvester',
            has: 0,
            wants: 0,
            priorities: {
                'WORK': 50,
                'CARRY': 25,
                'MOVE': 25,
            },
            composition: {},
            blueprint: []
        },
        // Static-Harvester-Miner maximizes work capacity, no carry capacity, minimal mobility
        'Static-Harvester-Miner': {
            name: 'Static-Harvester-Miner',
            type: 'worker',
            role: 'miner',
            has: 0,
            wants: 0,
            priorities: {
                'WORK': 90,
                'CARRY': 10,
                'MOVE': 1,
            },
            composition: {},
            blueprint: []
        },
        'Resourcer-Mover': {
            name: 'Resourcer-Mover',
            type: 'worker',
            role: 'resources',
            has: 0,
            wants: 1,
            priorities: {
                'WORK': 1,
                'CARRY': 78,
                'MOVE': 21,
            },
            composition: {},
            blueprint: []
        },
        // Engineers work and carry energy, with decent mobility
        'Engineer-Repairer': {
            name: 'Engineer-Repairer',
            type: 'worker',
            role: 'repairer',
            has: 0,
            wants: 1,
            priorities: {
                'WORK': 50,
                'CARRY': 25,
                'MOVE': 25,
            },
            composition: {},
            blueprint: []
        },
        // Engineers work and carry energy, with decent mobility
        'Engineer-Salvager': {
            name: 'Engineer-Salvager',
            type: 'worker',
            role: 'salvager',
            has: 0,
            wants: 5,
            priorities: {
                'WORK': 50,
                'CARRY': 25,
                'MOVE': 25,
            },
            composition: {},
            blueprint: []
        },
        'Infantry': {
            name: 'Infantry',
            type: 'warrior',
            role: 'warrior',
            has: 0,
            wants: 0,
            priorities: {
                'WORK': 0,
                'CARRY': 0,
                'MOVE': 1,
            },
            composition: {},
            blueprint: []
        },
        'Paladin': {
            name: 'Paladin',
            type: 'warrior',
            role: 'warrior',
            has: 0,
            wants: 0,
            priorities: {
                'WORK': 0,
                'CARRY': 1,
                'MOVE': 1,
            },
            composition: {},
            blueprint: []
        },
        'Settler': {
            name: 'Settler',
            type: 'claimer',
            role: 'claimer',
            has: 0,
            wants: 0,
            priorities: {
                'WORK': 0,
                'CARRY': 0,
                'MOVE': 1,
                'CLAIM': 1
            },
            composition: {},
            blueprint: []
        }
    }

    for (creepType in CREEP_TYPES) {
        calculateCreepPartsList(creepType)
    }



    function calculateCreepPartsList(creepName) {
        // console.log(`🚀 ~ file: buildCreep.js ~ line 95 ~ calculateCreepPartsList ~ creepName: ${creepName}, energyCapacity: ${energyCapacity}`, creepName)
        let creep = CREEP_TYPES[creepName]
        let type = creep.type
        let energyBudget = subtractMandatoryPartsCosts(creep, energyCapacity)
        generateCreepComposition(creepName, energyBudget)
    }

    function generateCreepComposition(creepName, energyBudget) {
        // console.log(`🚀 ~ file: creep.specs.v2.js ~ line 86 ~ generateCreepComposition ~ creepName`, creepName)
        let creep = CREEP_TYPES[creepName]

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
        // determineCreepPrioritiesBasedOnCurrentSituation(creepName, energyHarvestStrategy, resourceInventory, hostilesInventory)
        for (let component in COSTS) {
            creep.composition[component] = getNumberOfPartsOfType(creep, component, energyBudget)
            // console.log(`🚀 ~ file: buildCreep.js:196 ~ generateCreepComposition ~ ${creep.name}.composition[${component}]:`, creep.composition[component])
        }
        generateCreepBlueprintFromComposition(creep)
    }

    function getBodyCost(blueprint) {
        return _.sum(blueprint, (component) => BODYPART_COST[component])
    }

    function determineTotalFleetWorkCapacity() {
        // I want to adjust the number of creep workers .wants property based on how many work parts they have

    }

    function generateCreepBlueprintFromComposition(creep) {
        // console.log(`starting generateCreepBlueprintFromComposition()`)
        for (let component in creep.composition) {
        }
        let blueprint = []
        for (let component in creep.composition) {
            let counter = 0


            if (creep.composition['TOUGH'] > 0) {
                for (let iterator = 0; iterator < creep.composition['TOUGH']; iterator++) {
                    blueprint.push('tough')
                }
            }
            while (counter < creep.composition[component]) {
                let componentLowercase = `${component.toLowerCase()}`
                if (componentLowercase != 'tough' && componentLowercase != 'heal') {
                    blueprint.push(componentLowercase)
                }
                ++counter
                // creep.blueprint = blueprint
            }
            if (creep.composition['HEAL'] > 0) {
                for (let z = 0; z < creep.composition['HEAL']; z++) {
                    blueprint.push('heal')
                }
            }

        }
        // energyCapacity
        // console.log(`🚀 ~ file: buildCreep.js ~ line 237 ~ generateCreepBlueprintFromComposition ~ energyCapacity`, energyCapacity)
        creep.blueprint = blueprint
        // console.log(`🚀 ~ file: buildCreep.js ~ line 242 ~ generateCreepBlueprintFromComposition ~ blueprint ${creep.name}: `, blueprint)
        creep.cost = getBodyCost(creep.blueprint)
        // console.log(`🚀 ~ file: buildCreep.js ~ line 157 ~ generateCreepBlueprintFromComposition ~ ${creep.name}.cost`, creep.cost)
    }


    function getNumberOfPartsOfType(creep, partType, energyBudget) {
        let cost = COSTS[partType]
        let buildComponentPercentageAllocation = creep.priorities[partType] || 0
        let result = Math.ceil((energyBudget * (buildComponentPercentageAllocation / 100)) / cost)
        if (creep.priorities[partType] == 1) {
            return 1
        }
        return result = isFinite(result) ? result : 0
    }

    function determineCreepPrioritiesBasedOnCurrentSituation(creepName, energyHarvestStrategy, resourceInventory, hostilesInventory) {
        let creep = CREEP_TYPES[creepName]
        let lowercaseName = creepName.toLowerCase()
        console.log(`🚀 ~ file: buildCreep.js ~ line 236 ~ determineCreepPrioritiesBasedOnCurrentSituation ~ lowercaseName`, lowercaseName)
        if (creep.type == "worker") { // creeps that perform infrastructure and resource tasks
            if (creepName == "Resource-Hauler") { // Maximizes carry capacity, moderate to low movement, minimal work capacity
                creep.priorities['CARRY'] = 75;
                creep.priorities['MOVE'] = 25;
                creep.priorities['WORK'] = 1;
            }
            if (creepName == "Dynamic-Harvester-Miner") {
                console.log(`🚀 ~ file: creep.specs.v2.js ~ line 129 ~ determineCreepPrioritiesBasedOnCurrentSituation ~ creepName == "Static-Harvester-Miner"`, creepName == "Static-Harvester-Miner")
                if (energyHarvestStrategy == "dynamic") { // dynamic harvesting: creeps harvest energy and carry it to purpose
                    console.log(`🚀 ~ file: creep.specs.v2.js ~ line 131 ~ determineCreepPrioritiesBasedOnCurrentSituation ~ energyHarvestStrategy == "dynamic"`, energyHarvestStrategy == "dynamic")
                    creep.priorities['WORK'] = 50;
                    creep.priorities['CARRY'] = 25;
                    creep.priorities['MOVE'] = 25;
                } else { // static harvesting

                }
            }

            if (lowercaseName.includes("engineer")) { // works and carries energy, with decent mobility
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

    return CREEP_TYPES
}

module.exports = buildCreep
