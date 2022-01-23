import './scale.scss';

import { ENamesOfEvents } from '../../enums/enums';

class Scale {
  private $slider: JQuery;

  private $scale: JQuery;

  private eventEmitter: IEventEmitter;

  private isRender = false;

  private countOfMarks = 11;

  private marks: JQuery[] = [];

  constructor($slider: JQuery, eventEmitter: IEventEmitter) {
    this.eventEmitter = eventEmitter;
    this.$slider = $slider;
    this.$scale = $('<div>', { class: 'slider__scale' });

    this.attachEvents();
  }

  public render({ min, max, isVertical }: any) {
    if (!this.isRender) {
      this.$scale = $('<div>', { class: 'slider__scale' });
      this.$slider.append(this.$scale);

      this.isRender = true;
    }

    while (this.marks.length < this.countOfMarks) {
      this.marks.push(
        $('<span>', {
          class: 'slider__mark',
        }),
      );
    }

    const difference = Math.abs(max - min);

    this.marks.forEach(($element, i) => {
      const percent = (100 * i) / (this.marks.length - 1);
      const text = min + (difference * percent) / 100;
      const style = isVertical ? 'top' : 'left';

      $element.css({ [style]: `${percent}%` });
      $element.text(text);
      this.$scale.append($element);
    });
  }

  public removeMarks(): void {
    this.$scale.empty();
  }

  private attachEvents() {
    this.$scale.on('click', this.clickScale);
  }

  private clickScale = (event: any) => {
    const value = Number(event.target.innerHTML);

    this.eventEmitter.emit(ENamesOfEvents.ClickScale, value);
  };
}

export default Scale;
