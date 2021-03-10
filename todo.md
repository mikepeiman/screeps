TASKS

* Add level 4 creep models to creepGroups, change RCL calculation (from -2 to -1 for array)
* Refactor creepGroups construction properties (composition) to use # of body parts and algorithmic construction
* refactor all energy collection and energy transfer to task module
* refactor all code so that creep targets are stored to memory, and creeps do not pursue the same target
    * in future, they can calculate if multiple creeps are need at same target or not, eg. dropped energy, does the creep have sufficient capacity to pick it all up on its own or not?
* see if renewing creeps is more efficient than respawning; implement if so
* implement smarter pathing, and path caching, using moveByPath()
* determine how many instances of a given task there are (eg. structures to repair) and assign that many creeps
    * seeing how repairs are currently working in game, I think it best if I make a "repairer" role and have that creep repair-first, and upgrade in its spare time. It's likely that it might even be a fulltime role for a single creep to repair roads