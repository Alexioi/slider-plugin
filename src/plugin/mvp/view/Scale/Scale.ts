import './scale.scss';

import ENamesOfEvents from '../../enums/enums';

class Scale implements IScale {
  private $slider: JQuery;

  private $scale: JQuery;

  private eventEmitter: IEventEmitter;

  private isRender = false;

  private marks: JQuery[] = [];

  constructor($slider: JQuery, eventEmitter: IEventEmitter) {
    this.eventEmitter = eventEmitter;
    this.$slider = $slider;
    this.$scale = $('<div>', { class: 'slider__scale' });
  }

  public render({ min, max, isVertical, step }: IScaleOptions): void {
    if (!this.isRender) {
      this.$scale = $('<div>', { class: 'slider__scale' });
      this.$slider.append(this.$scale);
      this.attachEventsHandler();
      this.isRender = true;
    } else {
      this.marks.length = 0;
      this.$scale.empty();
    }

    const difference = Math.abs(max - min);

    const oneSymbolLength = 15;

    const numberOfSymbolAfterComma = String(step).includes('.')
      ? String(step).split('.').pop()!.length
      : 0;

    const lengthMin = String(min).length;
    const lengthMax = String(max).length;

    const maximumSymbolLength = lengthMin > lengthMax ? lengthMin : lengthMax;

    const symbolsLength = oneSymbolLength * (numberOfSymbolAfterComma + maximumSymbolLength);

    const scaleLength = isVertical
      ? this.$scale[0].getBoundingClientRect().height
      : this.$scale[0].getBoundingClientRect().width;

    const countOfMarks = Math.floor(scaleLength / symbolsLength);

    while (this.marks.length < countOfMarks) {
      const percent = (100 * this.marks.length) / (countOfMarks - 1);
      const text = Number((min + (difference * percent) / 100).toFixed(numberOfSymbolAfterComma));
      const style = isVertical ? `top: ${percent}%` : `left: ${percent}%`;

      this.marks.push(
        $('<span>', {
          class: 'slider__mark',
          text,
          style,
        }),
      );
      this.$scale.append(this.marks[this.marks.length - 1]);
    }
  }

  public destroy(): void {
    if (this.isRender) {
      this.marks.length = 0;
      this.$scale.remove();
      this.isRender = false;
    }
  }

  private attachEventsHandler() {
    this.$scale.on('click', this.clickScale);
  }

  private clickScale = (event: { target: HTMLSpanElement }) => {
    const { innerHTML } = event.target;

    this.eventEmitter.emit(ENamesOfEvents.ClickScale, Number(innerHTML));
  };
}

export default Scale;
