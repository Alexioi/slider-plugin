/**
 * @jest-environment jsdom
 */

import Tip from './Tip';
import sliderOptions from '../../../app/sliderOptions';
import EventEmitter from '../../../EventEmitter/EventEmitter';

jest.mock('../../../EventEmitter/EventEmitter');

const node = document.createElement('div');
const eventEmitter = new EventEmitter();
const state = { ...sliderOptions.defaultConfig };

const tip = new Tip(node, state, eventEmitter);
tip.render();
const tipLineNode = node.querySelector('div');
const tipNode = tipLineNode?.querySelector('div');

describe('Значения над бегунками', () => {
  test('должны отображаться с нужным классами', () => {
    expect(tipLineNode?.classList.contains('slider__tip-line')).toBeTruthy();
    expect(tipNode?.classList.contains('slider__tip')).toBeTruthy();
  });

  test('должны объединиться в одно и разместиться между бегунками', () => {
    expect(tipNode?.style.left).toEqual('55%');
  });

  test('должны менять класс в вертикальном виде', () => {
    state.isVertical = true;

    tip.render();
    expect(tipNode?.classList.contains('slider__tip-line_vertical')).not.toBeTruthy();
  });

  test('должны удаляться со страницы при уничтожении', () => {
    tip.destroy();
    const emptyNode = node.querySelector('div');

    expect(emptyNode).toBeNull();
  });
});
