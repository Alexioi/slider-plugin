import EventEmitter from "event-emitter";

import {IOptions, IClickRate} from "../interfaces/interfaces"

class Model {
    options: IOptions;
    emit: any;

    constructor(options: IOptions) {
        this.options = options;
    }

    public updateOptions({isRange, isVertical, hasTip, numberMarks, step, min, max, from, to}: IOptions) {
        if (typeof isRange === "boolean") {
            if (this.options.isRange !== isRange) {
                this.calculateFrom(isRange)
            }
            this.options.isRange = isRange;
        }

        if (typeof isVertical === "boolean") {
            this.options.isVertical = isVertical;
        }

        if (typeof hasTip === "boolean") {
            this.options.hasTip = isVertical;
        }

        if (typeof numberMarks === "number") {
            this.options.numberMarks = step;
        }

        if (typeof step === "number") {
            this.options.step = step;
        }

        if (typeof min === "number") {
            this.options.min = min;
        }

        if (typeof max === "number") {
            this.options.max = max;
        }

        if (typeof to === "number") {
            this.options.to = to;
        }

        if (typeof from === "number") {
            this.options.from = from;
        }

        this.verifyMax()
        this.verifyFrom()
        this.verifyTo()

        this.emit("updateModelOptions", this.options);
    }

    public updateValue({x, y, valueName}: IClickRate) {
        let rate: number;

        this.options.isVertical ? (rate = y) : (rate = x);

        if (valueName === 'from') {
            this.options.from = this.options.max * rate;

            this.verifyFrom()
        }

        if (valueName === 'to') {
            this.options.to = this.options.max * rate;

            this.verifyTo()
        }
        
        this.emit("updateModelOptions", this.options);
    }

    public updateNearValue() {

    }

    private verifyMax(): void {
        if (this.options.max < this.options.min) {
            this.options.max = this.options.min * 2
        }
    }

    private verifyFrom() {
        if (this.options.from < this.options.min) {
            this.options.from = this.options.min
        }

        if (this.options.from > this.options.max) {
            this.options.from = this.options.max
        }

        if (this.options.from > this.options.to) {
            this.options.from = this.options.to
        }
    }

    private verifyTo() {
        if (this.options.to < this.options.from) {
            this.options.to = this.options.from
        }

        if (this.options.to > this.options.max) {
            this.options.to = this.options.max
        }
    }

    private calculateFrom(isRange: boolean) {
        if (isRange) {
            this.options.from = this.options.to / 2
        } else {
            this.options.from = this.options.min
        }
    }
}

EventEmitter(Model.prototype);

export default Model;
