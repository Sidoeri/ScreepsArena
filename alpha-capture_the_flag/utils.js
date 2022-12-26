import { getTicks } from "game/utils";

export function remove_element_from_array(array, element) {
    const index = array.indexOf(element);
    const new_array = array.splice(index, 1);
    return new_array
}

export function determine_enemy_state(enemyCreeps) {
    var ticks = getTicks()
    if (ticks == 1) {
        console.log(enemyCreeps[0])
    }else if (ticks == 10) {
        console.log(enemyCreeps[0])
    }
}


