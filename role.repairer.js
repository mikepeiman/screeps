var roleRepairer = {

	/** @param {Creep} creep **/
	run: function (creep) {

		// if(creep.room.controller) {
		// 	if(creep.signController(creep.room.controller, "Mostly peaceful warrior for truth, health and freedom.") == ERR_NOT_IN_RANGE) {
		// 		creep.moveTo(creep.room.controller);
		// 	}
		// }
        let moveOpts = { visualizePathStyle: { stroke: '#00ffaa' }, reusePath: 3 }
		creep.memory.currentRole = 'repairer'
		if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.repairing = false;
			// creep.say('🔄 harvest');
		}
		if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
			creep.memory.repairing = true;
			// creep.say('🔨 repair');
		}

		let structureToRepair = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART
		});
		// console.log(`repairer module --- structureToRepair: `, structureToRepair)

		if (creep.memory.repairing) {
			if (structureToRepair != 'undefined') {
				// console.log(`structureToRepair ${structureToRepair} exists! We should be working ${creep}`)
				if (creep.repair(structureToRepair) == ERR_NOT_IN_RANGE) {
					// move towards it
					// creep.say('🔨 repair');
					creep.moveTo(structureToRepair, moveOpts);
				} else {
					// creep.say(`🔨!`);
					creep.repair(structureToRepair)
				}
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
}

module.exports = roleRepairer;