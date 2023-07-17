// import { Model } from '.';
// import { sliderOptions } from '../../App/sliderOptions';
// import { IOptions } from '../../types';

// describe('Model', () => {
//   let options: IOptions = JSON.parse(JSON.stringify(sliderOptions.defaultConfig));
//   const model = new Model(options);

//   beforeEach(() => {
//     options = JSON.parse(JSON.stringify(sliderOptions.defaultConfig));
//     model.updateOptions(options);
//   });

//   it('should calculate value using fraction', () => {
//     const getValues = (): number[] => {
//       const { values } = model.getOptions();
//       return values;
//     };

//     model.calculateValueUsingFraction({ position: 0.1, valueIndex: 0 });
//     expect(getValues()).toEqual([10, 70]);

//     model.calculateValueUsingFraction({ position: 0.8, valueIndex: 1 });
//     expect(getValues()).toEqual([10, 80]);

//     model.calculateValueUsingFraction({ position: 0, valueIndex: 1 });
//     expect(getValues()).toEqual([10, 10]);

//     model.calculateValueUsingFraction({ position: 1, valueIndex: 0 });
//     expect(getValues()).toEqual([10, 10]);

//     model.calculateValueUsingFraction({ position: 0.14, valueIndex: 1 });
//     expect(getValues()).toEqual([10, 10]);

//     model.calculateValueUsingFraction({ position: 0.15, valueIndex: 1 });
//     expect(getValues()).toEqual([10, 20]);
//   });

//   it('should calculate near value using fraction', () => {
//     const getValues = (): number[] => {
//       const { values } = model.getOptions();
//       return values;
//     };

//     model.calculateNearValueUsingFraction(0);
//     expect(getValues()).toEqual([0, 70]);

//     model.calculateNearValueUsingFraction(0.9);
//     expect(getValues()).toEqual([0, 90]);

//     model.calculateNearValueUsingFraction(0.45);
//     expect(getValues()).toEqual([0, 40]);
//   });

//   it('should update near value', () => {
//     const getValues = (): number[] => {
//       const { values } = model.getOptions();
//       return values;
//     };

//     model.updateNearValue(0);
//     expect(getValues()).toEqual([0, 70]);

//     model.updateNearValue(90);
//     expect(getValues()).toEqual([0, 90]);

//     model.updateNearValue(45);
//     expect(getValues()).toEqual([0, 45]);
//   });

//   it('should update value by step', () => {
//     const getValues = (): number[] => {
//       const { values } = model.getOptions();
//       return values;
//     };

//     model.updateValueByStep({ valueIndex: 1, touchRoute: 'up' });
//     expect(getValues()).toEqual([40, 80]);

//     model.updateOptions({ values: [100, 100] });

//     model.updateValueByStep({ valueIndex: 1, touchRoute: 'up' });
//     expect(getValues()).toEqual([100, 100]);

//     model.updateValueByStep({ valueIndex: 1, touchRoute: 'down' });
//     expect(getValues()).toEqual([100, 100]);

//     model.updateOptions({ values: [0, 0] });

//     model.updateValueByStep({ valueIndex: 0, touchRoute: 'up' });
//     expect(getValues()).toEqual([0, 0]);

//     model.updateValueByStep({ valueIndex: 0, touchRoute: 'down' });
//     expect(getValues()).toEqual([0, 0]);

//     model.updateOptions({ isRange: false });

//     model.updateValueByStep({ valueIndex: 1, touchRoute: 'up' });
//     expect(getValues()).toEqual([0, 10]);
//   });
// });
