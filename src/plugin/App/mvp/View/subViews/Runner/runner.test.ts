/**
 * @jest-environment jsdom
 */

import { Runner } from '.';
import { cssSelectors } from './constants';

describe('Runner', () => {
  const div = document.createElement('div');
  document.body.append(div);

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

  it('should handle pointerdown runner', () => {
    const pointerDownEvent = new MouseEvent('pointerdown', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    const runnerToNode = document.querySelector(`.${cssSelectors.runner}`);

    if (!(runnerToNode instanceof HTMLDivElement)) {
      fail('runner is not HTMLDivElement');
    }

    runnerToNode.dispatchEvent(pointerDownEvent);

    const pointerMoveEvent = new MouseEvent('pointermove', {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: 100,
      clientY: 200,
    });

    runnerTo.subscribe('ChangeRunnerPosition', ({ type }) => {
      expect(type).toEqual('to');
    });

    runnerToNode.dispatchEvent(pointerMoveEvent);

    const pointerUpEvent = new MouseEvent('pointerup', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    runnerToNode.dispatchEvent(pointerUpEvent);
  });

  it('should handle keydown runner', () => {
    const keyDownEvent = new KeyboardEvent('keydown', {
      code: 'ArrowDown',
    });

    const keyUpEvent = new KeyboardEvent('keydown', {
      code: 'ArrowUp',
    });

    const runnerToNode = document.querySelector(`.${cssSelectors.runner}`);

    if (!(runnerToNode instanceof HTMLDivElement)) {
      fail('runner is not HTMLDivElement');
    }

    runnerTo.subscribe('ChangeRunnerPositionByStep', ({ type, touchRoute }) => {
      expect(type).toEqual('to');

      if (touchRoute === 'up') {
        expect(touchRoute).toEqual('up');
        return;
      }

      expect(touchRoute).toEqual('down');
    });

    runnerToNode.dispatchEvent(keyDownEvent);
    runnerToNode.dispatchEvent(keyUpEvent);
  });
});
