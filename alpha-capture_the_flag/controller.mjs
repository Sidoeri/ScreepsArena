import { getRange, getTicks } from "game/utils";
import { remove_element_from_array } from "./utils";

export class Controller {
    constructor(myCreeps, enemyCreeps, enemyFlag, myFlag, myHealers, myRangers, myAttackers, myTowers, bodyParts) {
        this.myCreeps = myCreeps;
        this.enemyCreeps = enemyCreeps;
        this.enemyFlag = enemyFlag;
        this.myFlag = myFlag;
        this.myHealers = myHealers;
        this.myRangers = myRangers;
        this.myAttackers = myAttackers;
        this.myTowers = myTowers;
        this.bodyParts = bodyParts;
        this.strategy = 'ACTIVE';
                
    }

    determine_enemy_strategy() {
        var enemy_range_from_flag_tick10 = [];
       
            for(let creep of this.enemyCreeps){enemy_range_from_flag_tick10.push(getRange(creep, this.enemyFlag))} 
            let active_ranges = enemy_range_from_flag_tick10.filter(x => x > 5);
            if (active_ranges.length > 3){
                console.log('enemy has active strategy');
                this.strategy = 'PASSIVE';
    
            }else{
                console.log('enemy has passive strategy');
                this.strategy = 'ACTIVE';
            }
     
    }

    run() {

        // towers
        for (let tower of this.myTowers) {
            tower.run(this.enemyCreeps)
        }

        console.log(this.strategy)
        if (getTicks() >10) {
            this.determine_enemy_strategy()
        }
        if (this.strategy == 'ACTIVE') {
            this.run_active_strategy()
        } else if (this.strategy =='PASSIVE') {
            this.run_passive_strategy()
        }

        
    }

    run_active_strategy() {
        console.log('run active strategy')

        // acquire bodyparts
        if (getTicks() <= 1000){
            console.log('acquire body parts')

            // healers
            for (let myHealer of this.myHealers){
                myHealer.run_body_part_phase(this.bodyParts, 100)
            }
            // rangers

            for (let myRanger of this.myRangers) {
                myRanger.run_body_part_phase(this.bodyParts, 100)
            }

            // atackerss
            for (let myAttacker of this.myAttackers) {
                myAttacker.run_body_part_phase(this.bodyParts, 100)
            }


        }else if (getTicks() <= 1050){
            console.log('regroup')
            for (let myHealer of this.myHealers){
                myHealer.creep.moveTo(50, 50);
            }
            for (let myRanger of this.myRangers) {
                myRanger.creep.moveTo(50, 50);
            }
            for (let myAttacker of this.myAttackers) {
                myAttacker.creep.moveTo(50, 50);
            }

        }else{
            //attack
            console.log('attack')

            // healers
            for (let myHealer of this.myHealers){
                myHealer.run(this.myCreeps, this.enemyFlag,);
            }
            // rangers

            for (let myRanger of this.myRangers) {
                myRanger.run(this.enemyCreeps, this.enemyFlag, this.myHealers);
            }

            // atackerss
            for (let myAttacker of this.myAttackers) {
                myAttacker.run(this.enemyCreeps, this.enemyFlag);
            }

            // quads
            // let myQuad1 = build_quad(myAttackers, myRangers, myHealers);
            // myQuad1.run(enemyCreeps, enemyFlag);

            // let myQuad2 = build_quad(myAttackers, myRangers, myHealers);
            // myQuad2.run(enemyCreeps, enemyFlag);
        }
    }

    run_passive_strategy() {
        console.log('run passive strategy')
        const defensive_range = 5;

        let guardian = this.myAttackers[0]
        guardian.creep.moveTo(this.myFlag)
        remove_element_from_array(this.myAttackers, guardian)


        if (getTicks() <= 1500){
            console.log('run defensive strategy')
            // healers
            for (let myHealer of this.myHealers){
                myHealer.run_defensive_strategy(this.myCreeps, this.myFlag, defensive_range);
            }
            // rangers
            for (let myRanger of this.myRangers) {
                myRanger.run_defensive_strategy(this.enemyCreeps, this.myFlag, this.myHealers, defensive_range);
            }

            // atackerss
            for (let myAttacker of this.myAttackers) {
                myAttacker.run_defensive_strategy(this.enemyCreeps, this.myFlag, this.myHealers, defensive_range);
            }
        } else {
            console.log('attack')
            // healers
            for (let myHealer of this.myHealers){
                myHealer.run(this.myCreeps, this.enemyFlag);
            }
            // rangers
            for (let myRanger of this.myRangers) {
                myRanger.run(this.enemyCreeps, this.enemyFlag, this.myHealers);
            }

            // atackerss
            for (let myAttacker of this.myAttackers) {
                myAttacker.run(this.enemyCreeps, this.enemyFlag, this.bodyParts);
            }
        }
    }
}