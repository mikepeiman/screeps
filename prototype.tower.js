StructureTower.prototype.defend = function () {

    let wallQuota = 1000
    let rampartQuota = 1000
    // DEFENSE code
    let hostiles = this.room.find(FIND_HOSTILE_CREEPS, {
        filter: (c) => c.owner.username != "cplive" && c.owner.username != "Brun1L" && c.owner.username != "mrmartinstreet"
    });
    let structuresToRepair = this.room.find(FIND_STRUCTURES, {
        filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
    });
    let walls = this.room.find(FIND_STRUCTURES, {
        filter: (w) => w.structureType == STRUCTURE_WALL && w.hits < wallQuota
    })
    // console.log(`🚀 ~ file: role.tower.js ~ line 17 ~ walls`, walls)
    let ramparts = this.room.find(FIND_STRUCTURES, {
        filter: (r) => r.structureType == STRUCTURE_RAMPART && r.hits < rampartQuota
    })
    // console.log(`🚀 ~ file: role.tower.js ~ line 21 ~ ramparts`, ramparts)
    let wounded = []

    var targets = this.room.find(FIND_STRUCTURES, {
        filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART
    });
    // console.log(`🚀 ~ file: role.tower.js ~ line 25 ~ targets`, targets)

    for (creep in Game.creeps) {
        if (creep.hits < creep.hitsMax) {
            wounded.push(creep.id)
        }
    }

    if (hostiles[0]) {
        let username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room ${room}`);
        this.attack(hostiles[0])
    } else if (wounded[0]) {
        // HEAL code
        console.log("🚀 ~ file: role.this.js ~ line 20 ~ wounded", wounded)
        this.heal(wounded[0])
    } else if (structuresToRepair.length > 0) {
        // REPAIR code
        // this.repair(structuresToRepair[0]);
    } if (ramparts[0]) {
        console.log(`🚀 ~ file: role.tower.js ~ line 39 ~ ramparts.length`, ramparts.length)
        let x = this.repair(ramparts[0]);
        console.log(`🚀 ~ file: prototype.tower.js ~ line 48 ~ x`, x)
    } if (walls[0]) {
        console.log(`🚀 ~ file: role.tower.js ~ line 44 ~ walls.length`, walls.length)
        let x = this.repair(walls[0]);
        console.log(`🚀 ~ file: prototype.tower.js ~ line 52 ~ x`, x)

    }
}


// module.exports = StructureTower