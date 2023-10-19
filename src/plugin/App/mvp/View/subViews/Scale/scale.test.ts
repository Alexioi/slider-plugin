/**
 * @jest-environment jsdom
 */

import { Scale } from '.';
import { CSSSelectors } from './constants';

describe('Scale', () => {
  const div = document.createElement('div');
  div.style.height = '100%';
  document.body.append(div);

  const scale = new Scale(div);

  it('should not render', () => {
    scale.render({
      min: 0,
      max: 100,
      isVertical: false,
      hasScale: false,
      step: 1,
    });

    const scaleNode = document.querySelector(`.${CSSSelectors.scale}`);

    expect(scaleNode).toBeNull();
  });

  it('should emit customValue', () => {
    scale.render({
      min: 0,
      max: 100,
      isVertical: false,
      hasScale: true,
      step: 1,
    });

    const markNode = document.querySelector(`.${CSSSelectors.mark}`);

    if (!(markNode instanceof HTMLDivElement)) {
      fail('scaleNode is not HTMLDivElement');
    }

    const pointerDownEvent = new Event('pointerdown', { bubbles: true });

    scale.subscribe('clickScale', ({ targetNumber }) => {
      expect(targetNumber).not.toEqual(40);
      expect(targetNumber).toEqual(0);
    });

    markNode.dispatchEvent(pointerDownEvent);
  });

  it('should update by windows resize', () => {
    scale.render({
      min: 0,
      max: 100,
      isVertical: true,
      hasScale: true,
      step: 1,
    });

    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1500,
    });

    window.dispatchEvent(new Event('resize'));

    const marks = document.querySelectorAll('.slider__mark');

    expect(marks.length).toEqual(2);
  });
});
