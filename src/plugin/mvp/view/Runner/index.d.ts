declare interface IRunner {
  public render({ position, isVertical, zIndex }: IRunnerOptions);
  public destroy(): void;
}
