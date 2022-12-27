import { getRange, getTicks } from "game/utils";

export function remove_element_from_array(array, element) {
    const index = array.indexOf(element);
    const new_array = array.splice(index, 1);
    return new_array
}

export function determine_enemy_strategy(enemyCreeps, enemyFlag) {
    var ticks = getTicks()
    var enemy_range_from_flag_tick10 = [];

    if (ticks == 10) {
        for(let creep of enemyCreeps){enemy_range_from_flag_tick10.push(getRange(creep, enemyFlag))} 
        let active_ranges = enemy_range_from_flag_tick10.filter(x => x > 5)
        if (active_ranges.length > 3){
            console.log( ' active_ranges: ',active_ranges)
            console.log('enemy has active strategy')
            return 'ACTIVE'

        }else{
            console.log('enemy has passove strategy')
            return 'PASSIVE'
        }
 
    }
}


