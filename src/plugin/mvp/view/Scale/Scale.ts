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
  }

  public render({ min, max, isVertical }: any) {
    if (!this.isRender) {
      this.$scale = $('<div>', { class: 'slider__scale' });
      this.$slider.append(this.$scale);
      this.attachEvents();
      this.isRender = true;
    } else {
      this.marks.length = 0;
      this.$scale.empty();
    }

    const difference = Math.abs(max - min);

    while (this.marks.length < this.countOfMarks) {
      const percent = (100 * this.marks.length) / (this.countOfMarks - 1);
      const text = min + (difference * percent) / 100;
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

  public destroy() {
    if (this.isRender) {
      this.marks.length = 0;
      this.$scale.remove();
      this.isRender = false;
    }
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
