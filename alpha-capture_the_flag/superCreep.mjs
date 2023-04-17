import { ERR_NOT_IN_RANGE } from "game/constants";
import { Creep } from "game/prototypes";

export class superCreep extends Creep {
    constructor(creep) {
        super();
        this.creep = creep;
    }

    search_for_bodyParts(bodyParts, wanted_bodyParts, range=10) {
        let near_bodyParts = this.creep.findInRange(bodyParts, range);
        
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

    assess_health() {
        var hit_ratio = this.creep.hits/this.creep.hitsMax
        if (hit_ratio <= 0.8){
            return false
        } else{
            return true
        }

    }

    move_to_nearest_healer(myHealers) {
        //console.log('myHealers: ', myHealers)
        //console.log('creep ', this.creep.id, 'is moving to nearest healer')
        let healerCreeps = myHealers.map(healer => healer.creep)
        let nearest_healer = this.creep.findClosestByPath(healerCreeps)
        //console.log('nearest healer: ', nearest_healer)
        this.moveTo(nearest_healer);
    }

    
}