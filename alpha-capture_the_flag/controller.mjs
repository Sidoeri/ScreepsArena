import { getRange, getTicks } from "game/utils";

export class Controller {
    constructor(myCreeps, enemyCreeps, enemyFlag, myHealers, myRangers, myAttackers, myTowers, bodyParts) {
        this.myCreeps = myCreeps;
        this.enemyCreeps = enemyCreeps;
        this.enemyFlag = enemyFlag;
        this.myHealers = myHealers;
        this.myRangers = myRangers;
        this.myAttackers = myAttackers;
        this.myTowers = myTowers;
        this.bodyParts = bodyParts;
        this.strategy = 'ACTIVE';
                
    }

    determine_enemy_strategy() {
        var ticks = getTicks();
        var enemy_range_from_flag_tick10 = [];
    
        if (ticks == 10) {
            for(let creep of this.enemyCreeps){enemy_range_from_flag_tick10.push(getRange(creep, this.enemyFlag))} 
            let active_ranges = enemy_range_from_flag_tick10.filter(x => x > 5);
            if (active_ranges.length > 3){
                console.log( ' active_ranges: ',active_ranges);
                console.log('enemy has active strategy');
                this.stragety = 'ACTIVE';
    
            }else{
                console.log('enemy has passove strategy');
                this.stragety = 'PASSIVE';
            }
     
        }
    }

    run() {
        this.determine_enemy_strategy()
        this.run_active_strategy()
    }

    run_active_strategy(){
        
    // towers
    for (let tower of this.myTowers) {
        tower.run(this.enemyCreeps)
    }

    // quads
    // let myQuad1 = build_quad(myAttackers, myRangers, myHealers);
    // myQuad1.run(enemyCreeps, enemyFlag);

    // let myQuad2 = build_quad(myAttackers, myRangers, myHealers);
    // myQuad2.run(enemyCreeps, enemyFlag);

    // healers
    for (let myHealer of this.myHealers){
        myHealer.run(this.myCreeps, this.enemyFlag, this.bodyParts);
    }
    // rangers

    for (let myRanger of this.myRangers) {
        myRanger.run(this.enemyCreeps, this.enemyFlag, this.bodyParts);
    }

    // atackers
    for (let myAttacker of this.myAttackers) {
        myAttacker.run(this.enemyCreeps, this.enemyFlag, this.bodyParts);
    }

    }
}