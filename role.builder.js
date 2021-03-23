var roleBuilder = {

	/** @param {Creep} creep **/
	run: function (creep) {
		let moveOpts = { visualizePathStyle: { stroke: '#00aaff' }, range: 1, ignoreCreeps: true, reusePath: 3 }
		creep.memory.currentTask = 'build'
		creep.memory.currentRole = 'builder'
		if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.building = false;
			// // creep.say('🔄 harvest');
		}
		if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
			creep.memory.building = true;
			// creep.say('🚧 build');
		}
		if (creep.memory.building) {
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if (targets.length) {
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					// creep.say('🚧 build');
					creep.moveTo(targets[0], moveOpts);
				}
			} else {
				console.log(`Idle builder creep ${creep}`)
				return 'idle'
			}
		}
		else {
			var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
			if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
				// move towards the source
				// creep.say('🔄 harvest');
				creep.moveTo(source, moveOpts)
			} else {
				// creep.say('⚡🍓');
			}
		}
	}
};

module.exports = roleBuilder;