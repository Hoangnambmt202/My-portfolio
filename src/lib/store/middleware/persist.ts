import { StateCreator } from "zustand";

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

    const store = config((...args) => {
      set(...args);
      saveState(get());
    }, get, api);

    if (typeof window !== "undefined") {
      const persistedState = loadState();
      if (persistedState) {
        Object.assign(store, persistedState);
        onRehydrateStorage?.(store);
      }
    }

    return store;
  };
};