How do I decide what creeps to build - and how many?
- If the energy sources are not being fully utilized - how do I determine and track this? How do I predict this proactively?
- If the mineral resource is not being fully utilized - how do I determine, track, and predict this?
- If infrastructure is not being properly maintained - all repairs, and energizing of towers
- If salvage resources are not being efficiently recovered - how do I determine, track, and predict this?
- number of creeps: can be determined by the amount of work required
  - how much work it takes to harvest all energy per source within the refresh time, 
  - + how many build targets there are; and possibly, by how many occupiable units surround them

What is the strategy for static harvesting and mining? How does it work in practice?
I need to get a harvester creep to position itself next to an energy source, and on top of a container
I need to get a hauler creep to transfer from the container to storage, spawn, extensions, and if these are full, to upgrade controller
I need engineer creeps to be taking energy from containers first of all, then storage, and using to prioritize build projects, and to upgrade controller - always have a check on controller/timer to make sure it does not begin to downtick towards downgrade.

How do I colonize a new room?

How do I manage multiple rooms? Control needs to come from rooms primarily, as noted above; to determine type and number of creeps to spawn.

How do I automate the building of roads? 
- Perhaps having a single creep calculate moveTo between all important targets, save those directions, and order road construction at each of them.

How do I automate the building of extensions? 
- There must be a method to find number of available extensions to build that I can check
- There should be some signal when the rom upgrades to a higher RCL; or I can check this intermittently
- 