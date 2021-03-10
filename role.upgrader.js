var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // console.log('CPU used enter upgrader.run(): ', Game.cpu.getUsed())
        creep.memory.currentTask = '⚡ upgrade room controller'
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.say('⚡ upgrade');
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            let source, target
            // if(creep.memory.source){
            //     target = Game.getObjectById[creep.memory.source.id]
            // }
            // if(!target) {
            //     delete creep.memory.source
            // }
            // else {
            //     target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            //     creep.memory.source = target
            //     if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
            //         // move towards the source
            //         creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
            //     }
            // }

            target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.say('🔄 harvest');
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
            }

            // console.log(`creep.memory.source ${creep.memory.source}`)
            // console.log(`creep.memory.source target ${target}`)


            // // let s = Game.rooms['W6N53'](FIND_SOURCES_ACTIVE)
            // // console.log(`What are my energy sources? `, source)
            // // try to harvest energy, if the source is not in range
            // if(target) {
            //     if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
            //         // move towards the source
            //         creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
            //     }
            // } else {
            //     if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            //         // move towards the source
            //         creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            //     }
            // }

        }   
        // console.log('CPU used end upgrader.run(): ', Game.cpu.getUsed())
	}
    
};

module.exports = roleUpgrader;