export default class Swatch {
    constructor(weight, value, origin, priority) {
        this.weight = weight;
        this.value = value;
        this.priority = priority === null ? -1 : priority
        this.origin = origin;
        this.wideGamut = !value.inGamut("srgb")
    }
}