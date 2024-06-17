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
        this.destinationSpace = null

        console.log(values)

        this.init = (values) => {
            this.id = index
            this.swatches = Array.apply(null, Array(targets.length)).map(item => null)

            if (typeof values[0] === 'string' || values[0] instanceof String) {
                values = values.map(value => new ColorModel(value))
            }

            this.destinationSpace = values ? values[0].space.id : null

            values.forEach((color, index) => {
                const swatchModel = new SwatchModel(
                    {
                        color: color,
                        destinationSpace: this.destinationSpace,
                        priority: (index === 0 ? 1 : 0)
                    }
                )
                console.log(color, swatchModel)
                this.swatches[swatchModel.index] = swatchModel
            });

        };

        this.init(Array.isArray(values) ? values : []);
        this.insertBlackAndWhite();
        this.tweenSwatches();
    }

    insertBlackAndWhite() {

        if (this.swatches[0] === null) {
            const color = new ColorModel("White");
            this.swatches[0] = new SwatchModel({ color: color, destinationSpace: this.destinationSpace })
        }
        if (this.swatches[21] === null) {
            const color = new ColorModel("Black");
            this.swatches[21] = new SwatchModel({ color: color, destinationSpace: this.destinationSpace })
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
                this.swatches[idx] = new SwatchModel({ color: color, destinationSpace: this.destinationSpace })

            }
        });
    }

    getColors(space) {
        const result = this.swatches.map(swatch => {
            if (!space) return swatch.color
            return swatch.color.as(space)
        });
        return result;
    }
}