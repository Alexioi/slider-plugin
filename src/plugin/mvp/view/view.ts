import EventEmitter, { EmitterMethod } from 'event-emitter';

import Bar from './bar';

import { IOptions, IPosition } from '../interfaces/interfaces';

class View {
  private element: JQuery;

  private bar: Bar;

  private $slider: JQuery;

  private emit!: EmitterMethod;

  public on!: EventListener;

  constructor(element: JQuery) {
    this.element = element;
    this.$slider = this.initSlider();
    this.bar = new Bar(this.$slider);

    this.addEventEmitters();
  }

  public updateSlider(options: IOptions): void {
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

  private initSlider(): JQuery {
    const slider = "<div class='slider'></div>";

    this.element.append(slider);

    return this.element.find('.slider');
  }

  private addEventEmitters() {
    this.bar.on('click', this.emitBar);

    this.bar.on('clickScale', this.emitScale);
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

EventEmitter(View.prototype);

export default View;
