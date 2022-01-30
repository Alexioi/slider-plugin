declare interface ITip {
  public render({ from, to, isRange, isVertical, leftPosition, rightPosition }: ITipOptions): void;

  public destroy(): void;
}

declare interface ITipOptions {
  from: number;
  to: number;
  isRange: boolean;
  isVertical: boolean;
  leftPosition: number;
  rightPosition: number;
}
