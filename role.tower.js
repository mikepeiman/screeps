const roleTower = {
    run: (tower, room) => {

        // DEFENSE code
        let hostiles = room.find(FIND_HOSTILE_CREEPS);
        if (hostiles.length > 0) {
            let username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${roomName}`);
            towers.forEach(tower => tower.attack(hostiles[0]));
        }
        // HEAL code
        let wounded = []
        for (creep in Game.creeps) {
            if (creep.hits < creep.hitsMax) {
                wounded.push(creep.id)
            }
        }
        if (wounded.length > 0) {
            console.log("🚀 ~ file: role.tower.js ~ line 20 ~ wounded", wounded)
            let username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${roomName}`);
            towers.forEach(tower => tower.attack(hostiles[0]));
        }
        // REPAIR code
        let structuresToRepair = room.find(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
        });
        if (structuresToRepair.length > 0) {
            tower.repair(structuresToRepair[0]);
        }
    }
}

module.exports = roleTower