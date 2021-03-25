let roleWarrior = {
    
    move: (creep,target) => {
        let moveOpts = { visualizePathStyle: { stroke: '#ff0000' }, reusePath: 5 }
            // creep.say('🏃‍♂️👮‍♂️');
            creep.moveTo(target, moveOpts)    
    },
    attack: (creep,target) => {
    console.log(`🚀 ~ file: role.warrior.js ~ line 7 ~ creep,target`, creep,target)
        console.log(`warrior ### ${creep} ### assigned to attack target ${target} `, target)
        let hostiles = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        let attack = creep.attack(target)
        console.log(`🚀 ~ file: role.warrior.js ~ line 11 ~ attack`, attack)
            if (attack == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
    }
}
module.exports = roleWarrior