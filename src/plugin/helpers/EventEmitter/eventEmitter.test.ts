import { EventEmitter } from '.';

const eventEmitter = new EventEmitter();

const makeCounter = () => {
  let i = 0;
  return (print?: true) => {
    if (print) {
      return i;
    }
    i += 1;
    return i;
  };
};

const counter = makeCounter();

describe('Оповещатель', () => {
  test('должен вызывать подписанную функцию', () => {
    // @ts-ignore
    eventEmitter.subscribe('testEvent', counter);
    // @ts-ignore
    eventEmitter.emit({ eventName: 'testEvent' });
    expect(counter(true)).toEqual(1);
  });

  test('должен не вызывать функцию после отписки', () => {
    // @ts-ignore
    eventEmitter.unsubscribe('testEvent', counter);
    // @ts-ignore
    eventEmitter.emit({ eventName: 'testEvent' });
    expect(counter(true)).toEqual(1);
  });
});
