var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.memory.currentRole = 'upgrader'

        creep.memory.currentTask = '⚡ upgrade room controller'

        // was busy upgrading, but ran out of energy
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            // creep.say('🔄 harvest');
	    }

        // was not upgrading, but has reached full energy capacity - time to upgrade
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }
        let rc = creep.room.controller
        let upgrade = creep.upgradeController(rc)
	    if(creep.memory.upgrading) {
            if(upgrade == ERR_NOT_IN_RANGE) {
                creep.say('⚡!');
                creep.moveTo(rc, {visualizePathStyle: {stroke: '#ffffff'}});
            } else {
                upgrade
                creep.say('⚡⚡');
            }
        }
        else {
            let sources = creep.room.find(FIND_SOURCES_ACTIVE);
            let targetSource
            for(source in sources) {
            console.log("🚀 ~ file: role.upgrader.js ~ line 29 ~ source in sources", source, sources)
                if(source.energy == source.energyCapacity) {
                    console.log("🚀 ~ file: role.upgrader.js ~ line 32 ~ source.energy == source.energyCapacity", source.energy == source.energyCapacity)
                    targetSource = source
                } else {
                    targetSource = creep.pos.findClosestByPath(sources);
                }
            }
 
            if (creep.harvest(targetSource) == ERR_NOT_IN_RANGE) {
                // move towards the targetSource
                creep.say('🔄 harvest');
                creep.moveTo(targetSource, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }   
	}
    
};

module.exports = roleUpgrader;