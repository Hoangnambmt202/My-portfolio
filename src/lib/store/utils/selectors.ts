import { StoreApi, UseBoundStore } from 'zustand';

// Type-safe selector creator for any state type
export const createSelectors = <S extends Record<string, any>>(
  store: UseBoundStore<StoreApi<S>>
) => {
  const storeIn = store as UseBoundStore<StoreApi<S>>;
  
  // Create the enhanced store type
  type StoreWithSelectors = UseBoundStore<StoreApi<S>> & {
    use: {
      [K in keyof S]: () => S[K];
    };
  };

  const storeOut = storeIn as StoreWithSelectors;

  // Initialize the use object with proper typing
  storeOut.use = {} as {
    [K in keyof S]: () => S[K];
  };
  
  // Get all keys from the initial state
  const initialState = storeIn.getState();
  
  // Create selectors for each state property
  Object.keys(initialState).forEach((key) => {
    const stateKey = key as keyof S;
    (storeOut.use as Record<string, () => unknown>)[stateKey as string] = () => storeIn((state) => state[stateKey]);
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