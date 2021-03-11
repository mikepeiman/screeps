const roleTower = {
    run: (tower, room) => {

        // DEFENSE code
        let hostiles = room.find(FIND_HOSTILE_CREEPS);
        let structuresToRepair = room.find(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
        });
        let wounded = []
        for (creep in Game.creeps) {
            if (creep.hits < creep.hitsMax) {
                wounded.push(creep.id)
            }
        }

        if (hostiles.length > 0) {
            let username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${room}`);
            tower.attack(hostiles[0])
        } else if (wounded.length > 0) {
            // HEAL code
            console.log("🚀 ~ file: role.tower.js ~ line 20 ~ wounded", wounded)
            tower.heal(wounded[0])
        } else if (structuresToRepair.length > 0) {
            // REPAIR code
            tower.repair(structuresToRepair[0]);
        }
    }
}

module.exports = roleTower