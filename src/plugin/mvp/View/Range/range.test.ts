/**
 * @jest-environment jsdom
 */

import Range from '.';
import sliderOptions from '../../../App/sliderOptions';
import { EventEmitter } from '../../../EventEmitter';

const node = document.createElement('div');
const eventEmitter = new EventEmitter();
const state = { ...sliderOptions.defaultConfig };

const range = new Range(node, state, eventEmitter);
range.render();
const rangeNode = node.querySelector('div');

describe('Диапазон', () => {
  test('должен отображаться с нужным классом', () => {
    expect(rangeNode?.classList.contains('slider__range')).toBeTruthy();
  });

  test('должен иметь верное смещение', () => {
    expect(rangeNode?.style.left).toEqual('40%');
    expect(rangeNode?.style.right).toEqual('30%');
  });

  test('должен менять ориентацию', () => {
    state.isVertical = true;
    range.render();

    expect(rangeNode?.style.top).toEqual('40%');
    expect(rangeNode?.style.bottom).toEqual('30%');
  });

  test('должен стартовать с начала бара при наличии одного ползунка', () => {
    state.isRange = false;
    range.render();

    expect(rangeNode?.style.top).toEqual('0%');
  });
});
