let roleClaimer = {
    run: (creep, roomName) => {
        console.log(`roleClaimer module args creep: ${creep} target: ${roomName}`)
        // let creep = Game.creeps[name]
        // let room = Game.rooms[`'${roomName}'`]
        let room = new RoomPosition(28, 8, roomName)
        console.log(`🚀 ~ file: role.claimer.js ~ line 6 ~ room`, room)
        // let rc = room2.controller
        // console.log('roomName controller is: ', rc)
                    var costs = new PathFinder.CostMatrix;
                    // room.find(FIND_CREEPS).forEach(function (creep) {
                    //     if (creep.owner === 'Source Keeper') {
                    //         for (let i = creep.pos.y - 2; i <= creep.pos.y + 2; i++) {
                    //             for (let j = creep.pos.x - 2; j <= creep.pos.x + 2; j++) {
                    //                 costs.set(j, i, 0xff)
                    //             }
                    //         }
                    //     }
                    // });
                    // return costs;


        if (room) {
        console.log(`🚀 ~ file: role.claimer.js ~ line 24 ~ room`, room)

            if (creep.moveTo(room) == ERR_NOT_IN_RANGE) {
                console.log(`moving to room`)
                // creep.say('Claim...🚩')
                creep.moveTo(room, { visualizePathStyle: { stroke: '#ffaa00' }})
            }
            // if (creep.reserveController(rc) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(room, { visualizePathStyle: { stroke: '#ffaa00' }});
            //     // creep.say('Claim...🚩')
            // }
            // claimer-level-3-26194808
            let reserve = creep.reserveController(room.controller)
        }
    }
    // @cplive's code for avoiding roomkeepers
    // if(creep.pos.roomName === W6N54) {
    //     console.log(PathFinder.search(new RoomPosition(1, 23, 'W16N54'), new RoomPosition(14, 1, 'W16N53'),
    //         {
    //             plainCost: 2, swampCost: 10, roomCallback: function (roomName) {
    //                 var room = Game.rooms[roomName];
    //                 if (!room) return; else debug(room);
    //                 var costs = new PathFinder.CostMatrix;
    //                 room.find(FIND_CREEPS).forEach(function (creep) {
    //                     if (creep.owner === 'Source Keeper') {
    //                         for (let i = creep.pos.y - 2; i <= creep.pos.y + 2; i++) {
    //                             for (let j = creep.pos.x - 2; j <= creep.pos.x + 2; j++) {
    //                                 costs.set(j, i, 0xff)
    //                             }
    //                         }
    //                     }
    //                 });
    //                 return costs;
    //             }
    //         }))
    // }
}

module.exports = roleClaimer

