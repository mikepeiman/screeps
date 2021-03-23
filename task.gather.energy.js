let gatherEnergy = (creep, takeEnergyTargets, takeEnergySources) => {
    let nearestTarget = creep.pos.findClosestByPath(takeEnergyTargets);
    let nearestSource = creep.pos.findClosestByPath(takeEnergySources);
    let pickupResult = creep.pickup(nearestTarget)
    let harvestResult = creep.harvest(nearestSource)
    if (nearestTarget) {
        console.log(`nearestTarget for energy pickup: `, nearestTarget)
        if (pickupResult == ERR_NOT_IN_RANGE) {
            // move towards the source
            // creep.say('🎁🚛');
            creep.moveTo(nearestTarget, { visualizePathStyle: { stroke: '#00aaff' } });
        } else {
            if(pickupResult == 0){
                // creep.say('🎁🍓');
            } else {
                // creep.say('🎁???');
            }
        }
    } else {
        if (harvestResult == ERR_NOT_IN_RANGE) {
            // move towards the source
            // creep.say('⚡🚛');
            creep.moveTo(nearestSource, { visualizePathStyle: { stroke: '#ffaa00' } });
        } else {
            if(harvestResult == 0){
                // creep.say('⚡🍓');
            } else {
                // creep.say('⚡???');
            }
        }
    }
}
