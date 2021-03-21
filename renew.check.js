const renewCreep = require('renew.creep')
let renewCheck = (creep, spawn) => {
    console.log(`🚀 ~ file: renew.creep.js ~ line 2 ~ renewCheck ~ creep`, creep)
    let ticksToLive = creep.ticksToLive
    console.log(`🚀 ~ file: renew.creep.js ~ line 4 ~ renewCheck ~ ticksToLive`, ticksToLive)
    console.log(`spawning? ${spawn.spawning}`)
    if(ticksToLive < 200 && !spawn.spawning){
        creep.memory.nextTask = "renew"
        creep.memory.lastRole = creep.memory.role
        renewCreep(creep,spawn)
    }
}

module.exports = renewCheck