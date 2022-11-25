import { Creep,} from 'game/prototypes';

// healer class
class Healer extends Creep {
    constructor(target) {
        super();
        this.target = target;
    }

    heal_target(target) {
        if (this.heal(target) == ERR)
    }
}