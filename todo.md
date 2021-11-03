TASKS

<!-- * Add level 4 creep models to creepGroups, change RCL calculation (from -2 to -1 for array) -->
<!-- * Refactor creepGroups construction properties (composition) to use # of body parts and algorithmic construction -->
<!-- * code for every level 2 and up, to determine maximum energy capacity and build creeps accordingly - either have different creep versions within creep.specs, or generate creeps dynamically -->
* "get out of the way!" code for routing: 
  * 1. If a creep is performing a task (eg. build or transfer) and it is blocking another creep, move it to another suitable location to perform that task (can loop through all creeps' move directions and see if there is a location conflict)
  * 2. If a creep's move path is blocked, see how far away - move it closer, at least, so it is ready
* renew creeps rather than let them die (if not boosted, at least)
* check for creep idle, and send them to work if > 10% energy on board && more than 30 ticks to energy source regen
* if creep idle, creep energy empty, and energy sources empty, send to energy source to await regen
* Emergency preparedness: if all my creeps die, code contingency to rebuild from 300 energy (spawn). So, if no creeps exist and total energy < 301, begin there. Also, I can set an "emergency respawn" protocol, using a creep to staticlly withdraw from storage and transfer to spawn & extensions, building bigger creeps at appropriate intervals
* consider passing in a "taskPriority" variable along with creep to each role/task. For example, if hostiles are present in the room, prioritize energizing towers; withdraw energy from storage for this purpose. 
* I need to do more than direct a crowd of creeps to a priority target - this results in powering towers and spawning no replacement creeps, and running out of creeps. I need to allocate one to the task, but only as much as needed.

* Take neighboring room W7N53, target RC ID # 5bbcac7a9099fc012e635853 at 28, 8

* set a priority array, spawn array[0] preferentially
* determine total amount of energy required for construction jobs, spawn # builders accordingly

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
* if energy is out at one source, and there is energy at the other, calculate how long until regeneration for the one that is out; if more than x ticks, send creeps over to the other source. Also, if both sources are exhausted, and there are more than x ticks until regeneration, send partially-filled creeps out to work, saving time
* combine salvage-repair roles - this is a good synergy, can handle it with a single creep
* establish code for renewing creeps, instead of letting them die
* if creeps are idle for more than x ticks (like, 3-10 depending on situation) retask - harvesters with >0 energy can transfer
* code for creep production based on available max energy stores - so you never lose an energy store and then have no creeps able to be built
* when energy storage (extensions) are being built, that messes up unusedEnergyCapacity until they are built - no upgrading will happen
* make a new creep construction function that works based off total energy levels, and uses percentages for components 

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
