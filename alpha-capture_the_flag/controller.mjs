import { getRange, getTerrainAt, getTicks } from "game/utils";
import { Guardian } from "./guardian.mjs";
import { get_object_position, remove_element_from_array } from "./utils";
import { ATTACK, HEAL, RANGED_ATTACK } from 'game/constants';

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
        this.common_target = undefined;
        this.attacker_target = undefined
        this.ranger_target = undefined
                
    }


    run() {

      //  let guardian = new Guardian (this.myRangers[0])
       // guardian.run(this.enemyCreeps, this.myFlag)
      //  remove_element_from_array(this.myRangers, this.myRangers[0])

        this.determine_attacker_target()
        this.determine_ranger_target()

        // towers
        for (let tower of this.myTowers) {
            tower.run(this.enemyCreeps, this.ranger_target)
        }
        
        console.log(this.strategy)
        if (getTicks() >20) {
            this.determine_enemy_strategy()
        }
        if (this.strategy == 'ACTIVE') {
            this.run_active_strategy()
        } else if (this.strategy =='PASSIVE') {
            this.run_passive_strategy()
        }
    }

    determine_enemy_strategy() {
        var enemy_range_from_flag_tick10 = [];
       
            for(let creep of this.enemyCreeps){enemy_range_from_flag_tick10.push(getRange(creep, this.enemyFlag))} 
            let active_ranges = enemy_range_from_flag_tick10.filter(x => x > 10);
            if (active_ranges.length > 3 && getTicks() <1500){
                console.log('enemy has active strategy');
                this.strategy = 'PASSIVE';
    
            }else{
                console.log('enemy has passive strategy');
                this.strategy = 'ACTIVE';
            }
     
    }

    run_active_strategy() {
        console.log('run active strategy')

        // acquire bodyparts
        if (getTicks() <= 1300){
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


        }else if (getTicks() <= 1400){
            this.regroup()

        }else{
            //attack
            console.log('attack')

            this.attack()
        }
    }

    regroup(){
        console.log('regroup')
        var x = 60
        var y = 20
        let tile = getTerrainAt({x: x, y: y})
        for (let myHealer of this.myHealers){
            myHealer.creep.moveTo(x, y);
        }
        for (let myRanger of this.myRangers) {
            myRanger.creep.moveTo(x, y);
        }
        for (let myAttacker of this.myAttackers) {
            myAttacker.creep.moveTo(x, y);
        }
    }

    run_passive_strategy() {
        console.log('run passive strategy')

       // this.form_defense_formation()

        var closest_enemy = this.myFlag.findClosestByRange(this.enemyCreeps)
        console.log('closest enemy', closest_enemy.id,' range', this.myFlag.getRangeTo(closest_enemy))
        if(!closest_enemy){
            for (let ranger of this.myRangers){
                ranger.creep.moveTo(this.enemyFlag)
            }
        }else if(closest_enemy.getRangeTo(this.myFlag) < 10){
            this.attack()

            }
        
        // const defensive_range = 5;

        // let guardian = this.myAttackers[0]
        // guardian.creep.moveTo(this.myFlag)
        // remove_element_from_array(this.myAttackers, guardian)


        // if (getTicks() <= 1500){
        //     console.log('run defensive strategy')
        //     // healers
        //     for (let myHealer of this.myHealers){
        //         myHealer.run_defensive_strategy(this.myCreeps, this.myFlag, defensive_range);
        //     }
        //     // rangers
        //     for (let myRanger of this.myRangers) {
        //         myRanger.run_defensive_strategy(this.enemyCreeps, this.myFlag, this.myHealers, defensive_range);
        //     }

        //     // atackerss
        //     for (let myAttacker of this.myAttackers) {
        //         myAttacker.run_defensive_strategy(this.enemyCreeps, this.myFlag, this.myHealers, defensive_range);
        //     }
        // } else {
        //     console.log('attack')
        //     // healers
        //     for (let myHealer of this.myHealers){
        //         myHealer.run(this.myCreeps, this.enemyFlag);
        //     }
        //     // rangers
        //     for (let myRanger of this.myRangers) {
        //         myRanger.run(this.enemyCreeps, this.enemyFlag, this.myHealers);
        //     }

        //     // attackers
        //     for (let myAttacker of this.myAttackers) {
        //         myAttacker.run(this.enemyCreeps, this.enemyFlag, this.bodyParts);
        //     }
        // }
    }

    form_defense_formation() {
        var center = this.myFlag;
        var center_x = center.x
        var center_y = center.y

        var position_factor = 1;
        if (center_x > 10) {position_factor = -1}

        for(let i = 0; i < this.myAttackers.length; i++){
            let new_x = center_x +3*position_factor
            let new_y = center_y +(-2 + i)*position_factor
            // console.log('ranger: ', this.myRangers[i].id,'new_x: ', new_x, 'new_y: ', new_y )
            this.myAttackers[i].creep.moveTo(new_x , new_y)
        }

        for(let i = 0; i < this.myHealers.length; i++){
            let new_x = center_x +(-2 +i)*position_factor
            let new_y = center_y +(3 -i)*position_factor
            // console.log('ranger: ', this.myRangers[i].id,'new_x: ', new_x, 'new_y: ', new_y )
            this.myHealers[i].creep.moveTo(new_x , new_y)
        }

        for(let i = 0; i < this.myRangers.length; i++){
            let new_x = center_x +(-1 +i)*position_factor
            let new_y = center_y +(3 -i)*position_factor
            // console.log('ranger: ', this.myRangers[i].id,'new_x: ', new_x, 'new_y: ', new_y )
            this.myRangers[i].creep.moveTo(new_x , new_y)
        }
    }

    attack(){
        console.log('attack')

        // healers
       for (let myHealer of this.myHealers){
            myHealer.run(this.myCreeps, this.enemyFlag,);
        }
/*
        // rangers
        for (let myRanger of this.myRangers) {
            myRanger.run(this.enemyCreeps, this.enemyFlag, this.myHealers, this.ranger_target);
        }

        // attackers
        for (let myAttacker of this.myAttackers) {
            myAttacker.run(this.enemyCreeps, this.enemyFlag, this.attacker_target);
        }*/
    }

   determine_ranger_target() {
            console.log('determine_ranger_target')
            let enemyHealerCreeps = this.enemyCreeps.filter(creep => creep.body.some(b => b.type == HEAL));
            let enemyRangerCreeps = this.enemyCreeps.filter(creep => creep.body.some(b => b.type == RANGED_ATTACK));
            let enemyAttackerCreeps = this.enemyCreeps.filter(creep => creep.body.some(b => b.type == ATTACK));
            if (enemyAttackerCreeps.length > 0){
            console.log('attacker creeps to attack')
              //  this.attacker_target = this.myFlag.findClosestByPath(enemyHealerCreeps)
                this.ranger_target = this.find_with_lowest_hit_points(enemyAttackerCreeps)
                }
            else if (enemyRangerCreeps.length >0){
                this.ranger_target = this.find_with_lowest_hit_points(enemyRangerCreeps)}
            else if (enemyHealerCreeps.length >0){
               this.ranger_target = this.find_with_lowest_hit_points(enemyHealerCreeps)
               }
            else if(this.enemyCreeps.length >0) {
                this.ranger_target = this.enemyCreeps[0]}
            else{this.ranger_target = undefined}
                }

    determine_attacker_target() {
        if(!this.attacker_target){
            let enemyHealerCreeps = this.enemyCreeps.filter(creep => creep.body.some(b => b.type == HEAL));
            let enemyRangerCreeps = this.enemyCreeps.filter(creep => creep.body.some(b => b.type == RANGED_ATTACK));
            let enemyAttackerCreeps = this.enemyCreeps.filter(creep => creep.body.some(b => b.type == ATTACK));

            if (enemyRangerCreeps.length > 0){
              //  this.attacker_target = this.myFlag.findClosestByPath(enemyHealerCreeps)
                this.attacker_target = this.find_with_lowest_hit_points(enemyRangerCreeps)
                }
            else if (enemyAttackerCreeps.length >0){
                this.attacker_target = this.myFlag.find_with_lowest_hit_points(enemyRangerCreeps)}
            else if (enemyAttackerCreeps.length >0){
               this.attacker_target = this.myFlag.find_with_lowest_hit_points(enemyAttackerCreeps)
               }
            else if(this.enemyCreeps.length >0) {
                this.attacker_target = this.enemyCreeps[0]}
            else{this.attacker_target = undefined}
                } }

    find_with_lowest_hit_points(creeps){
       creeps.sort((a, b) => (a.hitsMax - a.hits) - (b.hitsMax - b.hits))
       let wounded_creep = creeps[0]
       if (wounded_creep.hits == wounded_creep.hitsMax){
       let closest_creep = this.myFlag.findClosestByRange(creeps)
       return closest_creep} else{
       return wounded_creep}
    }

                // quads
            // let myQuad1 = build_quad(myAttackers, myRangers, myHealers);
            // myQuad1.run(enemyCreeps, enemyFlag);

            // let myQuad2 = build_quad(myAttackers, myRangers, myHealers);
            // myQuad2.run(enemyCreeps, enemyFlag);
}