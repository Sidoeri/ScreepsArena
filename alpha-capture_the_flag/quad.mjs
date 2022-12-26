import { ERR_NOT_IN_RANGE } from "game/constants";
import { remove_element_from_array } from "./utils";

export class Quad {
    constructor(attackerCreep, rangerCreep, healerCreep1, healerCreep2){
        this.leader = attackerCreep;
        this.ranger = rangerCreep;
        this.healer1 = healerCreep1;
        this.healer2 = healerCreep2;
        this.target = undefined
        this.health = 'HEALTHY'
    }

    determine_health() {
        console.log(this.leader.creep)
    }

    run(enemyCreeps,enemyFlag) {
        // this.determine_health()
        this.heal()
        this.moveTo(enemyFlag)
        if (enemyCreeps.length > 0){
            let target = this.choose_target(enemyCreeps) 
            this.attack_target()
        }else {console.log('move to flag')
            this.moveTo(enemyFlag)}

    }

    moveTo(x) {
        this.leader.creep.moveTo(x);
        this.ranger.creep.moveTo(this.leader.creep);
        this.healer1.creep.moveTo(this.leader.creep);
        this.healer2.creep.moveTo(this.ranger.creep)
    }

    heal() {
        if (this.healer1.creep.heal(this.leader.creep) == ERR_NOT_IN_RANGE){
            this.healer1.creep.moveTo(this.leader.creep)
        }
        if (this.healer2.creep.heal(this.ranger.creep) == ERR_NOT_IN_RANGE){
            this.healer2.creep.moveTo(this.ranger.creep)
        }
    }

    choose_target(enemyCreeps) {       
        let target = this.leader.creep.findClosestByPath(enemyCreeps)
        this.target = target
        return target
    }

    attack_target() {
        console.log('attack target')
        if (this.leader.creep.attack(this.target) == ERR_NOT_IN_RANGE) {
            this.leader.creep.moveTo(this.target)
        }
        if (this.ranger.creep.rangedAttack(this.target) == ERR_NOT_IN_RANGE) {
            this.ranger.creep.moveTo(this.target);
        }
    }

}

export function build_quad(attackers, rangers, healers){
    let quad = new Quad(attackers[0], rangers[0], healers[0], healers[1])
    
    remove_element_from_array(attackers, attackers[0])
    remove_element_from_array(rangers, rangers[0])
    remove_element_from_array(healers, healers[0])
    remove_element_from_array(healers, healers[0])

    return quad
}