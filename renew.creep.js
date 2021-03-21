let renewCreep = (creep, spawn) => {
    let x = spawn.renewCreep(creep)
    console.log(`spawning? ${JSON.stringify(spawn.spawning)}`)
    if (x != 0) {
        creep.moveTo(spawn)
        console.log(`🚀 ~ file: renew.creep.js ~ ${creep} ~ renewCreep ~ x`, x)
        if (x == "ERR_NOT_IN_RANGE") {
            creep.moveTo(spawn)
            creep.say('🔃')
        }
        if(x == -8){
            creep.memory.role = creep.memory.lastRole
            creep.memory.nextTask = "carry on"
        }
    }
}

module.exports = renewCreep