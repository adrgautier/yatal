# Yet Another Type Assertion Library

An attempt to make TypeScript type assertions easier.

> Because of TypeScript constaints, I ended up writing almost the same implementation as [expect-type](https://www.npmjs.com/package/expect-type).

## Writing an assertion

You can start writing the assertion either by passing a **value** or a **type**.

```ts
expectType(someValue);
expectType<SomeType>();
```

## `toBe<T>()`

`toBe` ensures the input type can be associated to the target type.

```ts
expectType("one").toBe<string>();
```

## `toEqual<T>()`

`toEqual` ensures the input type equal exactly the target type.

```ts
expectType("one").not.toEqual<string>();
```

> That means `toEqual` is more strict than `toBe`.

## `toOverlap<T>()`

`toOverlap` ensures the input type have something in common with the target type.

## Troubleshoot

You may encounter the following errors:   
`... is not assignable to method's 'this' of type 'never'. ts(2684)`   
 
That means an assertion is not satisfied and must be inverted.