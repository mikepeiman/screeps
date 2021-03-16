var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.memory.currentRole = 'upgrader'
        creep.memory.currentTask = '⚡ upgrade room controller'
        // creep.memory.upgrading = true
        // was busy upgrading, but ran out of energy
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
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
                creep.say('⚡⚡');
            }
        } else {
            let sources = creep.room.find(FIND_SOURCES_ACTIVE);
            let targetSource
            for (let i in sources) {
                if (sources[i].energy == sources[i].energyCapacity) {
                    targetSource = sources[i]
                } else {
                    targetSource = creep.pos.findClosestByPath(sources);
                }
            }
    
            let x = harvest(targetSource)
            if (x == ERR_NOT_IN_RANGE) {
                creep.say('🔄 harvest');
                creep.moveTo(targetSource, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }   

        function harvest(resource) {
        console.log("🚀 ~ file: role.upgrader.js ~ line 47 ~ harvest ~ resource", resource)
            
            let y = creep.harvest(resource, RESOURCE_ENERGY)
            if (y == ERR_NOT_IN_RANGE) {
                creep.memory.currentTask = '⚡ harvest'
                creep.say('⚡🥾');
                creep.moveTo(resource, { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 25 });
            } 
        }

	}
    
};

module.exports = roleUpgrader;