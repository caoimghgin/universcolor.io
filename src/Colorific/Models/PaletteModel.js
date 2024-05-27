import Column from "./ColumnModel";

export default class PaletteModel {

    constructor(colors) {
        this.columns = [];
        this.init = (colors) => {
            colors.forEach(colors => {
                this.columns.push(new Column(colors));
            })
        }
        this.init(Array.isArray(colors) ? colors : []);
    }

    getColors(space) {
        const result = []
        this.columns.forEach(column => {
            result.push(column.getColors(space))
        })
        return result
    }

}