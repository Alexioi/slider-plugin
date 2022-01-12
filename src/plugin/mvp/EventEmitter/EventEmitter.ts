class EventEmitter implements IEventEmitter {
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

  public emit(eventName: string, args: unknown): void {
    const event = this.events[eventName];

    if (event) {
      event.forEach((callback) => callback.call(null, args));
    }
  }
}

export default EventEmitter;
