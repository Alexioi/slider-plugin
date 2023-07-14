import './scale.scss';
import { IMarkParameters, IOptions, EventTypes } from '../../../types';
import { EventEmitter } from '../../../EventEmitter';
import { Dom } from './type';
import { createElement, getScalePercents } from './methods';

class Scale extends EventEmitter<EventTypes> {
  private dom: Dom;

  private options: IOptions;

  constructor(root: HTMLDivElement, options: IOptions) {
    super();

    this.options = options;

    const { dom } = this.init(root);

    this.dom = dom;
  }

  public render(): void {
    this.deleteMarks();

    this.dom.root.appendChild(this.dom.scale);

    const scaleParameters = this.getScaleParameters();

    this.draw(scaleParameters);
  }

  public destroy(): void {
    this.dom.scale.remove();
  }

  private init(root: HTMLDivElement): { dom: Dom } {
    const dom = createElement(root);

    dom.scale.addEventListener('pointerdown', this.clickScale.bind(this));

    window.addEventListener('resize', this.handlerResizeScale.bind(this));

    return { dom };
  }

  private deleteMarks(): void {
    while (this.dom.scale.firstChild) {
      this.dom.scale.removeChild(this.dom.scale.firstChild);
    }
  }

  private draw(parameters: IMarkParameters[]): void {
    const { isVertical } = this.options;

    parameters.forEach((parameter) => {
      const { percent, text } = parameter;
      const style = isVertical ? `top: ${percent}%` : `left: ${percent}%`;
      const mark = document.createElement('span');
      mark.classList.add('slider__mark');
      mark.style.cssText = style;
      mark.innerText = text;

      this.dom.scale.appendChild(mark);
    });
  }

  private handlerResizeScale(): void {
    this.render();
  }

  private clickScale(pointerEvent: PointerEvent): void {
    if (!(pointerEvent.target instanceof Element)) {
      return;
    }

    const { innerHTML } = pointerEvent.target;
    const intInnerHtml = Number(innerHTML);

    if (!isNaN(intInnerHtml)) {
      this.emit('ClickScale', { targetNumber: intInnerHtml });
    }
  }

  private getScaleParameters(): IMarkParameters[] {
    const { max, min, isVertical } = this.options;
    const { offsetHeight, offsetWidth } = this.dom.scale;
    const scaleLength = isVertical ? offsetHeight : offsetWidth;
    const scalePercents = getScalePercents(scaleLength);

    const differenceMaxAndMin = Math.abs(max - min);

    const scaleParameters = scalePercents.map((percent) => {
      const text = (min + (differenceMaxAndMin * percent) / 100).toFixed(1).replace(/\.?0+$/, '');

      return { percent, text };
    });

    return scaleParameters;
  }
}

export default Scale;
