import React from 'react';

import Image from 'next/image';

import { CartProductProps } from '@/config/types';
import { useCart } from '@/hooks/useCart';

import Delete from '@/images/cart-component/delete.svg';

const CartProduct = ({ card }: { card: CartProductProps }) => {
  const { products, removeFromCart, changeOpenState } = useCart();

  const onHandleClickDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();

    removeFromCart(id);

    products.length == 1 && changeOpenState(false);
  };

  // прибрати кнопку add a matching item

  return (
    <li className="text-black pb-[15px] border-b border-[#ECEDF1] flex gap-[15px] items-center">
      <Image
        src={card.image}
        alt={`${card.title} - photo`}
        width={88}
        height={103}
        className="object-fit rounded-md w-[88px] h-[103px]"
      />

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <h4 className="text-[12px] text-silver">{card.title}</h4>
          <button onClick={(e) => onHandleClickDelete(e, card.id)}>
            <Image
              src={Delete}
              alt="delete button"
              className="object-fit h-5 w-5 hover:scale-110 duration-300"
            />
          </button>
        </div>

        <span className="text-black text-[20px] mb-[15px]">${card.price}</span>

        <div>
          <ul className="flex gap-[25px] items-center">
            <li className="flex items-center gap-[7px]">
              <div className={`w-5 h-5 rounded-md bg-darkMaroon`}></div>
              <span className="text-[12px] text-silver">Case Color</span>
            </li>
            <li className="flex items-center gap-[7px]">
              <div className={`w-5 h-5 rounded-md bg-darkMaroon`}></div>
              <span className="text-[12px] text-silver">Strap Color</span>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
};

export default CartProduct;
