import create from 'zustand'
import {persist, devtools} from "zustand/middleware"

// and modify our existing state
let store = (set) => ({
  fruits: ["apple", "banana", "orange"],
  addFruit: (fruit) => {
    set((state) => ({
      fruits: [...state.fruits, fruit],
    }));
  },
});

// persist the created state
store = persist(store, {name: "basket"})
store = devtools(store);

// create the store
export const useStore = create(store);