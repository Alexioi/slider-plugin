/**
 * @jest-environment jsdom
 */

import { Bar } from '.';
import { cssSelectors } from './constants';

describe('Runner', () => {
  const div = document.createElement('div');
  document.body.append(div);

  const bar = new Bar(div);

  it('should render', () => {
    bar.render();
    const barNode = bar.getBarNode();

    expect(barNode.classList.contains(cssSelectors.bar)).toBeTruthy();
  });
});
