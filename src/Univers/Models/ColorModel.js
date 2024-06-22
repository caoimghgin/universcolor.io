import Color from 'colorjs.io';
import { colorToHex, percentToEightBit, toCoords, gamutMap, rgbObject } from '../utilities';

export default class ColorModel extends Color {

        // model.color.contrast()
        // if (displayMetric === "wcag21") setValue(model.color.contrast(new Color("White"), "WCAG21").toFixed(1))
        // if (displayMetric === "apcalc_white") setValue(props.model.color.contrast(new Color("#FFFFFF"), "APCA").toFixed(1))
        // if (displayMetric === "apcalc_black") setValue(props.model.color.contrast(new Color("#000000"), "APCA").toFixed(1))
        // if (displayMetric === "ciel*d65") setValue(parseFloat(props.model.color.lab_d65.l).toFixed(1))

    constructor(...args) {
        super(...args);
        this.wcag = this.contrast(new Color("White"), "WCAG21").toFixed(1)
        this.apca_white = this.contrast(new Color("White"), "APCA").toFixed(1)
        this.apca_black = this.contrast(new Color("Black"), "APCA").toFixed(1)
    }

    as(space) {
        if (space === "hex") return colorToHex(this)
        if (space === 'srgb_8bit_array') return percentToEightBit(toCoords(gamutMap(this, "srgb")))
        if (space === 'srgb_8bit') return rgbObject(percentToEightBit(toCoords(gamutMap(this, "srgb"))))
        return this.clone().to(space).toString()
    }
}