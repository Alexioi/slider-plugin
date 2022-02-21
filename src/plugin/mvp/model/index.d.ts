declare interface IModel {
  public updateOptions(config: IConfig): void;

  public getOptions(): IOptions;

  public calculateValueUsingFraction({
    position,
    type,
  }: {
    position: IPosition;
    type: 'from' | 'to';
  }): void;

  public updateNearValue(value: number): void;
}
