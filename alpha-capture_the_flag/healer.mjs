import { ERR_NOT_IN_RANGE, TOUGH, HEAL, MOVE, ATTACK,  RANGED_ATTACK } from 'game/constants';
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

    run_body_part_phase(bodyParts, range){
        let bodyPart = this.search_for_bodyParts(bodyParts, [TOUGH, HEAL, MOVE], range)
        if (bodyPart) {
            this.acquire_bodyPart(bodyPart)
            remove_element_from_array(bodyParts, bodyPart)
            return
        }
    }

    run(myCreeps, enemyFlag) {
        if (this.choose_target_by_type_and_path(myCreeps)){
            this.heal_target()
            console.log('healer ', this.creep.id, ' healing creep ', this.target.id)
        }else{
            this.creep.moveTo(enemyFlag)
        }
    }

    choose_target_by_type_and_path(myCreeps,) {
        let myDamagedCreeps = myCreeps.filter(i => i.my && i.hits < i.hitsMax && i.id != this.creep.id)
        let closestDamagedCreeps = this.creep.findInRange(myDamagedCreeps, 7)
        if(closestDamagedCreeps){
            let damagedAttackers = closestDamagedCreeps.filter(creep => creep.body.some(b => b.type == ATTACK))
            let damagedRangers = closestDamagedCreeps.filter(creep => creep.body.some(b => b.type == RANGED_ATTACK))
            let damagedHealers = closestDamagedCreeps.filter(creep => creep.body.some(b => b.type == HEAL))

            if(damagedAttackers[0]){
                this.target = this.creep.findClosestByPath(damagedAttackers)
                console.log('healing an attacker')
            }else if(damagedRangers[0]){
                this.target = this.creep.findClosestByPath(damagedRangers)
                console.log('healing a ranger')
            }else {
                this.target = this.creep.findClosestByPath(damagedHealers)
                console.log('healing a healer')
                    }
        }else{
        this.creep.moveTo(this.creep.findClosestByPath(myDamagedCreeps))}
        this.target = this.creep.findClosestByPath(myDamagedCreeps);
        return this.target
    }

    heal_target() {
        if (this.creep.rangedHeal(this.target) == ERR_NOT_IN_RANGE){
            this.creep.moveTo(this.target);
        }
    }

    run_defensive_strategy(myCreeps, myFlag, range) {
        if (this.creep.getRangeTo(myFlag) > range){
            this.creep.moveTo(myFlag)
        }
        if (this.choose_target_by_path(myCreeps)){


        }
    }
}