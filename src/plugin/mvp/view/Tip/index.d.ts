declare interface ITip {
  public render({ from, to, isRange, isVertical, leftPosition, rightPosition }: ITipOptions): void;

  public destroy(): void;
}
