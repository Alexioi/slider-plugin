/**
 * @jest-environment jsdom
 */

import Runner from '.';
import sliderOptions from '../../../App/sliderOptions';
import { EventEmitter } from '../../../EventEmitter';
import { ITarget } from '../../../types/types';

jest.mock('../../../EventEmitter/EventEmitter');

const node = document.createElement('div');
const eventEmitter = new EventEmitter();
const state = { ...sliderOptions.defaultConfig };
const target: ITarget = { valueIndex: 1 };

const runner = new Runner(node, state, eventEmitter, 0, target);
runner.render();
const runnerNode = node.querySelector('div');

const eventPointerDown = new Event('pointerdown');
const eventPointerMove = new Event('pointermove');
const eventPointerUp = new Event('pointerup');

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
    target.valueIndex = 0;
    runner.render();

    expect(runnerNode?.classList.contains('slider__runner_targeted')).toBeTruthy();
  });

  test('должен менять ориентацию', () => {
    state.isVertical = true;
    runner.render();

    expect(runnerNode?.style.top).toEqual('40%');
  });

  test('должен не отправлять событие в event emitter, если не было перемещение курсора', () => {
    runnerNode?.dispatchEvent(eventPointerDown);
    document.dispatchEvent(eventPointerUp);

    // @ts-ignore
    const mockEventEmitterInstance = EventEmitter.mock.instances[0];
    const mockEmit = mockEventEmitterInstance.emit;

    expect(mockEmit.mock.calls[0]).toBeUndefined();
  });

  test('должен вызывать событие в event emitter, если было перемещение курсора и менять таргет', () => {
    target.valueIndex = 1;
    runnerNode?.dispatchEvent(eventPointerDown);
    document.dispatchEvent(eventPointerMove);

    // @ts-ignore
    const mockEventEmitterInstance = EventEmitter.mock.instances[0];
    const mockEmit = mockEventEmitterInstance.emit;

    expect(mockEmit.mock.calls[0]).toEqual([
      { eventName: 'ChangedRunnerPosition', eventArguments: { position: NaN, valueIndex: 0 } },
    ]);
  });

  test('должен удаляться со страницы при уничтожении', () => {
    runner.destroy();
    const emptyNode = node.querySelector('div');

    expect(emptyNode).toBeNull();
  });
});
