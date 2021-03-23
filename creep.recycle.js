// SUICIDE CODE! works great
const recycleCreep = (creep, spawn) => {
    if (spawn.pos.inRangeTo(creep.pos.x, creep.pos.y, 1)) {
        creep.say("Recycle me 🔁")
        spawn.recycleCreep(creep)
    } else {
        creep.moveTo(spawn)
    }
}
module.exports = recycleCreep
