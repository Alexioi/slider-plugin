/**
 * @jest-environment jsdom
 */

import { Tip } from '.';
import { CSSSelectors } from './constants';

describe('Tip', () => {
  const div = document.createElement('div');
  document.body.append(div);

  const tip = new Tip(div);

  it('should not display tip if hasTip is false', () => {
    tip.render({ hasTip: false, isRange: true });

    const tipLine = document.querySelector(`.${CSSSelectors.tipLine}`);

    expect(tipLine).toBeNull();
  });

  it('should update tip styles when isRange is false', () => {
    tip.render({ hasTip: true, isRange: false });

    const tipLine = document.querySelector(`.${CSSSelectors.tipLine}`);
    const tipNode = tipLine?.querySelector(`.${CSSSelectors.tip}`);

    if (!(tipNode instanceof HTMLDivElement)) {
      fail('tipNode is not HTMLDivElement');
    }

    tip.update(
      {
        min: -100,
        max: 100,
        from: -50,
        to: 50,
        isRange: false,
        isVertical: false,
      },
      { from: '-50', to: '50' },
    );
    expect(tipNode.style.left).toEqual('75%');

    tip.update(
      {
        min: -100,
        max: 100,
        from: -50,
        to: -100,
        isRange: false,
        isVertical: false,
      },
      { from: '-50', to: '50' },
    );
    expect(tipNode.style.left).toEqual('0%');

    tip.update(
      {
        min: -100,
        max: 100,
        from: -50,
        to: 100,
        isRange: false,
        isVertical: false,
      },
      { from: '-50', to: '50' },
    );
    expect(tipNode.style.left).toEqual('100%');
  });

  it('should update tip styles when isRange is true', () => {
    tip.render({ hasTip: true, isRange: true });

    const tipLine = document.querySelector(`.${CSSSelectors.tipLine}`);
    const tipNodeList = tipLine?.querySelectorAll(`.${CSSSelectors.tip}`);

    if (typeof tipNodeList === 'undefined') {
      fail('tipNodeList equal undefined');
    }

    const [tipFrom, tipBoth, tipTo] = tipNodeList;

    if (!(tipFrom instanceof HTMLDivElement)) {
      fail('tipFrom is not HTMLDivElement');
    }
    if (!(tipBoth instanceof HTMLDivElement)) {
      fail('tipBoth is not HTMLDivElement');
    }
    if (!(tipTo instanceof HTMLDivElement)) {
      fail('tipTo is not HTMLDivElement');
    }

    tip.update(
      {
        min: -100,
        max: 100,
        from: -50,
        to: 50,
        isRange: true,
        isVertical: false,
      },
      { from: '-50', to: '50' },
    );
    expect(tipFrom.style.left).toEqual('25%');
    expect(tipBoth.style.left).toEqual('50%');
    expect(tipTo.style.left).toEqual('75%');

    tip.update(
      {
        min: -100,
        max: 100,
        from: -50,
        to: -50,
        isRange: true,
        isVertical: false,
      },
      { from: '-50', to: '50' },
    );
    expect(tipFrom.classList.contains(CSSSelectors.hiddenTip)).toBeTruthy();
    expect(tipBoth.classList.contains(CSSSelectors.hiddenTip)).toBeFalsy();
    expect(tipTo.classList.contains(CSSSelectors.hiddenTip)).toBeTruthy();
  });

  it('should handle pointerdown runner', () => {
    tip.render({ hasTip: true, isRange: true });

    const tipLine = document.querySelector(`.${CSSSelectors.tipLine}`);
    const tipNodeList = tipLine?.querySelectorAll(`.${CSSSelectors.tip}`);

    if (typeof tipNodeList === 'undefined') {
      fail('tipNodeList equal undefined');
    }

    const [tipFrom, tipBoth, tipTo] = tipNodeList;

    if (!(tipFrom instanceof HTMLDivElement)) {
      fail('tipFrom is not HTMLDivElement');
    }
    if (!(tipBoth instanceof HTMLDivElement)) {
      fail('tipBoth is not HTMLDivElement');
    }
    if (!(tipTo instanceof HTMLDivElement)) {
      fail('tipTo is not HTMLDivElement');
    }

    const pointerDownEvent = new MouseEvent('pointerdown', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    const pointerMoveEvent = new MouseEvent('pointermove', {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: 100,
      clientY: 200,
    });
    const pointerUpEvent = new MouseEvent('pointerup', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    tip.subscribe('changeRunnerPosition', ({ type }) => {
      if (type === 'from') {
        expect(type).toEqual('from');
        return;
      }

      expect(type).toEqual('to');
    });

    tip.subscribe('changeNearRunnerPosition', () => {
      expect(true).toBeTruthy();
    });

    tipFrom.dispatchEvent(pointerDownEvent);
    tipFrom.dispatchEvent(pointerMoveEvent);
    tipFrom.dispatchEvent(pointerUpEvent);

    tipBoth.dispatchEvent(pointerDownEvent);
    tipBoth.dispatchEvent(pointerMoveEvent);
    tipBoth.dispatchEvent(pointerUpEvent);

    tipTo.dispatchEvent(pointerDownEvent);
    tipTo.dispatchEvent(pointerMoveEvent);
    tipTo.dispatchEvent(pointerUpEvent);
  });
});
