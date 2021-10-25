import EventEmitter from '../EventEmitter/EventEmitter';

import Bar from './bar/bar';

import { IOptions } from '../interfaces/interfaces';

class View {
  private bar: Bar;

  private $slider: JQuery;

  private eventEmitter: EventEmitter;

  constructor(element: HTMLElement, eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
    this.$slider = View.init(element);
    this.bar = new Bar(this.$slider, this.eventEmitter);
  }

  public update(options: IOptions): void {
    const { isVertical } = options;

    if (isVertical) {
      this.addClassVertical();
    } else {
      this.removeClassVertical();
    }

    this.bar.update(options);
  }

  public updatePositionFrom(options: IOptions): void {
    this.bar.updatePositionFrom(options);
  }

  public updatePositionTo(options: IOptions): void {
    this.bar.updatePositionTo(options);
  }

  private static init(element: HTMLElement): JQuery {
    const slider = "<div class='slider'></div>";
    const $element = $(element);

    $element.append(slider);

    return $element.find('.slider');
  }

  private addClassVertical() {
    this.$slider.addClass('slider_vertical');
  }

  private removeClassVertical() {
    this.$slider.removeClass('slider_vertical');
  }
}

export default View;
