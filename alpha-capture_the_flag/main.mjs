import {getObjectsByPrototype } from 'game/utils';
import { Creep, StructureTower,} from 'game/prototypes';
import { ATTACK, HEAL, RANGED_ATTACK } from 'game/constants';
import { Flag } from 'arena/season_alpha/capture_the_flag/basic/prototypes';
import { Healer } from './healer.mjs';
import { Ranger } from './ranger.mjs';
import { Attacker } from './attacker.mjs';
import { BodyPart } from 'arena/season_alpha/capture_the_flag/basic';
import { build_quad, Quad } from './quad.mjs';
import { Tower } from './tower.mjs';
import { Controller } from './controller.mjs';

export function loop() {
    var myCreeps = getObjectsByPrototype(Creep).filter(object => object.my);
    var myTowerStructures = getObjectsByPrototype(StructureTower).filter(object => object.my);
    var enemyCreeps = getObjectsByPrototype(Creep).filter(creep =>!creep.my);
    var bodyParts = getObjectsByPrototype(BodyPart);
    var enemyFlag = getObjectsByPrototype(Flag).find(object => !object.my);
    var myFlag = getObjectsByPrototype(Flag).find(object => object.my);

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

    var controller = new Controller(myCreeps, enemyCreeps, enemyFlag, myFlag, myHealers, 
        myRangers, myAttackers, myTowers, bodyParts)
    controller.run()

}
