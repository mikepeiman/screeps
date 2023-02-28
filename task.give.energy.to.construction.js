module.exports = {
    run: (creep, targets) => {
        console.log(`🚀 ~ file: task.give.energy.to.construction.js:3 ~ creep, targets:`, creep, targets[0])
        let moveOpts = { visualizePathStyle: { stroke: '#aaffff' }, reusePath: 5 }
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], moveOpts);
        }
    }

}



