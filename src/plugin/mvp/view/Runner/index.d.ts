declare interface IRunner {
  public render({ position, isVertical, zIndex }: IRunnerOptions);
  public destroy(): void;
}

declare interface IRunnerOptions {
  position: number;
  isVertical: boolean;
  zIndex: boolean;
}

declare interface IPosition {
  x: number;
  y: number;
}

declare interface IElementPosition {
  type: 'from' | 'to';
  position: IPosition;
}
