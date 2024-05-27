export default class SwatchModel {
    constructor(weight, color, origin, priority) {
        this.weight = weight;
        this.color = color;
        this.priority = priority === null ? -1 : priority
        this.origin = origin;
        this.wideGamut = !color.inGamut("srgb")
    }
}