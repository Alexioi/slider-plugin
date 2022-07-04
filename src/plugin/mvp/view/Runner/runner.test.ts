/**
 * @jest-environment jsdom
 */

import Runner from './Runner';
import sliderOptions from '../../../app/sliderOptions';
import EventEmitter from '../../../EventEmitter/EventEmitter';

const node = document.createElement('div');
const eventEmitter = new EventEmitter();

const runner = new Runner(node, sliderOptions.defaultConfig, eventEmitter, 'from', {
  value: 'from',
});

test('use jsdom in this test file', () => {
  console.log(node.innerHTML);
  expect(node).not.toBeNull();
});

test('use jsdom in this test file', () => {
  runner.render(10);
  console.log(node.innerHTML);
  expect(node).not.toBeNull();
});
