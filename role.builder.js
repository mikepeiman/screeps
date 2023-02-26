const taskGiveEnergyToStorage = require("./task.give.energy.to.storage");

var roleBuilder = {

	/** @param {Creep} creep **/
	run: function (creep) {
		let moveOpts = { visualizePathStyle: { stroke: '#00aaff' }, range: 1, ignoreCreeps: false, reusePath: 3 }
		let takeEnergyRuins = creep.room.find(FIND_RUINS, {
			filter: ruin => ruin.store.energy > 20
		})
		creep.memory.currentTask = 'build'
		creep.memory.currentRole = 'builder'
		if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.building = false;
		}
		if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
			creep.memory.building = true;
		}
		if (creep.memory.building) {
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if (targets.length) {
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], moveOpts);
				}
			} else {
				taskGiveEnergyToStorage.run(creep)
			}
		} else {
			if (takeEnergyRuins.length > 0) {
				var source = creep.pos.findClosestByPath(takeEnergyRuins);
				console.log(`🚍${creep.name} moving to ${source.pos} for ${source}~ file: role.builder.js:32 ~ source:`)
				if (creep.harvest(source) == ERR_INVALID_TARGET) {
					console.log(`🚀 ~ file: role.builder.js:33 ~ creep.harvest(source) == ERR_INVALID_TARGET:`, creep.harvest(source) == ERR_INVALID_TARGET)
					console.log(`🚀 ~ file: role.builder.js:35 ~ creep.withdraw(source):`, creep.withdraw(source))
					creep.withdraw(source, RESOURCE_ENERGY)
					if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						console.log(`🚀 ~ file: role.builder.js:36 ~ creep.withdraw(source) == ERR_NOT_IN_RANGE:`, creep.withdraw(source) == ERR_NOT_IN_RANGE)
						creep.moveTo(source, moveOpts)
					}
				} else if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
					console.log(`🚀 ~ file: role.builder.js:39 ~ creep.harvest(source) == ERR_NOT_IN_RANGE:`, creep.harvest(source) == ERR_NOT_IN_RANGE)
					creep.moveTo(source, moveOpts)
				}
			} else {

				var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
				if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
					creep.moveTo(source, moveOpts)
				}
			}
		}
	}
};

module.exports = roleBuilder;