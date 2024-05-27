import Color from './ColorModel';
import Swatch from './SwatchModel';
import { targets, weights } from '../constants';
import { luminanceToWeight } from '../utilities';

export default class ColumnModel {

    constructor(colors) {

        this.swatches = [];
        this.stepsDeltaE = 1.0;
        this.stepsSpace = "oklch"              
        // console.log(`${value} -> color-js(L* ${clr.lab_d65.l.toFixed(2)}) / chroma-js(L* ${chr.get('lab.l').toFixed(2)})`)

        this.init = (colors) => {
            this.swatches = Array.apply(null, Array(targets.length)).map(
                item => null
            );
            colors.forEach((color, idx) => {
                const luminance = color.lab.l;
                const weight = luminanceToWeight(luminance);
                const space = color.space.id;
                const index = weights.findIndex(item => item === weight);
                this.swatches[index] = new Swatch(weight, color, space, idx);
            });
        };
        this.init(Array.isArray(colors) ? colors : []);
        this.insertBlackAndWhite();
        this.tweenSwatches();
    }

    insertBlackAndWhite() {
        if (this.swatches[0] === null) {
            const color = new Color('lab', [100.0, 0.0, 0.0]);
            const weight = luminanceToWeight(color.lab.l);
            const space = color.space.id
            this.swatches[0] = new Swatch(weight, color, space, null);
        }
        if (this.swatches[21] === null) {
            const color = new Color('lab', [0.0, 0.0, 0.0]);
            const weight = luminanceToWeight(color.lab.l);
            const space = color.space.id
            this.swatches[21] = new Swatch(weight, color, space, null);
        }
    }

    tweenSwatches() {

        const candidateSwatches = [];
        const tween = this.swatches.filter(swatch => swatch);

        for (let i = 0; i + 1 < tween.length; i++) {
            const start = tween[i].color;
            const stop = tween[i + 1].color;
            const range = Color.range(start, stop, { space: this.stepsSpace, outputSpace: this.stepsSpace });
            const steps = Color.steps(range, { maxDeltaE: this.stepsDeltaE });
            steps.forEach(item => candidateSwatches.push(new Color(this.stepsSpace, item.coords)));
        }

        this.swatches.forEach((swatch, idx) => {
            if (swatch === null) {
                let target = targets[idx];
                target = target !== 50 ? target : target - 0.50;
                target = target !== 97.5? target : target - 0.75;
                target = target !== 95.0? target : target - 1.50;
                target = target !== 90.0? target : target - 1.00;
                target = target !== 5.0? target : target + 0.25;
                const color = candidateSwatches.reduce(function (prev, curr) {
                    return Math.abs(curr.lab_d65.l - target) < Math.abs(prev.lab_d65.l - target)
                        ? curr
                        : prev;
                });
                const space = color.space.id;
                const luminance = color.lab_d65.l;
                const weight = luminanceToWeight(luminance);
                this.swatches[idx] = new Swatch(weight, color, space, null);
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