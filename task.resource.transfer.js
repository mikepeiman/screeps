module.exports = {
    run: function (creep) {

        let moveOpts = { visualizePathStyle: { stroke: '#00ff00' }, ignoreCreeps: false, reusePath: 3 }
        let energy = creep.room.energyAvailable;
        let energyCapacity = creep.room.energyCapacityAvailable;
        let unusedEnergyCapacity = energyCapacity - energy
        let roomEnergyFull = unusedEnergyCapacity == 0
        creep.memory.task = 'resource-transfer'
        let energySource = false
        let currentResource = ""



        // energy transfer TO targets
        let transferTarget, harvestTarget, currentResources = [], carriedResources = []

        let containerDestinations = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE)
                && s.store.getFreeCapacity() > 0
        })
        // console.log(`🚀 ~ file: task.resource.transfer.js:42 ~ containerDestinations:`, containerDestinations)
        containerDestinations.sort((a, b) => {
            return b.store.getFreeCapacity() - a.store.getFreeCapacity()
        })
        // console.log(`🚀 ~ file: task.resource.transfer.js:43 AFTER SORT ~ containerDestinations:`, containerDestinations)
        transferTarget = containerDestinations[0]

        // resource NOT ENERGY withdraw from targets
        let ruinsWithResources = creep.room.find(FIND_RUINS, {
            filter: r => r.store.getUsedCapacity() > 0
        })
        console.log(`🚀 ~ file: role.resource.mover.js:17 ~ ruinsWithResources:`, ruinsWithResources.length)

        if (ruinsWithResources.length > 0) {

            ruinsWithResources.sort((a, b) => b.store.getUsedCapacity() - a.store.getUsedCapacity())
            let richestRuin = ruinsWithResources[0]
            harvestTarget = richestRuin

            console.log(`🚀 ~ file: task.resource.transfer.js:41 ~ richestRuin:`, richestRuin)
            let store = richestRuin.store
            let ruinResources = Object.keys(store)
            console.log(`🚀 ~ file: task.resource.transfer.js:44 ~ ruinResources:`, ruinResources)
            if (ruinResources.length > 1) {
                ruinResources.forEach(resource => {
                    currentResource = resource
                    currentResources.push(currentResource)
                    console.log(`🚀 ~ file: task.resource.transfer.js:44 ~ resource:`, resource)
                    let amount = richestRuin.store[resource]
                    console.log(`🚀 ~ file: task.resource.transfer.js:46 ~ amount:`, amount)
                })
            } else {
                currentResources = currentResource = ruinResources
            }

            // for (let i = 0; i < ruinsWithResources.length; i++) {
            //     let ruin = ruinsWithResources[i]
            //     // console.log(`🚀 ~ file: task.resource.transfer.js:42 ~ ruin ${ruin} - store ${ruin.store}`, ruin.store.getUsedCapacity())
            //     let k = Object.keys(ruin.store)
            //     if(k.length > 1){
            //         k.forEach(resource => {
            //             // console.log(`🚀 ~ file: task.resource.transfer.js:49 ~ resource:`, resource)
            //             let v = ruin.store[resource]
            //             // console.log(`🚀 ~ file: task.resource.transfer.js:51 ~ v:`, v)
            //         })
            //     }
            //     let v = ruin.store[k]
            //     console.log(`🚀 ~ file: task.resource.transfer.js:77 ~ k ${k}, len ${k.length}: v ${v}` )
            // }
            console.log(`🚀 ~ file: task.resource.transfer.js:55 ~ currentResource:`, currentResource)
            // harvestResourceType = Object.keys(ruinsWithResources[0].store)[0]
            // console.log(`🚀 ~ file: task.resource.transfer.js:51 ~ harvestResourceType:`, harvestResourceType)
        }

        function harvest(resource, harvestResourceType) {
            console.log(`🚀 ~ file: task.resource.transfer.js:78 ~ harvest ~ resource, harvestResourceType:`, resource, harvestResourceType)
            let x = creep.withdraw(resource, `${harvestResourceType}`)
            console.log(`🚀 ~ file: task.resource.transfer.js:80 ~ harvest ~ x:`, x)

            if (x == ERR_NOT_IN_RANGE) {
                // console.log(`🚦⛵ ~ file: role.harvester.js:101 ~ harvest ~ x == ERR_NOT_IN_RANGE:`, x == ERR_NOT_IN_RANGE)
                creep.memory.currentTask = '⚡ harvest'
                creep.moveTo(resource, moveOpts);
            } else if (x !== 0) {
                x
                console.log(`🚩 ~ file: role.harvester.js:107 ~ harvest ~ x:`, x)
            } else {
                x
                carriedResources.push(harvestResourceType)
                console.log(`🚀 ~ file: task.resource.transfer.js:93 ~ harvest ~ carriedResources:`, carriedResources)
                console.log(`✅✨ ~ file: role.harvester.js:110 ~ harvest ~ x:`, x)
            }
        }

        function transfer(toTarget, resourceTypes) {
            creep.store
            console.log(`🚀 ~ file: task.resource.transfer.js:102 ~ transfer ~ creep.store:`, creep.store)
            let keys = Object.keys(creep.store)
            console.log(`🚀 ~ file: task.resource.transfer.js:105 ~ transfer ~ keys:`, keys)
            console.log(`🚀 ~ file: role.resource.mover.js:147 ~ transfer ~ toTarget ${toTarget}, resourceTypes ${resourceTypes}`)
            if (keys.length > 0) {
                keys.forEach(resourceType => {
                    let v = creep.store[resourceType]
                    if(v < 1){
                        console.log(`🚀 ~ file: task.resource.transfer.js:99 ~ transfer ~ v < 1:`, v < 1)
                        resourceTypes.pop()
                        console.log(`🚀 ~ file: task.resource.transfer.js:101 ~ transfer ~ resourceTypes:`, resourceTypes)
                        console.log(`🚀 ~ file: task.resource.transfer.js:101 ~ transfer ~ resourceTypes length ${resourceTypes.length}`)
                        return
                    }
                    let x = creep.transfer(toTarget, `${resourceType}`)
                    console.log(`🚀 ~ file: task.resource.transfer.js:98 ~ transfer ~ resourceType ${resourceType} amount ${v}`)
                    console.log(`🚀 ~ file: task.resource.transfer.js:99 ~ transfer ~ transfer code result ${x}`)
                    creep.moveTo(toTarget, moveOpts);
                })
            } else {
                creep.memory.transferring = false
                console.log(`🚀 ~ file: task.resource.transfer.js:124 ~ transfer ~ keys:`, keys)
                let x = creep.transfer(toTarget, `${keys}`)
                console.log(`🚀 ~ file: role.resource.mover.js:149 ~ transfer ~  x:`, x)
                creep.moveTo(toTarget, moveOpts);
                // if (creep.transfer(toTarget, resourceType) == ERR_NOT_IN_RANGE) {
                //     creep.moveTo(toTarget, moveOpts);
                // }
            }
        }

        // core logic: if creep full, transfer. If not full, harvest
        let creepFull = creep.store.getFreeCapacity() < 1
        console.log(`🚀 ~ file: task.resource.transfer.js:135 ~ creepFull:`, creepFull)
        console.log(`🚀 ~ file: task.resource.transfer.js:137 ~ creep.memory.transferring:`, creep.memory.transferring)
        if (creepFull || creep.memory.transferring === true) {
            creep.memory.transferring = true
            creep.memory.idle = false
            creep.memory.currentTask = '⚡ find transfer target'
            
            console.log(`🚀 ~ file: task.resource.transfer.js:132 ~ carriedResources:`, carriedResources)
            console.log(`🚀 ~ file: task.resource.transfer.js:135 ~ currentResources:`, currentResources)
            transfer(transferTarget, carriedResources)
        } else {
            harvest(harvestTarget, currentResource)
        }
        // if there is are hostiles, get storage energy

        if (creep.memory.transferring == false) {
            // console.log('!creep.memory.transferring: NOT XFER XFER XFER',);
            creep.memory.currentTask = '➕⚡ gather energy'
            if (harvestTarget) {
                // console.log(`🚀 ~ file: role.harvester.js ~ line 145 ~ harvestTarget`, harvestTarget)
                harvest(harvestTarget, currentResource)
            } else {
                creep.memory.idle = true
                console.log(`🚀 ~ file: task.resource.transfer.js:154 ~ creep ${creep} idle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
            }
        }
    }
}


