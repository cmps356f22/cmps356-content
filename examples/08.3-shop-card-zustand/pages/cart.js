import useCart from '../store/store';
import Header from '../components/Header';
import { useEffect, useState } from 'react';

export default function Home() {
  const total = useCart((state) => state.total);
  const cart = useCart((state) => state.cartContent);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const [mycart, setCart] = useState([]);
  const [mytotal, setTotal] = useState();
  
  useEffect(() => {
    setCart(cart);
    setTotal(total);
  }, [cart]);

  return (
    <>
      <Header />
      <div className="container mx-auto pt-4">MY CART</div>
      <div className="flex flex-col w-1/2 mx-auto gap-y-1">
        <div className="flex flex-row justify-between ">
          <span className="basis-1/4 uppercase font-bold">Product</span>
          <span className="basis-1/4 text-right uppercase font-bold">
            Price
          </span>
          <span className="basis-1/4 text-right uppercase font-bold">Qty</span>
          <span className="basis-1/4 text-right uppercase font-bold"></span>
        </div>
        {mycart.map((item, key) => (
          <div key={key} className="flex flex-row justify-between ">
            <span className="basis-1/4">{item.name}</span>
            <span className="basis-1/4 text-right">
              $ {item.price * item.quantity}
            </span>
            <span className="basis-1/4 text-right">{item.quantity}</span>
            <span className="basis-1/4 text-right">
              <button
                className="p-2 bg-slate-200"
                onClick={() =>
                  removeFromCart({
                    id: item.id,
                    price: item.price,
                    quantity: item.quantity,
                  })
                }
              >
                X
              </button>
            </span>
          </div>
        ))}
        <div className="flex flex-row justify-between mt-4 border-t-2">
          <span className="basis-full text-right uppercase font-bold">
            Total: ${mytotal}
          </span>
        </div>
      </div>
    </>
  );
}
