import ColorModel from "./ColorModel";

export default class SwatchModel {

    constructor(weight, color, origin, priority, root) {

        if (typeof color === 'string' || color instanceof String) {
            this.value = this._color.to(this._color.space.id).toString()
        } else if (color instanceof ColorModel) {
            this._color = color;
        }
        
        this.id = parseInt(weight)
        this.value = this._color.to(this._color.space.id).toString()
        this.weight = weight;
        this.priority = priority === null ? -1 : priority;
        this.origin = origin;
        this.root = root;
        this.wideGamut = !this.color.inGamut("srgb");

    }

    get color() {
        if (!this._color) this._color = new ColorModel(this.value) 
        return this._color
    }

    set color(value) {
        this._color = value;
    }
}

