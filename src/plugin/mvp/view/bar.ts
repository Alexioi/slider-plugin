import EventEmitter from 'event-emitter';

import Runner from './runner';
import Range from './range';
import Scale from './scale';

import { IPosition, IOptions } from '../interfaces/interfaces';

class Bar {
  private $slider: JQuery;

  private range: Range;

  scale: Scale;

  private $bar: JQuery;

  private runnerFrom: Runner;

  private runnerTo: Runner;

  emit: any;

  on: any;

  constructor($slider: JQuery) {
    this.$slider = $slider;
    this.$bar = this.init();
    this.range = new Range(this.$bar);
    this.runnerFrom = new Runner(this.$bar);
    this.runnerTo = new Runner(this.$bar);
    this.scale = new Scale(this.$bar);
    this.addEventEmitters();
  }

  private init(): JQuery {
    const bar = "<div class='slider__bar'></div>";

    this.$slider.append(bar);

    return this.$slider.find('.slider__bar');
  }

  public update(options: IOptions): void {
    const { hasTip, isRange } = options;

    if (isRange) {
      this.runnerFrom.show();
    } else {
      this.runnerFrom.hide();
    }

    this.runnerFrom.update(hasTip);
    this.runnerTo.update(hasTip);

    this.updatePositionFrom(options);
    this.updatePositionTo(options);
  }

  public updatePositionFrom({
    isVertical,
    min,
    max,
    from,
    to,
  }: IOptions): void {
    const value = from;
    const position = this.calculatePosition(value, min, max);
    const width = this.calculateWidth(from, to, min, max);

    this.runnerFrom.move({ isVertical, position, value });
    this.range.move({ isVertical, position, width });
  }

  public updatePositionTo({ isVertical, min, max, from, to }: IOptions): void {
    const value = to;
    const position = this.calculatePosition(value, min, max);
    const rangePosition = this.calculatePosition(from, min, max);
    const width = this.calculateWidth(from, to, min, max);

    this.runnerTo.move({ isVertical, position, value });
    this.range.move({ isVertical, position: rangePosition, width });
  }

  private calculatePosition(value: number, min: number, max: number) {
    return ((value - min) / (max - min)) * 100;
  }

  private calculateWidth(from: number, to: number, min: number, max: number) {
    return ((to - from) / (max - min)) * 100;
  }

  private addEventEmitters() {
    this.runnerFrom.on('click', this.clickRunnerFrom);

    this.runnerTo.on('click', this.clickRunnerTo);
  }

  private clickRunnerFrom = (position: IPosition) => {
    this.calculatePercentageClicks(position, 'from');
  };

  private clickRunnerTo = (position: IPosition) => {
    this.calculatePercentageClicks(position, 'to');
  };

  private calculatePercentageClicks(position: IPosition, runnerName: string) {
    const x = (position.x - this.$bar.offset()!.left) / this.$bar.width()!;

    const y = (position.y - this.$bar.offset()!.top) / this.$bar.height()!;

    this.emit('click', { x, y, runnerName });
  }
}

EventEmitter(Bar.prototype);

export default Bar;
