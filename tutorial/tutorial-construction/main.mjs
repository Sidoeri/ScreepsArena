import {createConstructionSite, getObjectsByPrototype, findClosestByPath } from 'game/utils';
import {StructureTower, Creep, StructureContainer, ConstructionSite } from 'game/prototypes';
import {ERR_NOT_ENOUGH_ENERGY, ERR_NOT_IN_RANGE, RESOURCE_ENERGY } from 'game/constants';
import { } from 'arena';

export function loop() {
    const creep = getObjectsByPrototype(Creep).find(i => i.my);
    if(!creep.store[RESOURCE_ENERGY]) {
        const container = findClosestByPath(creep, getObjectsByPrototype(StructureContainer));
        if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(container);
        }
    } else {
        const constructionSite = getObjectsByPrototype(ConstructionSite).find(i => i.my);
        if(!constructionSite) {
            createConstructionSite({x:50,y:55}, StructureTower);
        } else {
            if(creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                creep.moveTo(constructionSite);
            }
        }
    }
}