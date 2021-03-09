var roleBuilder = {

	/** @param {Creep} creep **/
	run: function (creep) {
		creep.memory.currentTask = 'build'
		if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.building = false;
			creep.say('🔄 harvest');
		}
		if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
			creep.memory.building = true;
			creep.say('🚧 build');
		}

		if (creep.memory.building) {
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if (targets.length) {
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
				}
			} else {
				console.log(`Idle builder creep ${creep}`)
				return 'idle'
			}
		}
		else {
			// now harvest:

			// console.log(`What are my energy sources? `, source)
			// // try to harvest energy, if the source is not in range
			// if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
			//     // move towards the source
			//     creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
			// 	creep.moveTo(Game.getObjectById(creep.memory.pathToSource))
			// 	// , { visualizePathStyle: { stroke: '#ffaa00' } });
			// }

			var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
			// if (source) { creep.memory.pathToSource = source.id }


			// if (creep.memory.pathToSource) {
			// 	target = Game.getObjectById(creep.memory.pathToSource)
			// }
			// if (!target) {
			// 	delete creep.memory.pathToSource
			// } else {
				if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
					// move towards the source
					creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' }, range: 1 })
				}
			// }
		}
	}
};

module.exports = roleBuilder;