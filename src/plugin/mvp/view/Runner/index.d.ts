declare interface IRunner {
  public render({ position, isVertical, zIndex }: IRunnerOptions);
  public destroy(): void;
}

declare interface IRunnerOptions {
  position: number;
  isVertical: boolean;
  zIndex: boolean;
}
