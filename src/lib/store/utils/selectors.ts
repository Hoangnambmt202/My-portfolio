import { StoreApi, UseBoundStore } from 'zustand';

// Type-safe selector creator
export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  store: S,
) => {
  const storeIn = store as S;
  const storeOut: S & {
    use: {
      [K in keyof ReturnType<S>]: () => ReturnType<S>[K];
    };
  } = storeIn as unknown as S & {
    use: {
      [K in keyof ReturnType<S>]: () => ReturnType<S>[K];
    };
  };

  Object.keys(storeIn.getState()).forEach((k) => {
    const key = k as keyof ReturnType<S>;
    const selector = () => storeIn((s) => s[key]);
    if (!storeOut.use) storeOut.use = {} as typeof storeOut.use;
    storeOut.use[key] = selector;
  });

  return storeOut;
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
