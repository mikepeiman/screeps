TASKS

<!-- * Add level 4 creep models to creepGroups, change RCL calculation (from -2 to -1 for array) -->
<!-- * Refactor creepGroups construction properties (composition) to use # of body parts and algorithmic construction -->
* refactor all energy collection and energy transfer to task module
* refactor all code so that creep targets are stored to memory, and creeps do not pursue the same target
    * in future, they can calculate if multiple creeps are need at same target or not, eg. dropped energy, does the creep have sufficient capacity to pick it all up on its own or not?
* see if renewing creeps is more efficient than respawning; implement if so
* implement smarter pathing, and path caching, using moveByPath()
* determine how many instances of a given task there are (eg. structures to repair) and assign that many creeps
    * seeing how repairs are currently working in game, I think it best if I make a "repairer" role and have that creep repair-first, and upgrade in its spare time. It's likely that it might even be a fulltime role for a single creep to repair roads
* get tower coded for both defense and repair, and creep healing
* more complex logic: if there is a spawn queue, and if there is less energy required than the full capacity of a harvesting creep, and if there is no creep already tasked with filling spawn-and-extensions capacity, then this creep should harvest only as much as needed to fill spawn & extensions, and then go fill them
* get discrete logic to check creep timers and renew them (does not have to happen often as they all have a set lifespan of 1500 ticks)
* begin mining resource

===

Another possible schema for organizing my colony:
Creep composition =                         creep.memory.buildType      (descriptive)
Creep current role =                        creep.memory.currentRole    (descriptive)
Creep current task =                        creep.memory.currentTask    (descriptive)
Creep subtask, micro task, next action =    creep.memory.nextAction     (descriptive)
Creep next destination =                    creep.memory.moveTarget     (object id)
Creep next action target =                  creep.memory.actionTarget   (object id)

Perhaps when I assign a creep a role/task, I run a function to set all other tasks to false, or delete them entirely. function clearRoles(creep)

===

Consider: Organize take-energy targets at a room level. This way I can dispatch creeps to the appropriate sources; for example, I could store a permanent ID reference to each energy source, and send only the maximum number of creeps there at a time.
I could look for tombstones and ruins, and dropped energy, and dispatch creeps to pick that up, the first creep (generalist/harvester) available.
>>> If I do this, it dramatically simplifies my role modules, and I like that. It will be a single module for pickup dropped energy, one for tombstone, etc. The creeps will cache their target ad save CPU.

=== 
Q: Game logic and code organization: should I switch roles for creeps from within main.js, or should I do that within the roles modules?
A: For now, it seems to make the most sense to do this within role modules.
