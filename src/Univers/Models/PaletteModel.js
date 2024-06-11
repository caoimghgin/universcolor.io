import ColumnModel from "./ColumnModel";

export default class PaletteModel {

    constructor(colors) {
        this.columns = [];
        this.init = (colors) => {
            colors.forEach((colors, index) => {
                this.columns.push(new ColumnModel(colors, index));
            })
        }
        this.init(Array.isArray(colors) ? colors : []);
    }

}