var roleRepairer = {

	/** @param {Creep} creep **/
	run: function (creep) {
		// creep.memory.repairing = false;
		creep.memory.currentTask = 'repair'
		if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.repairing = false;
			creep.say('🔄 harvest');
		}
		if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
			creep.memory.repairing = true;
			creep.say('🔨 repair');
		}

		let structureToRepair = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
		});
		// console.log(`repairer module --- structureToRepair: `, structureToRepair)

		if (creep.memory.repairing) {
			if (structureToRepair != 'undefined') {
				// console.log(`structureToRepair ${structureToRepair} exists! We should be working ${creep}`)
				if (creep.repair(structureToRepair) == ERR_NOT_IN_RANGE) {
					// move towards it
					creep.say('🔨 repair');
					creep.moveTo(structureToRepair);
				} else {
					creep.say(`🔨!`);
					creep.repair(structureToRepair)
				}
			}
		}
		else {
			var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
			if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
				// move towards the source
				creep.say('🔄 harvest');
				creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' }, range: 1 })
			} else {
				creep.say('⚡🍓');
			}
		}
	}
};

module.exports = roleRepairer;