import create from 'zustand';
import { persist } from 'zustand/middleware';
const useCart = create(
  persist(
    (set, get) => ({
      total: 0,
      totalqty: 0,
      cartContent: [],
      addTocart: (params) => {
        set((state) => ({
          totalqty: state.totalqty + 1,
          total: state.total + parseFloat(params.price),
          cartContent: [...state.cartContent, params],
        }));
      },
      updatecart: ({ params, mycart }) => {
        set((state) => ({
          totalqty: state.totalqty + 1,
          total: state.total + parseFloat(params.price),
          cartContent: mycart,
        }));
      },
      clearCart: () => set({ totalqty: 0, total: 0, cartContent: [] }),
      removeFromCart: (params) =>
        set((state) => ({
          total: state.total - params.price * params.quantity,
          totalqty: state.totalqty - params.quantity,
          cartContent: state.cartContent.filter(
            (item) => item.id !== params.id
          ),
        })),
    }),
    { name: 'cart' }
  )
);
export default useCart;
