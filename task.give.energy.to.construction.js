module.exports = {
    run: (creep, targets) => {
        console.log(`🚀 ~ file: task.fill.room.energy.js ~ line 18 ~ creep`, creep)
        let moveOpts = { visualizePathStyle: { stroke: '#aaffff' }, reusePath: 5 }
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], moveOpts);
        }
    }

}



