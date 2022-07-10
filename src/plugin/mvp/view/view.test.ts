/**
 * @jest-environment jsdom
 */

import View from './View';
import sliderOptions from '../../app/sliderOptions';
import EventEmitter from '../../EventEmitter/EventEmitter';
import Tip from './Tip/Tip';
import Runner from './Runner/Runner';
import Range from './Range/Range';
import Scale from './Scale/Scale';

jest.mock('../../EventEmitter/EventEmitter');
jest.mock('./Range/Range.ts');
jest.mock('./Runner/Runner.ts');
jest.mock('./Scale/Scale.ts');
jest.mock('./Tip/Tip.ts');

const node = document.createElement('div');
const eventEmitter = new EventEmitter();
const state = { ...sliderOptions.defaultConfig };

const view = new View(node, state, eventEmitter);
view.render(state);
const viewNodes = node.querySelectorAll('div');

describe('Вид', () => {
  test('должен отображаться с нужным классом', () => {
    expect(viewNodes[0]?.classList.contains('slider')).toBeTruthy();
  });

  test('должен содержать контейнер', () => {
    expect(viewNodes[1]?.classList.contains('slider__bar-container')).toBeTruthy();
  });

  test('должен вызывать рендеринг шкалы и значений над бегунками', () => {
    // @ts-ignore
    expect(Scale.mock.instances[0].render.mock.calls.length).toEqual(1);
    // @ts-ignore
    expect(Tip.mock.instances[0].render.mock.calls.length).toEqual(1);
  });

  test('должен содержать дополнительный класс для вертикального вида', () => {
    state.isVertical = true;
    view.render(state);

    expect(viewNodes[0]?.classList.contains('slider_vertical')).toBeTruthy();
  });

  test('должен удалять ненужные элементы', () => {
    state.hasTip = false;
    state.hasScale = false;
    state.isRange = false;
    view.render(state);

    // @ts-ignore
    expect(Runner.mock.instances[0].destroy.mock.calls.length).toEqual(1);
    // @ts-ignore
    expect(Scale.mock.instances[0].destroy.mock.calls.length).toEqual(1);
    // @ts-ignore
    expect(Tip.mock.instances[0].destroy.mock.calls.length).toEqual(1);
  });
  //   test('должен иметь верное смещение', () => {
  //     expect(runnerNode?.style.left).toEqual('40%');
  //   });
  //   test('не должен содержать класса targeted, если выбран другой ползунок', () => {
  //     expect(runnerNode?.classList.contains('slider__runner_targeted')).not.toBeTruthy();
  //   });
  //   test('должен содержать класса targeted, если выбран этот ползунок', () => {
  //     target.value = 'from';
  //     runner.render();
  //     expect(runnerNode?.classList.contains('slider__runner_targeted')).toBeTruthy();
  //   });
  //   test('должен менять ориентацию', () => {
  //     state.isVertical = true;
  //     runner.render();
  //     expect(runnerNode?.style.top).toEqual('40%');
  //   });
  //   test('должен не отправлять событие в event emitter, если не было перемещение курсора', () => {
  //     runnerNode?.dispatchEvent(eventPointerDown);
  //     document.dispatchEvent(eventPointerUp);
  //     // @ts-ignore
  //     const mockEventEmitterInstance = EventEmitter.mock.instances[0];
  //     const mockEmit = mockEventEmitterInstance.emit;
  //     expect(mockEmit.mock.calls[0]).toBeUndefined();
  //   });
  //   test('должен вызывать событие в event emitter, если было перемещение курсора и менять таргет', () => {
  //     target.value = 'to';
  //     runnerNode?.dispatchEvent(eventPointerDown);
  //     document.dispatchEvent(eventPointerMove);
  //     // @ts-ignore
  //     const mockEventEmitterInstance = EventEmitter.mock.instances[0];
  //     const mockEmit = mockEventEmitterInstance.emit;
  //     expect(mockEmit.mock.calls[0]).toEqual([
  //       'ChangedRunnerPosition',
  //       { position: { x: NaN, y: NaN }, type: 'from' },
  //     ]);
  //   });
});
