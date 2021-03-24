module.exports = {
	run: function (creep) {
		creep.memory.currentRole = 'miner'
		let moveOpts = { visualizePathStyle: { stroke: '#ffaaff' }, reusePath: 3 }
		let minerals = creep.room.find(FIND_MINERALS)
		let mineralType = minerals[0].mineralType
		let totalLoad = creep.store.getUsedCapacity()
		let carryingEnergy = creep.store.getUsedCapacity(RESOURCE_ENERGY)
		let carryingMineral = creep.store.getUsedCapacity(mineralType)
		let nonEnergyLoad = totalLoad - carryingEnergy
		// console.log(`🚀 ~ file: role.miner.js ~ ${creep} ~ totalLoad ${totalLoad} carryingMineral ${carryingMineral} carryingEnergy ${carryingEnergy} type ${carryingMineral.resourceType} and non-energy load ${nonEnergyLoad}`,)

		let storage = creep.room.find(FIND_STRUCTURES, {
			filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store.getFreeCapacity() > 100
		})
		let containers = creep.room.find(FIND_STRUCTURES, {
			filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store.getFreeCapacity() > 100
		})

		// set boolean logic to determine whether creep mines or moves to transfer
		if (creep.store.getFreeCapacity() == 0) {
			// console.log(`🚀 ~ file: role.miner.js ~ line 27 ~ creep.store.getFreeCapacity() == 0`, creep.store.getFreeCapacity())
			creep.memory.mining = false
			creep.memory.currentTask = '⚡ find transfer target'
		} else if (creep.store.getFreeCapacity() > 0 && creep.memory.mining) {
			// console.log(`🚀 ~ file: role.miner.js ~ line 47 ~ creep.store.getFreeCapacity() > 0`, creep.store.getFreeCapacity() > 0)
			creep.memory.mining = true
		} else if (creep.store.getUsedCapacity() == 0) {
			// console.log(`🚀 ~ file: role.miner.js ~ line 35 ~ creep.store.getUsedCapacity() == 0`, creep.store.getUsedCapacity() == 0)
			creep.memory.mining = true
		}

		if (creep.memory.mining) {
			harvest(minerals[0])
		} else {
			// console.log(`✨✨✨ I want to transfer minerals ~ ${creep} `)
			if (storage[0]) {
				transfer(storage[0])
			} else {
				transfer(containers[0])
			}
		}

		function harvest(resource) {
			let x = creep.harvest(resource)
			if (x == ERR_NOT_IN_RANGE) {
				creep.memory.currentTask = '⛏ mining'
				creep.moveTo(resource, moveOpts);
			} else {
				x
			}
		}

		function transfer(toTarget) {
			let x
			if (nonEnergyLoad > 0) {
				x = creep.transfer(toTarget, mineralType)
			} else {
				x = creep.transfer(toTarget, RESOURCE_ENERGY)
			}
			// console.log(`🚀 ~ file: role.miner.js ~~~ ${creep} ~~~ transfer ${mineralType} ~~~ x (-9 == NOT IN RANGE)`, x)
			if (x == ERR_NOT_IN_RANGE) {
				creep.memory.currentTask = '⚒ transfer'
				creep.moveTo(toTarget, moveOpts);
			}
		}

	}
}

