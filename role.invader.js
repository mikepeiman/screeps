let flag = Game.flags.AttackRoom //name of the flag
if (flag) {
    if (flag.room != creep.room) {
        const route = Game.map.findRoute(creep.room, flag.room);
        if (route.length > 0) {
            const exit = creep.pos.findClosestByRange(route[0].exit);
            creep.moveTo(exit);
        }
    }
    else {
        var targetCheck = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
            filter: (c) => {
                return AttackWhitelist.indexOf(c.owner.username)
            }
        });
        if (targetCheck) {
            if (creep.attack(targetCheck) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetCheck
}
        }
    }
}