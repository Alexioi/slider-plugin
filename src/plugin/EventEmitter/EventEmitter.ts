import { IElementPosition, IOptions, ITarget } from '../types/types';

type EventObject =
  | {
      eventName: 'UpdatedModelOptions';
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
  | { eventName: 'ChangedRunnerPositionStepUp'; eventArguments: ITarget }
  | { eventName: 'ChangedRunnerPositionStepDown'; eventArguments: ITarget };

type EventNames =
  | 'UpdatedModelOptions'
  | 'ChangedRunnerPosition'
  | 'ClickScale'
  | 'onChange'
  | 'ChangedRunnerPositionStepUp'
  | 'ChangedRunnerPositionStepDown';

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
