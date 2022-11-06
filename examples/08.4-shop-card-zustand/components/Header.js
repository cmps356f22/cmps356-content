import React from 'react';
import useCart from '../store/store';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const total = useCart((state) => state.total);
  const totalqty = useCart((state) => state.totalqty);

  const clearCart = useCart((state) => state.clearCart);
  const [mytotal, setTotal] = useState();
  const [mytotalqty, setTotalqty] = useState();

  useEffect(() => {
    setTotal(total);
    setTotalqty(totalqty);
  }, [total]);
  
  return (
    <div className="w-full bg-slate-200 py-4 ">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link href="/">
            <a className="font-extrabold">MY-COOL-SHOP</a>
          </Link>
        </div>
        <div className="font-light uppercase">
          <Link href="/about">
            <a>About</a>
          </Link>
          &nbsp; |&nbsp;
          <Link href="/cart">
            <a>Cart</a>
          </Link>
          : ${mytotal} / {mytotalqty}
        </div>
      </div>
    </div>
  );
};

export default Header;
