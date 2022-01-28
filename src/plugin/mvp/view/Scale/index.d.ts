declare interface IScale {
  public render({ min, max, isVertical, step }: IScaleOptions): void;
  public destroy(): void;
}

declare interface IScaleOptions {
  min: number;
  max: number;
  isVertical: boolean;
  step: number;
}
