/**
 * @jest-environment jsdom
 */

import Tip from '.';
import sliderOptions from '../../../App/sliderOptions';

import { ITarget } from '../../../types';

jest.mock('../../../EventEmitter/EventEmitter');

const node = document.createElement('div');

const state = { ...sliderOptions.defaultConfig };
const target: ITarget = { valueIndex: 1 };

let i = 0;
// @ts-ignore
Element.prototype.getBoundingClientRect = jest.fn(() => {
  i += 1;

  if (i === 1) {
    return {
      width: 10,
      height: 10,
      x: 10,
      y: 10,
    };
  }

  if (i === 2) {
    return {
      width: 100,
      height: 100,
      x: 100,
      y: 100,
    };
  }

  return {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  };
});

const tip = new Tip(node, state, target);
tip.render();
const tipLineNode = node.querySelector('div');
let tipsNode = tipLineNode?.querySelectorAll('div');

describe('Значения над бегунками', () => {
  test('должны отображаться с нужным классами', () => {
    expect(tipLineNode?.classList.contains('slider__tip-line')).toBeTruthy();
    tipsNode?.forEach((tipNode) => {
      expect(tipNode.classList.contains('slider__tip')).toBeTruthy();
    });
  });

  test('должны отображаться отдельно', () => {
    const percents = ['40%', '70%'];

    tipsNode?.forEach((tipNode, key) => {
      expect(tipNode.style.left).toEqual(percents[key]);
    });
  });

  test('должны объединиться в одно и разместиться между бегунками', () => {
    tip.render();
    tipsNode = tipLineNode?.querySelectorAll('div');

    tipsNode?.forEach((tipNode) => {
      expect(tipNode.style.left).toEqual('55%');
    });
  });

  test('должны менять класс в вертикальном виде', () => {
    state.isVertical = true;

    tip.render();
    expect(tipLineNode?.classList.contains('slider__tip-line_vertical')).toBeTruthy();
  });

  test('должны удаляться со страницы при уничтожении', () => {
    tip.destroy();
    const emptyNode = node.querySelector('div');

    expect(emptyNode).toBeNull();
  });
});
