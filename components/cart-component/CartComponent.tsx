'use client';

import Image from 'next/image';

import Close from '@/images/cart-component/close.svg';
import CartProduct from './CartProduct';
import Button from '../ButtonComponent';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

const CartComponent = () => {
  const { products, removeFromCart, totalAmount, isOpen, changeOpenState } =
    useCart();

  return (
    <div
      className={`bg-white text-white top-0 right-0 h-screen w-[366px] shadow-lg z-[200] flex flex-col ${
        isOpen ? 'fixed' : 'hidden'
      }`}>
      <div className="bg-pearl flex items-center text-[20px] p-5">
        <h3 className="text-black font-spaceage flex-1 text-center">
          Your Cart
        </h3>
        <button
          className="ml-auto"
          onClick={(e) => {
            e.preventDefault();
            changeOpenState(false);
          }}>
          <Image
            src={Close}
            alt="close button"
            className="object-fit w-3 h-3"
          />
        </button>
      </div>

      <div className="px-5 pt-5 pb-[30px]">
        <ul className="flex flex-col gap-3 mb-[30px]">
          {products.map((product) => (
            <CartProduct key={product.id} card={product} />
          ))}
        </ul>

        <Button text="Add A Matching Item" fullWidth bordered />
      </div>

      <div className="py-6 px-5 bg-pearl flex flex-col gap-[16px] mt-auto">
        <ul className="flex flex-col text-silver gap-2">
          {/* <li className="border-b border-[##ECEDF1] flex items-center justify-between">
            <p className="text-[12px]">Shopping UPS Standard</p>
            <span className="text-[20px] text-black font-normal">$12</span>
          </li>
          <li className="border-b border-[##ECEDF1] flex items-center justify-between">
            <p className="text-[12px]">Discount 15% Off</p>
            <span className="text-[20px] text-black font-normal">$1250</span>
          </li> */}

          <li className="border-b border-[##ECEDF1] flex items-center justify-between">
            <p className="text-[12px]">Grand Total</p>
            <span className="text-[20px] text-black font-normal">
              ${totalAmount}
            </span>
          </li>
        </ul>

        <Link
          href="/checkout"
          className="bg-darkBurgundy w-full rounded-[6px] focus:bg-darkMaroon text-center text-white py-[22px] hover:bg-darkMaroon transition-colors duration-300 ">
          Go To Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartComponent;
