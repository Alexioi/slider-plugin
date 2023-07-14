/**
 * @jest-environment jsdom
 */

import Scale from './Scale';
import sliderOptions from '../../../app/sliderOptions';
import { EventEmitter } from '../../../EventEmitter';

const node = document.createElement('div');
const eventEmitter = new EventEmitter();
const state = { ...sliderOptions.defaultConfig };

const scale = new Scale(node, state, eventEmitter);
scale.render();
const scaleNode = node.querySelector('div');
let markNodes = node.querySelectorAll('span');

describe('Шкала', () => {
  test('и элементы шкалы должны отображаться с нужными классами', () => {
    expect(scaleNode?.classList.contains('slider__scale')).toBeTruthy();
    markNodes.forEach((markNode) => {
      expect(markNode.classList.contains('slider__mark')).toBeTruthy();
    });
  });

  test('должна содержать верное количество элементов при разных значениях длины ', () => {
    const testValues = (length: number, markValues: string[]): void => {
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
        configurable: true,
        value: length,
      });
      scale.render();
      markNodes = node.querySelectorAll('span');

      markNodes.forEach((markNode, key) => {
        expect(markNode.innerText).toEqual(markValues[key]);
      });
    };

    testValues(2000, ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']);
    testValues(700, ['0', '20', '40', '60', '80', '100']);
    testValues(400, ['0', '33', '66', '100']);
    testValues(100, ['0', '100']);
  });

  test('должна удаляться', () => {
    scale.destroy();
    const emptyDivNode = node.querySelector('div');
    const emptySpanNode = node.querySelector('div');

    expect(emptyDivNode?.classList.contains('slider__scale')).not.toBeTruthy();
    expect(emptySpanNode?.classList.contains('slider__mark')).not.toBeTruthy();
  });
});
