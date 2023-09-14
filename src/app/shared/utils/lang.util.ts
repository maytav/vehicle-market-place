export function hasValue(value: any): boolean {
  return !!value;
}


export function valueAsArray<T>(valueOrArray?: T | ArrayLike<T>): T[] {
  if (valueOrArray === undefined) {
    return [];
  }
  if (valueOrArray instanceof Array) {
    return valueOrArray as Array<T>;
  }

  return [valueOrArray as T];
}


export const createDescriptor = (value: any) => ({
    value,
    enumerable: false,
    configurable: true,
    writable: true,
  }
);

