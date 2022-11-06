import create from 'zustand'

export const useStore = create((set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  removeBear: () => set((state) => ({ bears: state.bears - 1})),
  removeAllBears: () => set({ bears: 0 }),
}));
