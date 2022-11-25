import { } from 'game/utils';
import { } from 'game/prototypes';
import { ERR_NOT_IN_RANGE } from 'game/constants';
// import { } from 'arena';
import { Creep } from 'game/prototypes';
import { getObjectsByPrototype } from 'game/utils';
import { HEAL, ATTACK, RANGED_ATTACK } from 'game/constants';

export function loop() {
    var myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
    var enemyCreep = getObjectsByPrototype(Creep).find(creep => !creep.my);

for( var myCreep of myCreeps){
    if(myCreep.body.some(bodyPart => bodyPart.type == ATTACK)){
        if(myCreep.attack(enemyCreep) == ERR_NOT_IN_RANGE){
            myCreep.moveTo(enemyCreep)
        }
    }
    
    if(myCreep.body.some(bodyPart => bodyPart.type == RANGED_ATTACK)){
        if(myCreep.rangedAttack(enemyCreep) == ERR_NOT_IN_RANGE){
            myCreep.moveTo(enemyCreep)
        }
    }

    for(var creep of myCreeps){
        if(creep.body.some(part => part.hits < 100)){
            var injuredCreep = creep
        }
    }

    if(myCreep.body.some(bodyPart => bodyPart.type == HEAL)){
        if(myCreep.heal(injuredCreep) == ERR_NOT_IN_RANGE){
            myCreep.moveTo(injuredCreep)
        }
    }

}


}