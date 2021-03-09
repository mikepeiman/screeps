var idleCreep = {
    /** @param {Creep} creep **/
    run: function (creep) {

        // for(flag in Game.flags) {
        //     console.log(`We have these flags: ${flag}`)
        // }
        if(!creep.memory.path) {
            creep.memory.path = creep.pos.findPathTo(Game.flags.Flag1);
        }
        creep.moveByPath(creep.memory.path);
    }
};

module.exports = idleCreep;