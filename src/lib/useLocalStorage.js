import { writable } from "svelte/store";

export function useLocalStorage(key, initialValue) {
  const stored = localStorage.getItem(key);
  const store = writable(stored ? JSON.parse(stored) : initialValue);

  store.subscribe(value => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  return store;
}