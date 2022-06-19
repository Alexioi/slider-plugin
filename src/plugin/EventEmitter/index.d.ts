declare interface IEventEmitter {
  public subscribe(eventName: string, callback: (args: any) => void): void;

  public unsubscribe(eventName: string, callback: (args: any) => void): void;

  public emit(eventName: string, args: unknown): void;
}
