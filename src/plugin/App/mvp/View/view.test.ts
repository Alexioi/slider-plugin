/**
 * @jest-environment jsdom
 */

import { CSSSelectors as tipCSSSelectors } from './subViews/Tip/constants';
import { CSSSelectors as runnerCSSSelectors } from './subViews/Runner/constants';
import { CSSSelectors as rangeCSSSelectors } from './subViews/Range/constants';
import { CSSSelectors as scaleSSSelectors } from './subViews/Scale/constants';
import { defaultOptions } from '../../sliderOptions';
import { CSSSelectors } from './constants';
import { View } from './View';

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

    const slider = document.querySelector(`.${CSSSelectors.slider}`);

    if (slider === null) {
      fail('slider equal null');
    }

    expect(slider.querySelector(`.${tipCSSSelectors.tipLine}`)).not.toBeNull();
    expect(
      slider.querySelector(`.${runnerCSSSelectors.runner}`),
    ).not.toBeNull();
    expect(slider.querySelector(`.${rangeCSSSelectors.range}`)).not.toBeNull();
    expect(slider.querySelector(`.${scaleSSSelectors.scale}`)).not.toBeNull();
  });

  it('should render vertical', () => {
    view.render({
      ...defaultOptions,
      isVertical: true,
    });

    const verticalSlider = document.querySelector(
      `.${CSSSelectors.sliderVertical}`,
    );

    if (verticalSlider === null) {
      fail('slider equal null');
    }

    expect(
      verticalSlider.classList.contains(CSSSelectors.sliderVertical),
    ).toBeTruthy();
  });

  it('should update subviews', () => {
    view.update({ ...defaultOptions, from: 0 });

    const tip = document.querySelector<HTMLElement>(`.${tipCSSSelectors.tip}`);

    expect(tip?.innerText).toEqual('0');
  });

  it('should update target', () => {
    view.update({ ...defaultOptions });

    const runner = document.querySelector<HTMLElement>(
      `.${runnerCSSSelectors.runner}`,
    );

    expect(
      runner?.classList.contains(`.${runnerCSSSelectors.targetedRunner}`),
    ).toBeFalsy();

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
