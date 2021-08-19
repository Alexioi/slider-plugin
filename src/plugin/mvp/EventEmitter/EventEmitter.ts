class EventEmitter {
  private events: {
    [key: string]: ((args: unknown) => void)[];
  };

  constructor() {
    this.events = {};
  }

  subscribe(eventName: string, callback: (args: unknown) => void): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);
  }

  unsubscribe(eventName: string, callback: (args: unknown) => void): void {
    this.events[eventName] = this.events[eventName].filter(
      (eventCallback) => callback !== eventCallback
    );
  }

  emit(eventName: string, args: unknown): void {
    const event = this.events[eventName];

    if (event) {
      event.forEach((callback) => callback.call(null, args));
    }
  }
}

export default EventEmitter;