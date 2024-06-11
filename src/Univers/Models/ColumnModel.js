import ColorModel from './ColorModel';
import SwatchModel from './SwatchModel';
import { targets, weights } from '../constants';
import { luminanceToWeight } from '../utilities';

export default class ColumnModel {

    id = 0
    semantic = null
    swatches = []
    stepsDeltaE = 1.5
    stepsSpace = "oklch"

    constructor(index, semantic, values) {

        this.id = index
        this.semantic = semantic
        this.space = null

        this.init = (values) => {
            this.id = index
            this.swatches = Array.apply(null, Array(targets.length)).map(item => null)

            if (typeof values[0] === 'string' || values[0] instanceof String) {
                values = values.map(value => new ColorModel(value))
            }

            this.space = values ? values[0].space.id : null
            values.forEach((color, idx) => {
                const luminance = color.lab.l;
                const weight = luminanceToWeight(luminance);
                const space = color.space.id;
                const index = weights.findIndex(item => item === weight);
                this.swatches[index] = new SwatchModel(weight, color, space, idx, index)
                this.swatches[index].color = null
            });

            //I'd like this constructor to only receive string values and instantiate what it needs here.
            // this.space = new SwatchModel(colors[0]).space.id

        };

        this.init(Array.isArray(values) ? values : []);
        this.insertBlackAndWhite();
        this.tweenSwatches();
        this.swatches.forEach(swatch => swatch.root = this.space)
    }

    // valuesToColorMode

    insertBlackAndWhite() {
        if (this.swatches[0] === null) {
            const color = new ColorModel('lab', [100.0, 0.0, 0.0]);
            const weight = luminanceToWeight(color.lab.l);
            const space = color.space.id;
            const swatch = new SwatchModel(weight, color, space, null);
            this.swatches[0] = swatch
        }
        if (this.swatches[21] === null) {
            const color = new ColorModel('lab', [0.0, 0.0, 0.0]);
            const weight = luminanceToWeight(color.lab.l);
            const space = color.space.id
            const swatch = new SwatchModel(weight, color, space, null);
            this.swatches[21] = swatch
        }
    }

    tweenSwatches() {

        const candidateSwatches = [];
        const tween = this.swatches.filter(swatch => swatch);

        for (let i = 0; i + 1 < tween.length; i++) {
            const start = tween[i].color;
            const stop = tween[i + 1].color;
            const range = ColorModel.range(start, stop, { space: this.stepsSpace, outputSpace: this.stepsSpace });
            const steps = ColorModel.steps(range, { maxDeltaE: this.stepsDeltaE });
            steps.forEach(item => candidateSwatches.push(new ColorModel(this.stepsSpace, item.coords)));
        }

        this.swatches.forEach((swatch, idx) => {
            if (swatch === null) {
                let target = targets[idx]
                target = target !== 50 ? target : target - 0.50;
                target = target !== 60 ? target : target - 1.50;
                target = target !== 65 ? target : target - 2.00;
                target = target !== 70 ? target : target - 1.50;

                target = target !== 97.5 ? target : target - 0.75;
                target = target !== 95.0 ? target : target - 1.00;
                target = target !== 90.0 ? target : target - 1.00;
                target = target !== 5.0 ? target : target + 0.25;
                const color = candidateSwatches.reduce(function (prev, curr) {
                    return Math.abs(curr.lab_d65.l - target) < Math.abs(prev.lab_d65.l - target)
                        ? curr
                        : prev;
                });
                const space = color.space.id;
                const luminance = color.lab_d65.l;
                const weight = luminanceToWeight(luminance);
                this.swatches[idx] = new SwatchModel(weight, color, space, null);
            }
        });
    }

    tweekTarget(target) {
        target = target !== 50 ? target : target - 0.50;
        target = target !== 45 ? target : target - 2.25;
        target = target !== 97.5 ? target : target - 0.75;
        target = target !== 95.0 ? target : target - 1.50;
        target = target !== 90.0 ? target : target - 1.00;
        target = target !== 5.0 ? target : target + 0.25;
        return target
    }

    getColors(space) {
        const result = this.swatches.map(swatch => {
            if (!space) return swatch.color
            return swatch.color.as(space)
        });
        return result;
    }
}