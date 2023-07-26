/**
 * @jest-environment jsdom
 */

import { Runner } from '.';
import { cssSelectors } from './constants';

describe('Runner', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const runnerFrom = new Runner(div, 'from');
  const runnerTo = new Runner(div, 'to');

  it('should not display from if slider not range', () => {
    runnerFrom.render(false);

    const runner = document.querySelector(`.${cssSelectors.runner}`);

    expect(runner).toBeNull();
  });

  it('should update runner styles', () => {
    runnerTo.render(false);

    const runnerToNode = document.querySelector(`.${cssSelectors.runner}`);

    if (!(runnerToNode instanceof HTMLDivElement)) {
      fail('runnerToNode is not HTMLDivElement');
    }

    runnerTo.update(
      { min: -100, max: 100, from: -50, to: 50, isVertical: false },
      'to',
    );
    expect(runnerToNode.style.left).toEqual('75%');
    expect(
      runnerToNode.classList.contains(cssSelectors.targetedRunner),
    ).toBeTruthy();

    runnerTo.update(
      { min: -100, max: 100, from: -50, to: 50, isVertical: false },
      'from',
    );
    expect(
      runnerToNode.classList.contains(cssSelectors.targetedRunner),
    ).toBeFalsy();

    runnerTo.update(
      { min: -100, max: 100, from: -50, to: 50, isVertical: true },
      'from',
    );
    expect(runnerToNode.style.top).toEqual('75%');
  });
});
