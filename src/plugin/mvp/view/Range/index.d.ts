declare interface IRange {
  public render(rangeOptions: IRangeOptions): void;
}

declare interface IRangeOptions {
  isVertical: boolean;
  positions: number[];
}
