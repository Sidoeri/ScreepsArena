import { ERR_NOT_IN_RANGE } from "game/constants";
import { Creep } from "game/prototypes";

export class superCreep extends Creep {
    constructor(creep) {
        super();
        this.creep = creep;
    }

    search_for_bodyParts(bodyParts, wanted_bodyParts) {
        let near_bodyParts = this.creep.findInRange(bodyParts, 10);
        
     //    console.log('near bodyparts: ', near_bodyParts);
 
         if (near_bodyParts){
             near_bodyParts = near_bodyParts.filter(item => wanted_bodyParts.includes(item.type));
             let bodyPart = near_bodyParts[0];
             return bodyPart
         }else {
             return false       
         }
     }
 
     acquire_bodyPart(bodyPart) {
         console.log('acquire_bodypart: ',bodyPart);
         this.creep.moveTo(bodyPart)
     }

     choose_target_by_range(enemyCreeps) {
        this.target = this.creep.findClosestByRange(enemyCreeps);
        return this.target
    }

    choose_target_by_path(enemyCreeps) {
        this.target = this.creep.findClosestByPath(enemyCreeps);
        return this.target
    }

    attack_target() {
        if (this.creep.attack(this.target) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(this.target)
        }
    }

    ranged_attack_target() {
        if (this.creep.rangedAttack(this.target) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(this.target)
        }
    }

    
}