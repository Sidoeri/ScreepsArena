import { TOWER_RANGE } from "game/constants";
import { StructureTower } from "game/prototypes";

export class Tower extends StructureTower {
    constructor(tower){
        super();
        this.tower = tower;
        this.max_tower_range = 10;
        this.target = undefined;
    }

    run(enemyCreeps, common_target) {
        if(common_target){
            this.target = common_target
            console.log('tower ', this.tower.id, ': attack common_target ', this.target.id)
            this.attack_target()}
        else if (enemyCreeps.length > 0) {
            let target = this.choose_target_by_range(enemyCreeps);
            this.attack_target()
        }
    }

    choose_target_by_range(enemyCreeps) {
        this.target = this.tower.findClosestByRange(enemyCreeps);
        return this.target
    }

    attack_target() {
        if (this.tower.getRangeTo(this.target) <= TOWER_RANGE && this.tower.getRangeTo(this.target) <= this.max_tower_range) {
            this.tower.attack(this.target)
        }
    }
}