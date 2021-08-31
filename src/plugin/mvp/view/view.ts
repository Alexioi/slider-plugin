import EventEmitter from '../EventEmitter/EventEmitter';

import Bar from './bar/bar';

import { IOptions, IPosition } from '../interfaces/interfaces';

class View extends EventEmitter {
  private bar: Bar;

  private $slider: JQuery;

  constructor(element: HTMLElement) {
    super();

    this.$slider = View.init(element);
    this.bar = new Bar(this.$slider);

    this.addEventEmitters();
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

  private addEventEmitters() {
    this.bar.subscribe('click', this.emitBar);

    this.bar.subscribe('clickScale', this.emitScale);
  }

  private emitBar = (position: IPosition) => {
    this.emit('click', position);
  };

  private emitScale = (value: number) => {
    this.emit('clickScale', value);
  };

  private addClassVertical() {
    this.$slider.addClass('slider_vertical');
  }

  private removeClassVertical() {
    this.$slider.removeClass('slider_vertical');
  }
}

export default View;
