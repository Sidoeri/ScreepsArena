import { findClosestByRange, findInRange, getObjectsByPrototype } from 'game/utils';
import { Creep, Source, StructureSpawn } from 'game/prototypes';
import { ERR_NOT_IN_RANGE, RESOURCE_ENERGY, SPAWN_ENERGY_CAPACITY, MOVE, WORK, CARRY, ATTACK } from 'game/constants';
import { } from 'arena';

export function loop() {
    var spawn = getObjectsByPrototype(StructureSpawn).find(spawn=>spawn.my)
    var source = getObjectsByPrototype(Source)[0]
    var my_creeps = getObjectsByPrototype(Creep).filter(creep=>creep.my)
    var enemy_creeps = getObjectsByPrototype(Creep).filter(creep=>!creep.my)
 
    console.log('nr_of_enemy_creeps: ', enemy_creeps.length)

    // spawn new creeps
    my_creeps.push(spawn.spawnCreep([MOVE, WORK, CARRY, ATTACK]).object)

     
    for(let my_creep of my_creeps){
        var targetsInRange = findInRange(my_creep, enemy_creeps, 10)
        console.log(' targetsInRange:', targetsInRange)
        if (targetsInRange.length >0){
            // attack enemy creeps
            if (my_creep.attack(targetsInRange[0]) == ERR_NOT_IN_RANGE){
                my_creep.moveTo(targetsInRange[0])
            }
        }else{
            //harvesting
            for(var my_creep of my_creeps){
                if(my_creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                    if(my_creep.harvest(source) == ERR_NOT_IN_RANGE){
                        my_creep.moveTo(source)
                    }
            }else{
                if(my_creep.transfer(spawn,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    my_creep.moveTo(spawn)
                }
            }
            }   
        }

    }





}
