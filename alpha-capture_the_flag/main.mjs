import {getObjectsByPrototype } from 'game/utils';
import { Creep,} from 'game/prototypes';
import { ATTACK, HEAL, RANGED_ATTACK } from 'game/constants';
import { Flag } from 'arena/season_alpha/capture_the_flag/basic/prototypes';

export function loop() {
    var enemyFlag = getObjectsByPrototype(Flag).find(object => !object.my);
    var myCreeps = getObjectsByPrototype(Creep).filter(object => object.my);

    var myHealers = myCreeps.filter(creep => creep.body.some(b => b.type == HEAL));
    var myRangers = myCreeps.filter(creep => creep.body.some(b => b.type == RANGED_ATTACK));;
    var myAttackers = myCreeps.filter(creep => creep.body.some(b => b.type == ATTACK));;

 
    for(var creep of myHealers) {
        creep.moveTo(enemyFlag);
    }
}
