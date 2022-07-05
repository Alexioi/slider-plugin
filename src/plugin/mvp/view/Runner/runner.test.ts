/**
 * @jest-environment jsdom
 */

import Runner from './Runner';
import sliderOptions from '../../../app/sliderOptions';
import EventEmitter from '../../../EventEmitter/EventEmitter';
import { ITarget } from '../../../types/types';

const node = document.createElement('div');
const eventEmitter = new EventEmitter();
const state = { ...sliderOptions.defaultConfig };
const target: ITarget = { value: 'to' };

const runner = new Runner(node, state, eventEmitter, 'from', target);
runner.render();
const runnerNode = node.querySelector('div');

describe('Ползунок', () => {
  test('должен отображаться с нужным классом', () => {
    expect(runnerNode?.classList.contains('slider__runner')).toBeTruthy();
  });

  test('должен иметь верное смещение', () => {
    expect(runnerNode?.style.left).toEqual('40%');
  });

  test('не должен содержать класса targeted, если выбран другой ползунок', () => {
    expect(runnerNode?.classList.contains('slider__runner_targeted')).not.toBeTruthy();
  });

  test('должен содержать класса targeted, если выбран этот ползунок', () => {
    target.value = 'from';
    runner.render();

    expect(runnerNode?.classList.contains('slider__runner_targeted')).toBeTruthy();
  });

  test('должен менять ориентацию', () => {
    state.isVertical = true;
    runner.render();

    expect(runnerNode?.style.top).toEqual('40%');
  });

  test('должен должен удаляться со страницы при уничтожении', () => {
    runner.destroy();
    const emptyNode = node.querySelector('div');

    expect(emptyNode).toBeNull();
  });
});
