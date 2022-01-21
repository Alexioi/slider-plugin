import './scale.scss';

import { ENamesOfEvents } from '../../enums/enums';

import createElement from '../../lib/createElement';

class Scale {
  private isVertical?: boolean;

  private $scale: JQuery;

  private eventEmitter: IEventEmitter;

  constructor($slider: JQuery, eventEmitter: IEventEmitter) {
    this.eventEmitter = eventEmitter;

    this.$scale = createElement($slider, 'div', 'slider__scale');
    this.attachEvents();
  }

  public update({ hasScale, isVertical, min, max }: any) {
    this.removeMarks();

    this.isVertical = isVertical;

    if (hasScale) {
      this.$scale.css({ display: '' });
    } else {
      this.$scale.css({ display: 'none' });
    }

    this.addMarks({ min, max });
  }

  private addMarks({ min, max }: { min: number; max: number }) {
    // const length = this.isVertical ? this.$slider.height() : this.$slider.width();

    let countOfMarks = 10;
    const v = 1 / countOfMarks;
    const difference = Math.abs(max - min);

    for (let i = 0; i <= 10; i = i + 1) {
      let procent = (v * i * 1000) / countOfMarks;
      let x = min + difference * v * i;

      const $mark = $('<div>', {
        class: 'slider__mark',
        text: `${x}`,
        style: `${this.isVertical ? 'top' : 'left'}:${procent}%`,
      });

      this.$scale.append($mark);
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

    this.eventEmitter.emit(ENamesOfEvents.ClickScale, value);
  };
}

export default Scale;
