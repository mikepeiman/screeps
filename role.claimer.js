let roleClaimer = (name, roomName) => {
    console.log(`roleClaimer module args creep: ${name} target: ${roomName}`)
    let creep = Game.creeps[name]
    let room = Game.rooms[roomName]
    let rc = room.controller
    console.log('roomName controller is: ', rc)
    if(rc) {
        console.log(`claims module, if(rc) `, rc.pos)
        if(creep.reserveController(rc) == ERR_NOT_IN_RANGE) {
            creep.moveTo(rc);
        }
        // claimer-level-3-26194808
        let reserve =creep.reserveController(room.controller)
    }
}

module.exports = roleClaimer