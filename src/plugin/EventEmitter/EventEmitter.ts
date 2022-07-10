import EventNames from '../types/enums';
import { IElementPosition, IOptions } from '../types/types';

type EventObject =
  | {
      eventName: EventNames.UpdatedModelOptions;
      eventArguments: IOptions;
    }
  | {
      eventName: EventNames.ChangedRunnerPosition;
      eventArguments: IElementPosition;
    }
  | {
      eventName: EventNames.ClickScale;
      eventArguments: number;
    }
  | { eventName: 'onChange'; eventArguments: IOptions };

class EventEmitter {
  private events: {
    [key: string]: ((args: any) => void)[];
  };

  constructor() {
    this.events = {};
  }

  public subscribe(eventName: string, callback: (args: any) => void): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);
  }

  public unsubscribe(eventName: string, callback: (args: any) => void): void {
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
