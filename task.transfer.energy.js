let gatherEnergy = (creep, takeEnergyTargets, takeEnergySources) => {
    let nearestTarget = creep.pos.findClosestByPath(takeEnergyTargets);
    let nearestSource = creep.pos.findClosestByPath(takeEnergySources);
    if (nearestTarget) {
        console.log(`nearestTarget for energy pickup: `, nearestTarget)
        if (creep.pickup(nearestTarget) == ERR_NOT_IN_RANGE) {
            // move towards the source
            creep.say('⚡🎁');
            creep.moveTo(nearestTarget, { visualizePathStyle: { stroke: '#00aaff' } });
        }
    } else {
        if (creep.harvest(nearestSource) == ERR_NOT_IN_RANGE) {
            // move towards the source
            creep.say('⚡🌻');
            creep.moveTo(nearestSource, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    }
}

