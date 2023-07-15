import './scale.scss';
import { IMarkParameters, EventTypes } from '../../../types';
import { EventEmitter } from '../../../EventEmitter';
import { Dom } from './type';
import { createElement, deleteMarks, getScalePercents } from './methods';

class Scale extends EventEmitter<EventTypes> {
  private dom: Dom;

  private props: { min: number; max: number; isVertical: boolean; isRender: boolean } = {
    min: 0,
    max: 100,
    isVertical: false,
    isRender: false,
  };

  constructor(root: HTMLDivElement) {
    super();

    const { dom } = this.init(root);

    this.dom = dom;
  }

  public render({
    min,
    max,
    isVertical,
  }: {
    min: number;
    max: number;
    isVertical: boolean;
    hasScale: boolean;
  }): void {
    this.props = { min, max, isVertical, isRender: false };

    if (this.props.isRender) {
      return;
    }

    this.props = { min, max, isVertical, isRender: true };

    this.dom.root.appendChild(this.dom.scale);
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

  public update() {
    deleteMarks(this.dom.scale);

    const scaleParameters = this.getScaleParameters();

    this.draw(scaleParameters);
  }

  private draw(parameters: IMarkParameters[]): void {
    const { isVertical } = this.props;

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
    this.update();
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
    const { max, min, isVertical } = this.props;
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

export { Scale };
