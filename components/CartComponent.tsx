"use client";
import React, { FC } from "react";
import { PRODUCT_DATA } from "@/config/productExample";
import Image from "next/image";
import Shipping from "@/images/checkout-section/shipping.svg";
import Tax from "@/images/checkout-section/tax.svg";


interface componentProps {
  className?: string;
  showShipping?: boolean;
  showTax?: boolean;
  src?: string;
  alt?: string;
}

const CartComponent: FC<componentProps> = ({
  className,
  showShipping,
  showTax,
  src,
  alt,
}) => {
  return (
    <>
      {showShipping ? (
        <div className="flex my-[15px]">
          <Image src={Shipping} alt={Shipping} />
          <div className="flex flex-col justify-center gap-[10px] ml-[20px]">
            <p className="text-[10px] md:text-[15px] text-silver">Shipping & handling</p>
            <p className="text-[20px] md:text-[25px]">$49,99</p>
          </div>
        </div>
      ) : showTax ? (
        <div className="flex my-[15px]">
          <Image src={Tax} alt={Tax} />
          <div className="flex flex-col justify-center gap-[10px] ml-[20px]">
            <p className="text-[10px] md:text-[15px] text-silver">Tax</p>
            <p className="text-[20px] md:text-[25px]">$00,00</p>
          </div>
        </div>
      ) : (
        <div className="flex my-[15px]">
          <img
            src={PRODUCT_DATA.images[0]}
            alt="Watch"
            className="w-[88px] h-[103px]"
          />
          <div className="flex flex-col justify-center gap-[10px] ml-[20px]">
            <p className="text-[10px] md:text-[15px] text-silver ">{PRODUCT_DATA.title}</p>
            <p className="text-[20px] md:text-[25px]">${PRODUCT_DATA.minPrice}</p>
            <div className="flex text-[10px] text-silver mt-[15px]">
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartComponent;
