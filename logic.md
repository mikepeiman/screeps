
# Logic to assess room priorities and assign tasks to creeps

1. assign a creep(s) to energy Sources to extract all energy in each cycle.
   1. at lower RCLs this will be multiple creeps, but preferentially will be a single creep - possibly even one creep for both Sources in a room at high levels (I'm not sure if that is possible or viable)
2. determine room priorities and
   1. assign creep Tasks (from js modules) based on priorities
      1. construction to build
      2. constructions to repair
      3. RCL to upgrade
      4. ruins/dropped resources to transfer to storage
      5. resources to mine
      6. towers to fuel
      7. ramparts to defend
      8. combat to engage in
   2. assign Spawn priorities based on room priorities and creep counts & assignments


## Determine all sources of energy in the room:

1. dropped
2. ruins
3. Sources
4. storage

## Work to be done		

1. fuel towers (energy)
2. split priorities
   1. construction
   2. repairs
   3. upgradecontroller

### Determine how many creeps exist, and how many I want.



### PRIORITIES

* If the room controller is not at max level, I want to upgrade until it is.
* This means that if there is excess energy in storage or ruins, I want to use that, as well as exhausting energy Sources.
