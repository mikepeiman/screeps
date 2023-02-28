let energySources = (creep) => {

    let takeEnergySources = creep.room.find(FIND_SOURCES_ACTIVE)
    // console.log(`FIND_SOURCES_ACTIVE: `, takeEnergySources)

    let takeEnergyTombstones = creep.room.find(FIND_TOMBSTONES, {
        filter: tombstone => tombstone.store.energy > 0
    })

    let takeEnergyDroppedResources = creep.room.find(FIND_DROPPED_RESOURCES, {
        filter: resource => resource.resourceType === RESOURCE_ENERGY
    })

    let takeEnergyRuins = creep.room.find(FIND_RUINS, {
        filter: ruin => ruin.store.energy > 0
    })

    let takeEnergyTargets = [...takeEnergyTombstones, ...takeEnergyDroppedResources, ...takeEnergyRuins]
    console.log('================ module energySources')
    return {
        takeEnergySources: takeEnergySources,
        takeEnergyTargets: takeEnergyTargets
    }
}

module.exports = energySources
