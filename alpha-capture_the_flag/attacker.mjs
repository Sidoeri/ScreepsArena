import { ERR_NOT_IN_RANGE, TOUGH, ATTACK, MOVE } from 'game/constants';
import { superCreep } from './superCreep.mjs';
import { remove_element_from_array } from './utils.js';

export class Attacker extends superCreep {
    constructor(creep) {
        super(creep);
        this.target = undefined;
    }

    run_body_part_phase(bodyParts, range){
        let bodyPart = this.search_for_bodyParts(bodyParts, [TOUGH, ATTACK, MOVE], range)
        if (bodyPart) {
            this.acquire_bodyPart(bodyPart)
            remove_element_from_array(bodyParts, bodyPart)
            return
        }
    }

    run(enemyCreeps, enemyFlag, common_target) {
        if(common_target){
            this.target = common_target
            console.log('attacker ', this.creep.id, 'attack enemy', this.target.id)
            this.attack_target()
      //  if (enemyCreeps.length > 0){
      //      let target = this.choose_target_by_path(enemyCreeps)
     //       this.attack_target()
        }else {this.creep.moveTo(enemyFlag)
        console.log('attacker ', this.creep.id, 'moving to  enemy flag')}
        }

    run_defensive_strategy(enemyCreeps, myFlag, myHealers, range) {
        if (!this.assess_health()) {
            this.move_to_nearest_healer(myHealers)
        } 
        if (this.creep.getRangeTo(myFlag) > range) {
            this.creep.moveTo(myFlag);
        }else {
            let target = this.choose_target_by_path(enemyCreeps) ;
            if (this.target.getRangeTo(myFlag) < range+5){
                this.attack_target();
            }
            
            
            
        }
    }



 
}