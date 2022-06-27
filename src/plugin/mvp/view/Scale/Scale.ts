import './scale.scss';
import EventNames from '../../../types/enums';

import { IScaleOptions } from '../../../types/types';
import EventEmitter from '../../../EventEmitter/EventEmitter';

class Scale {
  private $slider: JQuery;

  private eventEmitter: EventEmitter;

  private $scale!: JQuery;

  constructor($slider: JQuery, eventEmitter: EventEmitter) {
    this.$slider = $slider;
    this.eventEmitter = eventEmitter;

    this.init();
  }

  private init() {
    this.$scale = $('<div>', { class: 'slider__scale' });
    this.$slider.append(this.$scale);
    this.attachEventsHandler();
  }

  public render({ min, max, isVertical }: IScaleOptions): void {
    this.$scale.empty();
    this.$scale.show();

    const scaleLength = isVertical ? this.$scale[0].offsetHeight : this.$scale[0].offsetWidth;
    const scalePercents = Scale.getScalePercents(scaleLength);

    const differenceMaxAndMin = Math.abs(max - min);

    const scaleParameters = scalePercents.map((percent) => {
      const text = min + (differenceMaxAndMin * percent) / 100;

      return { percent, text };
    });

    scaleParameters.forEach((parameter) => {
      const { percent, text } = parameter;

      const style = isVertical ? `top: ${percent}%` : `left: ${percent}%`;

      this.$scale.append(
        $('<span>', {
          class: 'slider__mark',
          text,
          style,
        }),
      );
    });
  }

  public destroy(): void {
    this.$scale.hide();
  }

  private attachEventsHandler() {
    this.$scale.on('click', this.clickScale);
  }

  private clickScale = (event: { target: HTMLSpanElement }) => {
    const { innerHTML } = event.target;

    this.eventEmitter.emit(EventNames.ClickScale, Number(innerHTML));
  };

  private static getScalePercents(sliderLength: number): number[] {
    if (sliderLength > 800) {
      return [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    }

    if (sliderLength > 500) {
      return [0, 20, 40, 60, 80, 100];
    }

    if (sliderLength > 300) {
      return [0, 33, 66, 100];
    }

    return [0, 100];
  }
}

export default Scale;
