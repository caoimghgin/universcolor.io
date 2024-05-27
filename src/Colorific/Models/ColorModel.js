import Color from 'colorjs.io';
import { colorToHex, percentToEightBit, toCoords, gamutMap, rgbObject } from '../utilities';

export default class ColorModel extends Color {

    constructor(...args) {
        super(...args);
    }

    as(space) {
        if (space === "hex") return colorToHex(this)
        if (space === 'srgb_8bit_array') return percentToEightBit(toCoords(gamutMap(this, "srgb")))
        if (space === 'srgb_8bit') return rgbObject(percentToEightBit(toCoords(gamutMap(this, "srgb"))))
        return this.clone().to(space).toString()
    }
}