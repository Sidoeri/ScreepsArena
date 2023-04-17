import { superCreep } from "./superCreep.mjs";


export class Guardian extends superCreep {
    constructor(creep) {
        super(creep.creep);
        this.target = undefined;
    }

    run(enemyCreeps, myFlag) {
        this.creep.moveTo(myFlag)
        let target = this.choose_target_by_path(enemyCreeps) 
        if(target){
            this.creep.rangedAttack(this.target)
        }
        
    }
}