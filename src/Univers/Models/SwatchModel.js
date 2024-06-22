import { luminanceToWeight } from "../utilities";
import { weights } from "../constants";

export default class SwatchModel {

    constructor(args) {

        const { color, destinationSpace, priority } = args

        if (color) {
            this.color = color;
            this.value = {origin: color.to(color.space.id).toString(), destination: color.to(destinationSpace).toString()}
            this.weight = luminanceToWeight(color.lab.l)
            this.index = weights.findIndex(item => item === this.weight);
            this.priority = (priority ? priority : -1)
        }

    }


}
