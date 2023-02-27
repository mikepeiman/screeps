// logic to assess room priorities and assign tasks to creeps


// determine all sources of energy in the room:
// 1. dropped
// 2. ruins
// 3. Sources 
// 4. storage 

// work to be done
// 1. fuel towers (energy) 
// 2a. construction 
// 2b. repairs 
// 2c. upgrade controller 

// determine how many creeps exist, and how many I want

let takeEnergyRuins = creep.room.find(FIND_RUINS, {
    filter: ruin => ruin.store.energy > 0
})