import { ERR_NOT_IN_RANGE, MOVE, TOUGH } from 'game/constants';
import { RANGED_ATTACK } from 'game/constants';
import { superCreep } from './superCreep.mjs';
import { remove_element_from_array } from './utils.js';

export class Ranger extends superCreep {
    constructor(creep) {
        super(creep);
        this.target = undefined;
    }

    run_body_part_phase(bodyParts, range){
        let bodyPart = this.search_for_bodyParts(bodyParts, [TOUGH, RANGED_ATTACK, MOVE], range)
        if (bodyPart) {
            this.acquire_bodyPart(bodyPart)
            remove_element_from_array(bodyParts, bodyPart)
            return
        }
    }

    calculate_ranged_mass_attack_damage(enemyCreeps){
        let nr_creeps_within_3 = this.creep.findInRange(enemyCreeps, 3).length
        let nr_creeps_within_2 = this.creep.findInRange(enemyCreeps, 2).length
        let nr_creeps_within_1 = this.creep.findInRange(enemyCreeps, 1).length

        let damage = ((nr_creeps_within_3 - nr_creeps_within_2)*1 +
            (nr_creeps_within_2 - nr_creeps_within_1)*4 +
            (nr_creeps_within_1*10))

        return damage
        }

    run(enemyCreeps, enemyFlag, myHealers, common_target){
    console.log('run ranger ', this.creep.id)
   // console.log('common_target: ', common_target)
        if(common_target){
            this.target = common_target
            let mass_attack_damage = this.calculate_ranged_mass_attack_damage(enemyCreeps)
            console.log('creep ', this.creep.id, ' mass attack damage: ', mass_attack_damage)
            if (mass_attack_damage > 10){
                this.creep.rangedMassAttack()
                console.log('ranger ', this.creep.id, 'mass attack with damage ', mass_attack_damage)
            } else {this.ranged_attack_target()
            console.log('ranger ', this.creep.id, 'ranged attack enemy', this.target.id)}
      //  if (!this.assess_health()) {
      //      this.move_to_nearest_healer(myHealers)
         }

        //if (enemyCreeps.length > 0){
         //   let target = this.choose_target_by_path(enemyCreeps)
       //     this.ranged_attack_target()
       // }else (this.creep.moveTo(enemyFlag))
    }

    run_defensive_strategy(enemyCreeps, myFlag, myHealers, range, common_target) {
        if (!this.assess_health()) {
            this.move_to_nearest_healer(myHealers)
        } 
        if (this.creep.getRangeTo(myFlag) > range) {
            this.creep.moveTo(myFlag);
        }else {
            if(common_target){
                this.target = common_target
                console.log('ranger ', this.creep.id, ': attack common_target ', this.target.id)}
            else{ let target = this.choose_target_by_path(enemyCreeps)} ;
            if (this.target.getRangeTo(myFlag) < range+5){
                this.ranged_attack_target();
            }
           
        }
    }





}