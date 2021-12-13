type Func = (...args: any) => any;

type TypeEqual<Target, Value> = (<T>() => T extends Target ? 1 : 2) extends <
  T
>() => T extends Value ? 1 : 2
  ? true
  : false;

type TypeMatch<Target, Value> = Exclude<Value, Target> extends never
  ? true
  : false;

type TypeOverlap<Target, Value> = Target & Value extends never
  ? TypeEqual<never, Value> extends false
    ? TypeEqual<never, Target> extends false
      ? false
      : true
    : true
  : true;

type BaseAssertions<V, W = V, A extends boolean = true> = {
  /**
   * `toBe` ensures the input type can be associated to the target type.
   *
   * ### Troubleshoot
   * `this` should not expect the type `never`:
   * >```ts
   * >toBe: <T>(this: never) => H<V>
   * >```
   *
   * If it does like above, you must make the opposite assertion.
   */
  toBe: <T>(
    this: TypeMatch<T, W> extends A ? Assertions<V, W, A> : never
  ) => Assertions<V>;
  /**
   * `toEqual` ensures the input type equal exactly the target type.
   *
   * ### Troubleshoot
   * `this` should not expect the type `never`:
   * >```ts
   * >toEqual: <T>(this: never) => H<V>
   * >```
   *
   * If it does like above, you must make the opposite assertion.
   */
  toEqual: <T>(
    this: TypeEqual<T, W> extends A ? Assertions<V, W, A> : never
  ) => Assertions<V>;
  /**
   * `toOverlap` ensures the input type have something in common with the target type.
   *
   * ### Troubleshoot
   * `this` should not expect the type `never`:
   * >```ts
   * >toOverlap: <T>(this: never) => H<V>
   * >```
   *
   * If it does like above, you must make the opposite assertion.
   */
  toOverlap: <T>(
    this: TypeOverlap<T, W> extends A ? Assertions<V, W, A> : never
  ) => Assertions<V>;
  /*
   * Shortcuts
   */
  toBeUnknown: (
    this: TypeMatch<unknown, W> extends A ? Assertions<V, W, A> : never
  ) => Assertions<V>;
  toBeObject: (
    this: TypeMatch<object, W> extends A ? Assertions<V, W, A> : never
  ) => Assertions<V>;
  toBeFunction: (
    this: TypeMatch<Function, W> extends A ? Assertions<V, W, A> : never
  ) => Assertions<V>;
  toBeArray: (
    this: TypeMatch<Array<unknown>, W> extends A ? Assertions<V, W, A> : never
  ) => Assertions<V>;
  toBeString: (
    this: TypeMatch<string, W> extends A ? Assertions<V, W, A> : never
  ) => Assertions<V>;
  toBeNumber: (
    this: TypeMatch<number, W> extends A ? Assertions<V, W, A> : never
  ) => Assertions<V>;
  toBeBoolean: (
    this: TypeMatch<boolean, W> extends A ? Assertions<V, W, A> : never
  ) => Assertions<V>;
  toBeSymbol: (
    this: TypeMatch<symbol, W> extends A ? Assertions<V, W, A> : never
  ) => Assertions<V>;
  toBeVoid: (
    this: TypeMatch<void, W> extends A ? Assertions<V, W, A> : never
  ) => Assertions<V>;
  toBeNever: (
    this: TypeMatch<never, V> extends A ? Assertions<V, W, A> : never
  ) => A extends true ? never : Assertions<V>;
};

type Assertions<V, W = V, A extends boolean = true> = {
  not: A extends true ? NotAssertions<V, W> : undefined;
  returns: A extends true
    ? W extends Func
      ? Assertions<V, ReturnType<W>>
      : undefined
    : undefined;
  parameters: A extends true
    ? W extends Func
      ? Assertions<V, Parameters<W>>
      : undefined
    : undefined;
} & BaseAssertions<V, W, A>;

type NotAssertions<V, W> = Assertions<V, W, false>;

/**
 * `expectType` aims to create the assertion.
 *
 * ### Troubleshoot
 * You may encounter the following errors:
 * `... is not assignable to method's 'this' of type 'never'. ts(2684)`
 *
 * That means an assertion is not satisfied and must be inverted.
 */
function expectType<V>(v?: V): Assertions<V>;
function expectType(v: unknown) {
  return {};
}

export default expectType;
