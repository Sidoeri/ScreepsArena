import {getObjectsByPrototype } from 'game/utils';
import { Creep, StructureTower,} from 'game/prototypes';
import { ATTACK, HEAL, RANGED_ATTACK } from 'game/constants';
import { Flag } from 'arena/season_alpha/capture_the_flag/basic/prototypes';
import { Healer } from './healer.mjs';
import { Ranger } from './ranger.mjs';
import { Attacker } from './attacker.mjs';
import { BodyPart } from 'arena/season_alpha/capture_the_flag/basic';
import { build_quad, Quad } from './quad.mjs';
import { determine_enemy_state, remove_element_from_array } from './utils.js';
import { Tower } from './tower.mjs';


export function loop() {
    var myCreeps = getObjectsByPrototype(Creep).filter(object => object.my);
    var myTowerStructures = getObjectsByPrototype(StructureTower).filter(object => object.my);
    var enemyCreeps = getObjectsByPrototype(Creep).filter(creep =>!creep.my);
    var bodyParts = getObjectsByPrototype(BodyPart);
    var enemyFlag = getObjectsByPrototype(Flag).find(object => !object.my);

    var myHealers = [];
    var myRangers = [];
    var myAttackers = [];
    var myTowers = [];

    var healerCreeps = myCreeps.filter(creep => creep.body.some(b => b.type == HEAL));
    var rangerCreeps = myCreeps.filter(creep => creep.body.some(b => b.type == RANGED_ATTACK));
    var attackerCreeps = myCreeps.filter(creep => creep.body.some(b => b.type == ATTACK));

    for(let creep of healerCreeps){myHealers.push(new Healer(creep))};
    for(let creep of rangerCreeps){myRangers.push(new Ranger(creep))};
    for(let creep of attackerCreeps){myAttackers.push(new Attacker(creep))};
    for(let tower of myTowerStructures){myTowers.push(new Tower(tower))};

    determine_enemy_state
    
    (enemyCreeps)

    // towers
    for (let tower of myTowers) {
        tower.run(enemyCreeps)
    }

    // quads
    // let myQuad1 = build_quad(myAttackers, myRangers, myHealers);
    // myQuad1.run(enemyCreeps, enemyFlag);

    // let myQuad2 = build_quad(myAttackers, myRangers, myHealers);
    // myQuad2.run(enemyCreeps, enemyFlag);

    // healers
    for (let myHealer of myHealers){
        myHealer.run(myCreeps, enemyFlag, bodyParts);
    }
    // rangers

    for (let myRanger of myRangers) {
        myRanger.run(enemyCreeps, enemyFlag, bodyParts);
    }

    // atackers
    for (let myAttacker of myAttackers) {
        myAttacker.run(enemyCreeps, enemyFlag, bodyParts);
    }



}
