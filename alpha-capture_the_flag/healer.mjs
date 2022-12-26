import { ERR_NOT_IN_RANGE, TOUGH, HEAL, MOVE } from 'game/constants';
import { Creep,} from 'game/prototypes';
import { getObjectsByPrototype } from 'game/utils';
import { superCreep } from './superCreep.mjs';
import { remove_element_from_array } from './utils.js';


// healer class
export class Healer extends superCreep {
    constructor(creep) {
        super(creep);
        this.target = undefined;
    }

    run(myCreeps, enemyFlag, bodyParts) {
        let bodyPart = this.search_for_bodyParts(bodyParts, [TOUGH, HEAL, MOVE])
        if (bodyPart) {
            this.acquire_bodyPart(bodyPart)
            remove_element_from_array(bodyParts, bodyPart)
            return
        }

        if (this.choose_target_by_path(myCreeps)){
            this.heal_target()
        }else{
            this.creep.moveTo(enemyFlag)
        }
    }

    choose_target_by_path(myCreeps) {
        var myDamagedCreeps = myCreeps.filter(i => i.my && i.hits < i.hitsMax)
        this.target = this.creep.findClosestByPath(myDamagedCreeps);
        return this.target
    }

    heal_target() {
        if (this.creep.heal(this.target) == ERR_NOT_IN_RANGE){
            this.creep.moveTo(this.target);
        }
    }
}