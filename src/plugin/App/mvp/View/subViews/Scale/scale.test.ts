/**
 * @jest-environment jsdom
 */

import { Scale } from '.';
import { cssSelectors } from './constants';

describe('Scale', () => {
  const div = document.createElement('div');
  document.body.append(div);

  const scale = new Scale(div);

  it('should not render', () => {
    scale.render({ min: 0, max: 100, isVertical: false, hasScale: false });

    const scaleNode = document.querySelector(`.${cssSelectors.scale}`);

    expect(scaleNode).toBeNull();
  });

  it('should emit customValue', () => {
    scale.render({ min: 0, max: 100, isVertical: false, hasScale: true });

    const markNode = document.querySelector(`.${cssSelectors.mark}`);

    if (!(markNode instanceof HTMLDivElement)) {
      fail('scaleNode is not HTMLDivElement');
    }

    const pointerDownEvent = new Event('pointerdown', { bubbles: true });

    scale.subscribe('ClickScale', ({ targetNumber }) => {
      expect(targetNumber).not.toEqual(40);
      expect(targetNumber).toEqual(0);
    });

    markNode.dispatchEvent(pointerDownEvent);
  });
});
