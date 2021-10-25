import EventEmitter from '../../EventEmitter/EventEmitter';

import Runner from './runner/runner';
import Range from './range/range';
import Scale from './scale/scale';

import { IOptions } from '../../interfaces/interfaces';

class Bar {
  private $slider: JQuery;

  private range: Range;

  private scale: Scale;

  private $bar: JQuery;

  private runnerFrom: Runner;

  private runnerTo: Runner;

  private eventEmitter: EventEmitter;

  private sliderWidth: number;

  private sliderMargin: number;

  constructor($slider: JQuery, eventEmitter: EventEmitter) {
    this.$slider = $slider;
    this.$bar = this.init();
    this.sliderWidth = this.calculateSliderWidth();
    this.sliderMargin = this.calculateSliderMargin();
    this.eventEmitter = eventEmitter;
    this.range = new Range(this.$bar);
    this.runnerFrom = new Runner(
      'from',
      this.$bar,
      this.eventEmitter,
      this.sliderWidth,
      this.sliderMargin,
    );
    this.runnerTo = new Runner(
      'to',
      this.$bar,
      this.eventEmitter,
      this.sliderWidth,
      this.sliderMargin,
    );
    this.scale = new Scale(this.$bar, this.eventEmitter);
  }

  private init(): JQuery {
    const bar = "<div class='slider__bar'></div>";

    this.$slider.append(bar);

    return this.$slider.find('.slider__bar');
  }

  public update(options: IOptions): void {
    const { from, hasScale, isRange, isVertical, min, max } = options;

    if (isRange) {
      this.runnerFrom.show();
    } else {
      this.runnerFrom.hide();
    }

    if ((from - min) / (max - min) > 0.5) {
      this.runnerFrom.addClassTarget();
    }

    // this.runnerFrom.update(hasTip);
    // this.runnerTo.update(hasTip);

    this.updatePositionFrom(options);
    this.updatePositionTo(options);

    this.scale.removeMarks();

    if (hasScale) {
      this.scale.addMarks({ min, max, isVertical });
    }
  }

  public updatePositionFrom({ isVertical, min, max, from, to }: IOptions): void {
    const value = from;
    const position = Bar.calculatePosition(value, min, max);
    const width = Bar.calculateWidth(from, to, min, max);

    this.runnerFrom.move({ isVertical, position, value });
    this.range.move({ isVertical, position, width });
  }

  public updatePositionTo({ isRange, isVertical, min, max, from, to }: IOptions): void {
    const value = to;
    const position = Bar.calculatePosition(value, min, max);

    let rangePosition: number;
    let width: number;

    if (isRange) {
      rangePosition = Bar.calculatePosition(from, min, max);
      width = Bar.calculateWidth(from, to, min, max);
    } else {
      rangePosition = Bar.calculatePosition(min, min, max);
      width = Bar.calculateWidth(min, to, min, max);
    }

    this.runnerTo.move({ isVertical, position, value });
    this.range.move({ isVertical, position: rangePosition, width });
  }

  private static calculatePosition(value: number, min: number, max: number) {
    return ((value - min) / (max - min)) * 100;
  }

  private static calculateWidth(from: number, to: number, min: number, max: number) {
    return ((to - from) / (max - min)) * 100;
  }

  private calculateSliderWidth() {
    return this.$bar.width()!;
  }

  private calculateSliderMargin() {
    return this.$bar.offset()!.left;
  }
}

export default Bar;
