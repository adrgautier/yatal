import expectType from '../src';

expectType<'one'>().not.toEqual<string>().toBe<string>().not.toOverlap<'two'>();

expectType('one').toEqual<string>().toBe<string>().toOverlap<'two'>();

expectType<string>().not.toBe<'one'>();
expectType<never>().toOverlap<string>();
expectType<void>().toOverlap<never>();
expectType<string | number>()
  .toEqual<string | number>()
  .not.toOverlap<object | void>()
  .not.toEqual<never>();
expectType<string | number>()
  .not.toBe<never>()
  .not.toEqual<string | void>()
  .toOverlap<string | void>();

expectType<never>().toBeNever();

expectType(Symbol()).toBeSymbol().not.toBeNumber();

expectType(() => () => 'string')
  .toBeFunction()
  .returns.returns.toBe<string>()
  .returns.not.toBe<number>()
  .parameters.toEqual<[]>();
