declare interface IScale {
  public render({ min, max, isVertical, step }: IScaleOptions): void;
  public destroy(): void;
}
