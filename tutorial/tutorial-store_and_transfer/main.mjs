import { prototypes, utils, constants } from 'game';
import { RESOURCE_ENERGY } from 'game/constants';

export function loop() {
    var myCreep = utils.getObjectsByPrototype(prototypes.Creep).find(creep => creep.my);
    var enemyCreep = utils.getObjectsByPrototype(prototypes.Creep).find(creep => !creep.my);
    var tower = utils.getObjectsByPrototype(prototypes.StructureTower)[0];
    var container= utils.getObjectsByPrototype(prototypes.StructureContainer)[0];

    console.log(myCreep.store.getFreeCapacity(RESOURCE_ENERGY)); 
    if (myCreep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        if(myCreep.withdraw(container, RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE){
            myCreep.moveTo(container)
        };
    }
    if (myCreep.store.getFreeCapacity(RESOURCE_ENERGY) < myCreep.store.getCapacity(RESOURCE_ENERGY)){
        if(myCreep.transfer(tower, RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE){
            myCreep.moveTo(tower)
        };
    }

    tower.attack(enemyCreep);


}
