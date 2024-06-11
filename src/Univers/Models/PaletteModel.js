import ColumnModel from "./ColumnModel";

export default class PaletteModel {

    columns = []

    constructor(args) {
        this.init = (args) => {
            args.forEach((arg, index) => {
                this.columns.push(new ColumnModel(index, arg.semantic, arg.values));
            })
        }
        this.init(Array.isArray(args) ? args : []);
    }

}