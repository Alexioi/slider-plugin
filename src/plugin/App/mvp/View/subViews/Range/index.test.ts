/**
 * @jest-environment jsdom
 */

import { Range } from '.';
import { cssSelectors } from './constants';

describe('Scale', () => {
  const div = document.createElement('div');
  document.body.append(div);

  const range = new Range(div);

  it('should update', () => {
    range.render();

    const rangeNode = document.querySelector(`.${cssSelectors.range}`);

    if (!(rangeNode instanceof HTMLDivElement)) {
      fail('rangeNode is not HTMLDivElement');
    }

    range.update({
      min: -100,
      max: 100,
      isVertical: false,
      isRange: true,
      from: 0,
      to: 50,
    });
    expect(rangeNode.style.cssText).toEqual('left: 50%; right: 25%;');

    range.update({
      min: -100,
      max: 100,
      isVertical: true,
      isRange: true,
      from: 0,
      to: 50,
    });
    expect(rangeNode.style.cssText).toEqual('top: 50%; bottom: 25%;');
  });
});
