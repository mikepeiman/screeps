let roleWarrior = {
    move: (creep,target) => {
            // creep.say('🏃‍♂️👮‍♂️');
            creep.moveTo(target)    
    },
    attack: (creep,target) => {
        console.log(`warrior ### ${creep} ### assigned to attack target ${target} `, target)
        let hostiles = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        // creep.moveTo(target)
        let attack = creep.attack(target, { dryRun: true})
        console.log("🚀 ~ file: role.warrior.js ~ line 7 ~ attack", attack)

            if (attack == ERR_NOT_IN_RANGE) {
                // creep.say('⚔🏃‍♂️');
                creep.attack(target);
            }
    }
}
module.exports = roleWarrior