import { TOWER_RANGE } from "game/constants";
import { StructureTower } from "game/prototypes";

export class Tower extends StructureTower {
    constructor(tower){
        super();
        this.tower = tower;
        this.taget = undefined
    }

    run(enemyCreeps) {
        if (enemyCreeps.length > 0) {
            let target = this.choose_target_by_range(enemyCreeps);
            this.attack_target()
        }
    }

    choose_target_by_range(enemyCreeps) {
        this.target = this.tower.findClosestByRange(enemyCreeps);
        return this.target
    }

    attack_target() {
        if (this.tower.getRangeTo(this.target) <= TOWER_RANGE) {
            this.tower.attack(this.target)
        }
    }
}