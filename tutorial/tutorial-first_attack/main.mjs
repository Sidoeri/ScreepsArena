import { } from 'game/utils';
import { } from 'game/prototypes';
import { ERR_NOT_IN_RANGE } from 'game/constants';
// import { } from 'arena';
import { Creep } from 'game/prototypes';
import { getObjectsByPrototype } from 'game/utils';

export function loop() {
    var myCreep = getObjectsByPrototype(Creep).find(creep => creep.my);
    var enemyCreep = getObjectsByPrototype(Creep).find(creep => !creep.my);
    console.log(enemyCreep.body)

    if(myCreep.attack(enemyCreep) == ERR_NOT_IN_RANGE){
        myCreep.moveTo(enemyCreep)
    }
}
