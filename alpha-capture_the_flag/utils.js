import { getRange, getTicks } from "game/utils";

export function remove_element_from_array(array, element) {
    const index = array.indexOf(element);
    const new_array = array.splice(index, 1);
    return new_array
}

export function get_object_position(object) {
    var x = object.x
    var y = object.y
    return [x, y]
}


