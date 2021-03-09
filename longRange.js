
// to access first room controller
// Game.rooms['W14N43'].controller

// stray creep builder26172480
// room bottom W14N42

Game.creeps['builder26172480'].memory.path = Game.creeps['builder26172480'].pos.findPathTo(Game.rooms['W14N43'].controller)
Game.creeps['builder26172480'].moveByPath(Game.creeps['builder26172480'].memory.path);