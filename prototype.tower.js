// const minBy = require('./method.minby.js')

StructureTower.prototype.defend = function () {


    let wallQuota = 50000
    let rampartQuota = 50000
    let emergencyThreshold = 1000
    // DEFENSE code
    let hostiles = this.room.find(FIND_HOSTILE_CREEPS, {
        filter: (c) => c.owner.username != "cplive" && c.owner.username != "Brun1L" && c.owner.username != "mrmartinstreet"
    });
    let walls = this.room.find(FIND_STRUCTURES, {
        filter: (w) => w.structureType == STRUCTURE_WALL && w.hits < wallQuota
    })
    // console.log(`🚀 ~ file: role.tower.js ~ line 17 ~ walls`, walls)
    let ramparts = this.room.find(FIND_STRUCTURES, {
        filter: (r) => r.structureType == STRUCTURE_RAMPART && r.hits < rampartQuota
    })

    let wallsAndRamparts = this.room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL
    })
    // console.log(`🚀 ~ file: role.tower.js ~ line 21 ~ ramparts`, ramparts)
    let wounded = []

    let priorities = this.room.find(FIND_STRUCTURES, {
        filter: (r) => r.structureType == STRUCTURE_RAMPART && r.hits < emergencyThreshold || r.structureType == STRUCTURE_WALL && r.hits < emergencyThreshold
    })
    wallsAndRamparts = [...walls, ...ramparts]
    highestWallOrRampart = _.max(wallsAndRamparts, s => s.hits)
    lowestWallOrRampart = _.min(wallsAndRamparts, s => s.hits)
    console.log(`🚀 ~ file: prototype.tower.js ~ line 30 ~ lowestWallOrRampart ${lowestWallOrRampart}::: hits ${lowestWallOrRampart.hits}`, )
    // console.log(`🚀 ~ file: prototype.tower.js ~ line 25 ~ priorities`, priorities)
    console.log(`🚀 ~ file: prototype.tower.js ~ line 37 ~ highestWallOrRampart  ${highestWallOrRampart}::: hits ${highestWallOrRampart.hits}`,)
    var otherRepairTargets = this.room.find(FIND_STRUCTURES, {

        filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART
    });

    for (creep in Game.creeps) {
        if (creep.hits < creep.hitsMax) {
            wounded.push(creep.id)
        }
    }

    // REPAIR code
    // repair only if towers have some defense energy in reserve
    let towerEnergy = this.store.getUsedCapacity(RESOURCE_ENERGY)

    // console.log(`🚀 ~ file: prototype.tower.js ~ line 52 ~ towerEnergy`, towerEnergy)
    if (towerEnergy > 200 && !hostiles[0]) {

        // For everything that's not walls and ramparts (g. roads)
        // if (structuresToRepair.length > 0) {
        //      this.repair(structuresToRepair[0]);
        // } 

        // For walls and ramparts
        // if any walls or ramparts are below emergencyThreshold
        if (priorities[0]) {
            let x = this.repair(priorities[0]);
            // console.log(`🚀 ~ file: prototype.tower.js ~ line 48 ~ x`, x)
        } else {
            let x = this.repair(lowestWallOrRampart)
            // if (walls[0]) {
            //     // console.log(`🚀 ~ file: role.tower.js ~ line 44 ~ walls.length`, walls.length)
            //     let x = this.repair(walls[0]);
            //     // console.log(`🚀 ~ file: prototype.tower.js ~ line 52 ~ x`, x)
            // } if (ramparts[0]) {
            //     // console.log(`🚀 ~ file: role.tower.js ~ line 39 ~ ramparts.length`, ramparts.length)
            //     let x = this.repair(ramparts[0]);
            //     // console.log(`🚀 ~ file: prototype.tower.js ~ line 48 ~ x`, x)
            // }
        }
    }

    if (hostiles[0]) {
        let username = hostiles[0].owner.username;
        console.log(`👿👿👿 prototype.tower.jsUser ${username} spotted in room ${this.room}`)
        Game.notify(`User ${username} spotted in room ${this.room}`);
        this.attack(hostiles[0])
    } else if (wounded[0]) {
        // HEAL code
        // console.log("🚀 ~ file: role.this.js ~ line 20 ~ wounded", wounded)
        this.heal(wounded[0])
    }
}


// module.exports = StructureTower