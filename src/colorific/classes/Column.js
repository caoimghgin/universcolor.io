// import Color from 'colorjs.io';
import Color from './Color';
import Swatch from './Swatch';
import { targets, weights } from '../constants';
import { luminanceToWeight, gamutMap, colorToHex, toCoords, percentToEightBit } from '../utilities';

export default class Column {
    constructor(values) {
        this.swatches = [];
        this.init = (values) => {
            this.swatches = Array.apply(null, Array(targets.length)).map(
                item => null
            );
            values.forEach((value, idx) => {
                const weight = luminanceToWeight(value.lab.l);
                const index = weights.findIndex(item => item === weight);
                this.swatches[index] = new Swatch(weight, value, value.space.id, idx);
            });
        };
        this.init(Array.isArray(values) ? values : []);
        this.insertBlackAndWhite();
        this.tweenSwatches();
    }

    insertBlackAndWhite() {
        if (this.swatches[0] === null) {
            const value = new Color('lab', [100.0, 0.0, 0.0]);
            const weight = luminanceToWeight(value.lab.l);
            this.swatches[0] = new Swatch(weight, value, value.space.id, null);
        }
        if (this.swatches[21] === null) {
            const value = new Color('lab', [0.0, 0.0, 0.0]);
            const weight = luminanceToWeight(value.lab.l);
            this.swatches[21] = new Swatch(weight, value, value.space.id, null);
        }
    }

    tweenSwatches() {
        const space = 'oklch'
        const candidateSwatches = [];
        const tween = this.swatches.filter(swatch => swatch);

        for (let i = 0; i + 1 < tween.length; i++) {
            const start = tween[i].value;
            const stop = tween[i + 1].value;
            const range = Color.range(start, stop, {
                space: space,
                outputSpace: space,
            });
            const steps = Color.steps(range, { maxDeltaE: 1.5 });
            steps.forEach(item => candidateSwatches.push(new Color(space, item.coords)));
        }

        this.swatches.forEach((swatch, idx) => {
            if (swatch === null) {
                let target = targets[idx];
                target = target !== 50 ? target : target - 0.25;
                const value = candidateSwatches.reduce(function (prev, curr) {
                    return Math.abs(curr.lab.l - target) < Math.abs(prev.lab.l - target)
                        ? curr
                        : prev;
                });
                const weight = luminanceToWeight(value.lab.l);
                this.swatches[idx] = new Swatch(weight, value, value.space.id, null);
            }
        });
    }

    values(space) {
        const result = this.swatches.map(swatch => {
            const color = swatch.value
            if (!space) return color
            return color.as(space)
        });
        return result
    }
}

Column.prototype.getValues = function (options) {
    const result = this.swatches.map(swatch => {
        const color = swatch.value
        if (!options) return color
        return color.as(options.as)
    });
    return result
}