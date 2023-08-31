/**
 * @jest-environment jsdom
 */

import { Bar } from '.';
import { CSSSelectors } from './constants';

describe('Runner', () => {
  const div = document.createElement('div');
  document.body.append(div);

  const bar = new Bar(div);

  it('should render', () => {
    bar.render();
    const barNode = bar.getBarNode();

    expect(barNode.classList.contains(CSSSelectors.bar)).toBeTruthy();
  });

  it('should handle pointer down event', () => {
    const mouseEvent = new MouseEvent('pointerdown');

    const barNode = document.querySelector(`.${CSSSelectors.bar}`);

    if (!(barNode instanceof HTMLDivElement)) {
      fail('barNode is not HTMLDivElement');
    }

    bar.subscribe('changeNearRunnerPosition', () => {
      expect(true).toBeTruthy();
    });

    barNode.dispatchEvent(mouseEvent);
  });
});
