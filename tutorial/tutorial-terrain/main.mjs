import {getObjectsByPrototype } from 'game/utils';
import {Creep, Flag } from 'game/prototypes';
import { } from 'game/constants';
import { } from 'arena';

export function loop() {
    for(var creep of getObjectsByPrototype(Creep).filter(creep => creep.my)){
        creep.moveTo(creep.findClosestByPath(getObjectsByPrototype(Flag)))
    }
}
