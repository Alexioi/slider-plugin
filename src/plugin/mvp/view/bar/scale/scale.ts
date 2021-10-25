import { ENameOfEvent } from '../../../enums/enums';
import EventEmitter from '../../../EventEmitter/EventEmitter';

class Scale {
  private $bar: JQuery;

  private $scale: JQuery;

  private eventEmitter: EventEmitter;

  constructor($bar: JQuery, eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
    this.$bar = $bar;
    this.$scale = this.init();

    this.attachEvents();
  }

  public hide(): void {
    this.$scale.css({ display: 'none' });
  }

  public show(): void {
    this.$scale.css({ display: '' });
  }

  private init(): JQuery {
    const scale = '<div class="slider__scale"></div>';

    this.$bar.append(scale);

    return this.$bar.find('.slider__scale');
  }

  public addMarks({
    min,
    max,
    isVertical,
  }: {
    min: number;
    max: number;
    isVertical: boolean;
  }): void {
    const length = isVertical ? this.$bar.height()! : this.$bar.width()!;

    const countOfMarks = Math.floor(length / 100);

    if (countOfMarks === 0) {
      return;
    }

    const difference = Math.abs(max - min);

    const step = difference / (countOfMarks - 1);

    let value = min;
    let rate = 0;
    let left: number;
    let integerValue: number;

    while (value <= max) {
      integerValue = Math.trunc(value);

      const mark = `<span class='slider__mark js-slider__mark'>${integerValue}</span>`;

      this.$scale.append(mark);

      const $mark = this.$scale.find('.js-slider__mark').last();

      left = (rate / difference) * 100;

      if (isVertical) {
        $mark.css({ top: `${left}%` });
      } else {
        $mark.css({ left: `${left}%` });
      }

      rate += step;
      value += step;
    }
  }

  public removeMarks(): void {
    this.$scale.empty();
  }

  private attachEvents() {
    this.$scale.on('click', this.clickScale);
  }

  private clickScale = (event: any) => {
    const value = Number(event.target.innerHTML);

    this.eventEmitter.emit(ENameOfEvent.ClickScale, value);
  };
}

export default Scale;
