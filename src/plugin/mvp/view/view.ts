import EventEmitter from '../EventEmitter/EventEmitter';

import Bar from './bar/bar';

import { IOptions } from '../interfaces/interfaces';
import Tip from './Tip/Tip';
import createElement from '../lib/createElement';

class View {
  private bar: Bar;

  private tip: Tip;

  private $slider: JQuery;

  private eventEmitter: EventEmitter;

  constructor(element: JQuery, eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
    this.$slider = createElement(element, 'div', 'slider');
    this.tip = new Tip(this.$slider);
    this.bar = new Bar(this.$slider, this.eventEmitter);
  }

  public update(options: IOptions): void {
    const { isVertical } = options;
    this.tip.update(options);

    if (isVertical) {
      this.addClassVertical();
    } else {
      this.removeClassVertical();
    }

    this.bar.update(options);
  }

  public updatePositionFrom(options: IOptions): void {
    this.tip.changeValue(options);
    this.bar.updatePositionFrom(options);
  }

  public updatePositionTo(options: IOptions): void {
    this.tip.changeValue(options);
    this.bar.updatePositionTo(options);
  }

  private addClassVertical() {
    this.$slider.addClass('slider_vertical');
  }

  private removeClassVertical() {
    this.$slider.removeClass('slider_vertical');
  }
}

export default View;
