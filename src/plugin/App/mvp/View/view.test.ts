/**
 * @jest-environment jsdom
 */

import { View } from '.';
import { defaultOptions } from '../../sliderOptions';

describe('View', () => {
  const div = document.createElement('div');
  document.body.append(div);

  const view = new View(div);

  it('should render', () => {
    view.render({
      ...defaultOptions,
      hasScale: true,
      hasTip: true,
    });

    const slider = document.querySelector('.slider');

    if (slider === null) {
      fail('slider equal null');
    }

    expect(slider.querySelector('.slider__tip-line')).not.toBeNull();
    expect(slider.querySelector('.slider__runner')).not.toBeNull();
    expect(slider.querySelector('.slider__range')).not.toBeNull();
    expect(slider.querySelector('.slider__scale')).not.toBeNull();
  });

  it('should render vertical', () => {
    view.render({
      ...defaultOptions,
      isVertical: true,
    });

    const verticalSlider = document.querySelector('.slider_vertical');

    if (verticalSlider === null) {
      fail('slider equal null');
    }

    expect(verticalSlider.classList.contains('slider_vertical')).toBeTruthy();
  });

  it('should update subviews', () => {
    view.update({ ...defaultOptions, from: 0 });

    const tip = document.querySelector<HTMLElement>('.slider__tip');

    expect(tip?.innerText).toEqual('0');
  });

  it('should update target', () => {
    view.update({ ...defaultOptions });

    const runner = document.querySelector<HTMLElement>('.slider__runner');

    expect(runner?.classList.contains('.slider__tip_target')).toBeFalsy();

    const pointerDownEvent = new MouseEvent('pointerdown', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    runner?.dispatchEvent(pointerDownEvent);

    const pointerMoveEvent = new MouseEvent('pointermove', {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: 100,
      clientY: 200,
    });

    runner?.dispatchEvent(pointerMoveEvent);

    expect(runner?.style.left).toBeTruthy();
  });
});
