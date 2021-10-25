import EventEmitter from '../../EventEmitter/EventEmitter';
import { IOptions } from '../../interfaces/interfaces';
import createElement from '../../lib/createElement';

class Tip {
  private $slider: JQuery;

  private $tipLine: JQuery;

  private $tipFrom: JQuery;

  private $tipTo: JQuery;

  private $tipBoth: JQuery;

  private eventEmitter: EventEmitter;

  constructor($slider: JQuery, eventEmitter: EventEmitter) {
    this.$slider = $slider;
    this.eventEmitter = eventEmitter;

    this.$tipLine = createElement(this.$slider, 'div', 'slider__tip-line');
    this.$tipFrom = createElement(this.$tipLine, 'span', 'slider__tip-from');
    this.$tipBoth = createElement(this.$tipLine, 'span', 'slider__tip-both');
    this.$tipTo = createElement(this.$tipLine, 'span', 'slider__tip-to');
    this.attachEventEmitter();
  }

  private attachEventEmitter() {
    this.eventEmitter.subscribe('updateView', this.update);

    this.eventEmitter.subscribe('changeFrom', this.changeFrom);
  }

  private changeFrom = (options: IOptions) => {
    const { from, to } = options;

    this.changeText(from, to);
  };

  private update = (options: IOptions) => {
    const { from, to, hasTip } = options;

    if (hasTip) {
      this.$tipLine.css({ display: 'block' });
    } else {
      this.$tipLine.css({ display: 'none' });
    }

    this.changeText(from, to);
  };

  private changeText(from: number, to: number) {
    this.$tipFrom.text(from);
    this.$tipTo.text(to);
    this.$tipBoth.text(`${from} - ${to}`);
  }
}

export default Tip;
