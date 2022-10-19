import { IElementPosition, IElementTouch, IOptions } from '../types/types';

type EventObject =
  | {
      eventName: 'UpdatedModelOptions';
      eventArguments: IOptions;
    }
  | {
      eventName: 'UpdatedModelValues';
      eventArguments: IOptions;
    }
  | {
      eventName: 'ChangedRunnerPosition';
      eventArguments: IElementPosition;
    }
  | {
      eventName: 'ClickScale';
      eventArguments: number;
    }
  | { eventName: 'onChange'; eventArguments: IOptions }
  | { eventName: 'ChangedRunnerPositionStep'; eventArguments: IElementTouch }
  | { eventName: 'ChangedNearRunnerPosition'; eventArguments: { position: number } };

type EventNames =
  | 'UpdatedModelOptions'
  | 'UpdatedModelValues'
  | 'ChangedRunnerPosition'
  | 'ClickScale'
  | 'onChange'
  | 'ChangedRunnerPositionStep'
  | 'ChangedNearRunnerPosition';

class EventEmitter {
  private events: {
    [key: string]: ((args: any) => void)[];
  };

  constructor() {
    this.events = {};
  }

  public subscribe(eventName: EventNames, callback: (args: any) => void): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);
  }

  public unsubscribe(eventName: EventNames, callback: (args: any) => void): void {
    this.events[eventName] = this.events[eventName].filter(
      (eventCallback) => callback !== eventCallback,
    );
  }

  public emit({ eventName, eventArguments }: EventObject): void {
    const event = this.events[eventName];

    if (event) {
      event.forEach((callback) => callback.call(null, eventArguments));
    }
  }
}

export default EventEmitter;
