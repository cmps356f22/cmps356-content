import create from 'zustand'
import {persist, devtools} from "zustand/middleware"

let store = (set) => ({
  fruits: ["apple", "banana", "orange"],
  addFruit: (fruit) => {
    set((state) => ({
      fruits: [...state.fruits, fruit],
    }));
  },
});

// persist the created state
store = persist(store, {name: "FruitsStore"})
store = devtools(store, {name: "FruitsStore"});

// create the store
export const useStore = create(store);