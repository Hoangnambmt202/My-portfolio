import { StoreApi, UseBoundStore } from 'zustand';

// Type-safe selector creator
export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  store: S,
) => {
  let storeIn = store as S;
  const storeOut: S & {
    use: {
      [K in keyof S extends (...args: any[]) => infer R ? R : never]: () => S extends (
        ...args: any[]
      ) => infer R
        ? R[K]
        : never;
    };
  } = storeIn as any;

  Object.keys(storeIn.getState()).forEach((k) => {
    const key = k as keyof typeof storeIn extends (...args: any[]) => infer R ? R : never;
    const selector = () => storeIn((s) => s[key]);
    if (!storeOut.use) storeOut.use = {} as any;
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
