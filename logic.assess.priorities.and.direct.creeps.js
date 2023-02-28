// is RCL max level? if not, upgrade using all available energy. If so, harvest and store all excess energy.

// is there energy in ruins or dropped? use that preferentially so it doesn't go to waste.

// ALWAYS CHECK ON CREEP:
// - carrying resources? put them in storage before proceeding to energy task
// - changing tasks? is it carrying energy? how far is energy refill vs. task target? 

// ALWAYS CHECK IN ROOM:
// - hostiles?
// - tower fuel?
// - structures to repair?
// - mineral deposit status? (capacity and renew timing?)
// - energy source status? (capacity and renew timing?)
if(roomEnergySourcesNotExhausted){
    creep.task.harvest()
}

if(energyDroppedOrDerelict){
    creep.task.collectEnergy()
}

if(towerNeedsRefuelling) {
    creep.task.refuelTower()
}