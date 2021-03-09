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

{
    "takeEnergySources": [
        {
            "room":
            {
                "name": "W6N53",
                "energyAvailable": 425,
                "energyCapacityAvailable": 550,
                "visual": { "roomName": "W6N53" }
            },
            "pos": { "x": 5, "y": 9, "roomName": "W6N53" },
            "id": "5bbcac869099fc012e6359ee",
            "energy": 2216,
            "energyCapacity": 3000,
            "ticksToRegeneration": 162
        },
        {
            "room":
                { "name": "W6N53", "energyAvailable": 425, "energyCapacityAvailable": 550, "visual": { "roomName": "W6N53" } }, "pos": { "x": 29, "y": 20, "roomName": "W6N53" }, "id": "5bbcac869099fc012e6359f0", "energy": 2436, "energyCapacity": 3000, "ticksToRegeneration": 244
        }
    ],
        "takeEnergyTargets": [
            {
                "room":
                    { "name": "W6N53", "energyAvailable": 425, "energyCapacityAvailable": 550, "visual": { "roomName": "W6N53" } }, "pos": { "x": 9, "y": 13, "roomName": "W6N53" }, "id": "6046a71185ea2de4c88c6a96", "energy": 56, "amount": 56, "resourceType": "energy"
            },
            {
                "room":
                    { "name": "W6N53", "energyAvailable": 425, "energyCapacityAvailable": 550, "visual": { "roomName": "W6N53" } }, "pos": { "x": 25, "y": 32, "roomName": "W6N53" }, "id": "6043cfa141da55e8d43230cc", "destroyTime": 26133888, "ticksToDecay": 433997, "store": { "energy": 300 }, "structure": { "id": "6042688641da553a853200d1", "hits": 0, "hitsMax": 5000, "structureType": "spawn", "owner": { "username": "Screeps" }, "my": false }
            },
            { "room": { "name": "W6N53", "energyAvailable": 425, "energyCapacityAvailable": 550, "visual": { "roomName": "W6N53" } }, "pos": { "x": 12, "y": 14, "roomName": "W6N53" }, "id": "604613c541da55d4f43271f2", "destroyTime": 26186469, "ticksToDecay": 486578, "store": { "energy": 88 }, "structure": { "id": "6046116e3db96f1adf7fcb4d", "hits": 0, "hitsMax": 5000, "structureType": "spawn", "owner": { "username": "Screeps" }, "my": false } },
            { "room": { "name": "W6N53", "energyAvailable": 425, "energyCapacityAvailable": 550, "visual": { "roomName": "W6N53" } }, "pos": { "x": 25, "y": 20, "roomName": "W6N53" }, "id": "6042688641da5541363200d0", "destroyTime": 26101072, "ticksToDecay": 1181, "store": { "energy": 300 }, "structure": { "id": "603fa791c930f4ca0e0a5317", "hits": 0, "hitsMax": 5000, "structureType": "spawn", "owner": { "username": "Rusmolot" }, "my": false } }
        ]
}
