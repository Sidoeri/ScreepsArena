import { ERR_NOT_IN_RANGE, TOUGH, ATTACK, MOVE } from 'game/constants';
import { superCreep } from './superCreep.mjs';
import { remove_element_from_array } from './utils.js';

export class Attacker extends superCreep {
    constructor(creep) {
        super(creep);
        this.target = undefined;
    }

    run(enemyCreeps, enemyFlag, bodyParts) {
        let bodyPart = this.search_for_bodyParts(bodyParts, [TOUGH, ATTACK, MOVE])
        if (bodyPart) {
            this.acquire_bodyPart(bodyPart)
            remove_element_from_array(bodyParts, bodyPart)
            return
        }
        if (enemyCreeps.length > 0){
            let target = this.choose_target_by_path(enemyCreeps) 
            this.attack_target()
        }else (this.creep.moveTo(enemyFlag))
    }



 
}