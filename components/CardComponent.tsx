'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import Basket from '@/images/vectors/basket.svg';
import { CardProps } from '@/config/types';
import { useCart } from '@/hooks/useCart';

const CardComponent: FC<CardProps> = ({
  id,
  handle,
  title,
  price,
  image,
  quantity,
}) => {
  const { addToCart, isOpen, changeOpenState } = useCart();

  const handleAddToBasket = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();

    !isOpen && changeOpenState(true);

    addToCart({
      id: id,
      handle: handle,
      title: title,
      price: +price,
      image: image,
      quantity: 1,
      maxQuantity: quantity,
      caseColor: 'red',
      strapColor: 'red',
    });
  };

  return (
    <div className="flex flex-col items-center font-poppins">
      <div className="relative rounded-md overflow-hidden">
        <Image
          src={image}
          width={255}
          height={300}
          alt={`image of ${title}`}
          className="object-cover w-[255px] h-[300px]"
        />
        <button
          onClick={(e) => handleAddToBasket(e, id)}
          className="absolute font-default rounded-full border border-darkBurgundy w-[50px] h-[50px] z-10 bottom-2 right-2 flex justify-center items-center hover:bg-darkBurgundyOpacity ">
          <Image
            src={Basket}
            width={35}
            height={35}
            alt="basket image"
            className="w-[35px] h-[35px] "
          />
        </button>
      </div>

      <Link
        href={`catalog/${id}`}
        className="mt-5 mb-4 text-silver text-default hover:scale-110 hover:font-bold duration-300">
        {title}
      </Link>
      <span className="font-normal text-xl text-onyx">${price}</span>
    </div>
  );
};

export default CardComponent;
