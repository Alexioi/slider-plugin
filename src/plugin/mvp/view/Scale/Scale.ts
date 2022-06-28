import './scale.scss';
import { isEqual } from 'lodash';
import EventNames from '../../../types/enums';
import { IMarkParameters, IScaleOptions } from '../../../types/types';
import EventEmitter from '../../../EventEmitter/EventEmitter';

class Scale {
  private $slider: JQuery;

  private eventEmitter: EventEmitter;

  private scaleOptions!: IScaleOptions;

  private $scale!: JQuery;

  constructor($slider: JQuery, eventEmitter: EventEmitter) {
    this.$slider = $slider;
    this.eventEmitter = eventEmitter;

    this.init();
  }

  public render({ min, max, isVertical }: IScaleOptions, isRedraw = false): void {
    const isDraw = !isEqual({ min, max, isVertical }, this.scaleOptions) || isRedraw;

    if (!isDraw) {
      return;
    }

    this.scaleOptions = { min, max, isVertical };
    this.$scale.empty();
    this.$scale.show();

    const scaleParameters = this.getScaleParameters();

    this.draw(scaleParameters);
  }

  public destroy(): void {
    this.$scale.hide();
  }

  private init(): void {
    this.$scale = $('<div>', { class: 'slider__scale' });
    this.$slider.append(this.$scale);
    this.attachEventsHandler();
  }

  private draw(parameters: IMarkParameters[]): void {
    const { isVertical } = this.scaleOptions;

    parameters.forEach((parameter) => {
      const { percent, text } = parameter;
      const style = isVertical ? `top: ${percent}%` : `left: ${percent}%`;
      const $mark = $('<span>', { class: 'slider__mark', text, style });

      this.$scale.append($mark);
    });
  }

  private attachEventsHandler(): void {
    this.$scale.on('click', this.clickScale);
    $(window).on('resize', this.handlerResizeScale);
  }

  private handlerResizeScale = (): void => {
    this.render(this.scaleOptions, true);
  };

  private clickScale = ({ target }: { target: HTMLSpanElement }): void => {
    const { innerHTML } = target;

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

  private getScaleParameters(): IMarkParameters[] {
    const { max, min, isVertical } = this.scaleOptions;
    const { offsetHeight, offsetWidth } = this.$scale[0];
    const scaleLength = isVertical ? offsetHeight : offsetWidth;
    const scalePercents = Scale.getScalePercents(scaleLength);

    const differenceMaxAndMin = Math.abs(max - min);

    const scaleParameters = scalePercents.map((percent) => {
      const text = (min + (differenceMaxAndMin * percent) / 100).toFixed(1).replace(/\.?0+$/, '');

      return { percent, text };
    });

    return scaleParameters;
  }
}

export default Scale;
