module.exports = {
    run: (creep) => {
        let moveOpts = { visualizePathStyle: { stroke: '#aaffff' }, reusePath: 5 }
        let rc = creep.room.controller
        let upgrade = creep.upgradeController(rc)
        if(upgrade == ERR_NOT_IN_RANGE) {
            creep.moveTo(rc, moveOpts);
        } 
    }
}
