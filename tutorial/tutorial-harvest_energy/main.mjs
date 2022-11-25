import { getObjectsByPrototype } from 'game/utils';
import { Creep, Source, StructureSpawn } from 'game/prototypes';
import { ERR_NOT_IN_RANGE, RESOURCE_ENERGY, SOURCE_ENERGY_REGEN } from 'game/constants';
import { } from 'arena';

export function loop() {
    var creep = getObjectsByPrototype(Creep)[0];
    var source = getObjectsByPrototype(Source)[0];
    var spawn = getObjectsByPrototype(StructureSpawn)[0];

    if( creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
        if(creep.harvest(source) == ERR_NOT_IN_RANGE){
            creep.moveTo(source);
    }
    }else{
        if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(spawn);
        }
    }
}
