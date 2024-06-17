import ColorModel from "./ColorModel";
import { luminanceToWeight } from "../utilities";
import { weights } from "../constants";

export default class SwatchModel {

    constructor(args) {

        const { color, destinationSpace, priority } = args

        if (color) {
            this.color = color;
            this.value = color.to(color.space.id).toString()
            this.weight = luminanceToWeight(color.lab.l)
            this.origin = {value: color.to(color.space.id).toString(), space: color.space.id}
            this.destination = {value: color.to(destinationSpace).toString(), space: destinationSpace}
            this.index = weights.findIndex(item => item === this.weight);
            this.priority = (priority ? priority : -1)
        }

    }


}
