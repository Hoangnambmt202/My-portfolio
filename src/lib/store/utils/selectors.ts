import { StoreApi, UseBoundStore } from 'zustand';

// Type-safe selector creator
export const createSelectors = <S>(store: UseBoundStore<StoreApi<S>>) => {
  return {
    use: new Proxy({} as {
      [K in keyof S]: () => S[K];
    }, {
      get: (_, key: string) => store((state) => state[key as keyof S]),
    }),
  };
};

// Shallow comparison utility
export const shallow = <T>(a: T, b: T): boolean => {
  if (Object.is(a, b)) return true;
  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
    return false;
  }
  
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  
  if (keysA.length !== keysB.length) return false;
  
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key) || !Object.is(a[key as keyof T], b[key as keyof T])) {
      return false;
    }
  }
  
  return true;
};
