// import { Validator } from '.';
// import { sliderOptions } from '../../../App/sliderOptions';
// import { IOptions } from '../../../types';

// describe('Validator', () => {
//   let options: IOptions = JSON.parse(JSON.stringify(sliderOptions.defaultConfig));
//   const trackingOptions = { options };
//   const validator = new Validator(trackingOptions.options);

//   beforeEach(() => {
//     options = JSON.parse(JSON.stringify(sliderOptions.defaultConfig));
//     validator.validateOptions(options);
//   });

//   it('should change options: isRange, isVertical, hasTip, hasScale if them type is boolean', () => {
//     const getBooleanOptions = (): boolean[] => {
//       const { isRange, isVertical, hasTip, hasScale } = trackingOptions.options;

//       return [isRange, isVertical, hasTip, hasScale];
//     };

//     validator.validateOptions({ isRange: true, isVertical: true, hasTip: true, hasScale: true });
//     expect(getBooleanOptions()).toEqual([true, true, true, true]);

//     // @ts-ignore
//     validator.validateOptions({ isRange: '', isVertical: '', hasTip: '', hasScale: '' });
//     expect(getBooleanOptions()).toEqual([true, true, true, true]);

//     // @ts-ignore
//     validator.validateOptions({ isRange: 0, isVertical: 0, hasTip: 0, hasScale: 0 });
//     expect(getBooleanOptions()).toEqual([true, true, true, true]);

//     // @ts-ignore
//     validator.validateOptions({
//       isRange: undefined,
//       isVertical: undefined,
//       hasTip: undefined,
//       hasScale: undefined,
//     });
//     expect(getBooleanOptions()).toEqual([true, true, true, true]);

//     validator.validateOptions({
//       isRange: false,
//       isVertical: false,
//       hasTip: false,
//       hasScale: false,
//     });
//     expect(getBooleanOptions()).toEqual([false, false, false, false]);

//     // @ts-ignore
//     validator.validateOptions({ isRange: '1', isVertical: '1', hasTip: '1', hasScale: '1' });
//     expect(getBooleanOptions()).toEqual([false, false, false, false]);

//     // @ts-ignore
//     validator.validateOptions({ isRange: 1, isVertical: 1, hasTip: 1, hasScale: 1 });
//     expect(getBooleanOptions()).toEqual([false, false, false, false]);
//   });

//   it('should change step if step value is number', () => {
//     const getStep = (): number => {
//       const { step } = trackingOptions.options;

//       return step;
//     };

//     // @ts-ignore
//     validator.validateOptions({ step: 'ii' });
//     expect(getStep()).toEqual(10);

//     validator.validateOptions({ step: 1 });
//     expect(getStep()).toEqual(1);

//     validator.validateOptions({ step: 101 });
//     expect(getStep()).toEqual(100);

//     validator.validateOptions({ max: 99 });
//     expect(getStep()).toEqual(99);

//     validator.validateOptions({ step: 0.5 });
//     expect(getStep()).toEqual(0.5);
//   });

//   it('should change min and max if min and max values are numbers', () => {
//     const getMinAndMax = (): number[] => {
//       const { min, max } = trackingOptions.options;

//       return [min, max];
//     };

//     // @ts-ignore
//     validator.validateOptions({ min: '', max: '' });
//     expect(getMinAndMax()).toEqual([0, 100]);

//     // @ts-ignore
//     validator.validateOptions({ min: false, max: true });
//     expect(getMinAndMax()).toEqual([0, 100]);

//     validator.validateOptions({ min: undefined, max: undefined });
//     expect(getMinAndMax()).toEqual([0, 100]);

//     validator.validateOptions({ min: -100, max: 50 });
//     expect(getMinAndMax()).toEqual([-100, 50]);

//     validator.validateOptions({ min: 1000, max: 50 });
//     expect(getMinAndMax()).toEqual([50, 1000]);

//     validator.validateOptions({ min: undefined, max: 150 });
//     expect(getMinAndMax()).toEqual([50, 150]);

//     validator.validateOptions({ min: -100, max: undefined });
//     expect(getMinAndMax()).toEqual([-100, 150]);

//     validator.validateOptions({ min: 1000, max: undefined });
//     expect(getMinAndMax()).toEqual([150, 1000]);

//     validator.validateOptions({ min: 1000, max: 1000 });
//     expect(getMinAndMax()).toEqual([1000, 1001]);
//   });

//   it('should change values if values are numbers', () => {
//     const getValues = (): number[] => {
//       const { values } = trackingOptions.options;
//       return values;
//     };

//     validator.validateOptions({ values: undefined });
//     expect(getValues()).toEqual([40, 70]);

//     // @ts-ignore
//     validator.validateOptions({ values: '' });
//     expect(getValues()).toEqual([40, 70]);

//     // @ts-ignore
//     validator.validateOptions({ values: ['', 80] });
//     expect(getValues()).toEqual([40, 80]);

//     // @ts-ignore
//     validator.validateOptions({ values: [30, true] });
//     expect(getValues()).toEqual([30, 80]);

//     validator.validateOptions({ values: [-10, 110] });
//     expect(getValues()).toEqual([0, 100]);

//     validator.validateOptions({ values: [50, 50] });
//     expect(getValues()).toEqual([50, 50]);

//     validator.validateOptions({ values: [51, 50] });
//     expect(getValues()).toEqual([50, 51]);

//     // @ts-ignore
//     validator.validateOptions({ values: ['', 10] });
//     expect(getValues()).toEqual([10, 50]);
//   });
// });
