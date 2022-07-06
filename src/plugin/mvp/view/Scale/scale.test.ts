/**
 * @jest-environment jsdom
 */

import Scale from './Scale';
import sliderOptions from '../../../app/sliderOptions';
import EventEmitter from '../../../EventEmitter/EventEmitter';

const node = document.createElement('div');
const eventEmitter = new EventEmitter();
const state = { ...sliderOptions.defaultConfig };

const scale = new Scale(node, state, eventEmitter);
scale.render();
const scaleNode = node.querySelector('div');
const markNodes = node.querySelectorAll('span');

describe('Шкала и элементы шкалы', () => {
  test('должены отображаться с нужными классами', () => {
    expect(scaleNode?.classList.contains('slider__scale')).toBeTruthy();
    markNodes.forEach((markNode) => {
      expect(markNode.classList.contains('slider__mark')).toBeTruthy();
    });
  });
  console.log(node?.innerHTML);

  test('должены удаляться', () => {
    scale.destroy();
    const emptyDivNode = node.querySelector('div');
    const emptySpanNode = node.querySelector('div');

    expect(emptyDivNode?.classList.contains('slider__scale')).not.toBeTruthy();
    expect(emptySpanNode?.classList.contains('slider__mark')).not.toBeTruthy();
  });
});
