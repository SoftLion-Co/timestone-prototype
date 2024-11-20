'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import Basket from '@/images/card-component/busket.svg';
import { CardProps } from '@/config/types';
import { useCart } from '@/hooks/useCart';

const CardComponent: FC<CardProps> = ({
  id,
  handle,
  title,
  price,
  image,
  productType,
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
      image: image[0],
      caseColor: 'red',
      strapColor: 'red',
    });
  };

  return (
    <div className="flex flex-col items-center font-poppins">
      <div className="relative group rounded-md overflow-hidden">
        <Image
          src={image[0]}
          width={255}
          height={300}
          alt={`image of ${title}`}
          className="object-cover w-[255px] h-[300px]"
        />
        <div className="absolute hidden top-0 left-0 w-full h-full group-hover:flex items-center justify-center flex-col gap-4 bg-darkBurgundy bg-opacity-85 transition-transform duration-300">
          <Image
            src={Basket}
            width={45}
            height={45}
            alt="basket image"
            className="w-[45px] h-[45px]"
          />
          <button
            onClick={(e) => handleAddToBasket(e, id)}
            className="font-default text-white font-normal hover:underline">
            Order {productType}
          </button>
        </div>
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
