import { StateCreator } from 'zustand';

export interface PersistOptions<T> {
  name: string;
  storage?: Storage;
  partialize?: (state: T) => Partial<T>;
  onRehydrateStorage?: (state: T) => void;
}

export const persist = <T>(
  config: StateCreator<T>,
  options: PersistOptions<T>
): StateCreator<T> => {
  return (set, get, api) => {
    const { name, storage = typeof window !== "undefined" ? localStorage : undefined, partialize, onRehydrateStorage } = options;

    const saveState = (state: T) => {
      if (!storage) return;
      try {
        const stateToSave = partialize ? partialize(state) : state;
        storage.setItem(name, JSON.stringify(stateToSave));
      } catch (error) {
        console.warn(`Failed to save state to ${name}:`, error);
      }
    };

    const loadState = (): Partial<T> | null => {
      if (!storage) return null;
      try {
        const item = storage.getItem(name);
        if (item) return JSON.parse(item);
      } catch (error) {
        console.warn(`Failed to load state from ${name}:`, error);
      }
      return null;
    };

    // Create a wrapper for the set function that saves state after each update
    const enhancedSet: typeof set = (partial, replace) => {
      if (replace === true) {
        // Handle replace = true case
        set(partial as T, true);
      } else {
        // Handle replace = false or undefined case
        set(partial, false);
      }
      // Save state after setting
      setTimeout(() => saveState(get()), 0);
    };

    const store = config(enhancedSet, get, api);

    // Load persisted state on initialization
    if (typeof window !== "undefined") {
      const persistedState = loadState();
      if (persistedState) {
        // Merge persisted state with initial state
        const currentState = get();
        const mergedState = { ...currentState, ...persistedState };
        set(mergedState as T, true);
        onRehydrateStorage?.(mergedState as T);
      }
    }

    return store;
  };
};