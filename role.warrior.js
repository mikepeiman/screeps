let roleWarrior = {
    run: (creep,target) => {
        // console.log(`warrior attack target ${target} `, target)
        target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        creep.moveTo(target)
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            creep.attack(target)
    }
}
module.exports = roleWarrior