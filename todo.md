TASKS

* Add level 4 creep models to creepGroups, change RCL calculation (from -2 to -1 for array)
* Refactor creepGroups construction properties (composition) to use # of body parts and algorithmic construction
* refactor all energy collection and energy transfer to task module
* refactor all code so that creep targets are stored to memory, and creeps do not pursue the same target
    * in future, they can calculate if multiple creeps are need at same target or not, eg. dropped energy, does the creep have sufficient capacity to pick it all up on its own or not?