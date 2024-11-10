"use client";
import React, { FC, useEffect, useState } from "react";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import Button from "@/components/ButtonComponent";
import Image from "next/image";
import { PRODUCT_DATA } from "@/test/productExample";
import LeftArrow from "@/images/product-page/arrow-left.svg";
import RightArrow from "@/images/product-page/arrow-right.svg";
import TitleComponents from "@/components/TitleComponents";
import { Product } from "@/config/types";
import { NumberInput } from "@mantine/core";

interface productProps {
  productData: Product 

// const slides = PRODUCT_DATA.images.slice(1).map((item, index) => (
//   <Carousel.Slide key={index}>
//     <img src={item} width={350} height={365} alt={`Image${index + 1}`} />
//   </Carousel.Slide>
// ));

const ProductSection: FC<productProps> = ({ productData }) => {
  const [isOutOfStock, setIsOutOfStock] = useState<boolean>(false);
  const [maxQuantity, setMaxQuantity] = useState<number>();
  const [quantity, setQuantity] = useState<number>();

  useEffect(() => { 
      setQuantity( 
        productData.quantity && 
          productData.quantity > 0 
          ? 1 
          : 0 
      ); 
      setIsOutOfStock(productData.quantity === 0); 
      setMaxQuantity(productData.quantity || 0); 
  }, []);

  return (
    <section>
      <TitleComponents
        text="products"
        additionalText="Products / Product Number One"
      />
      <div className="container flex flex-col md:flex-row gap-[100px] justify-items-center py-[30px] xl:py-[65px]">
        <div className="hidden xl:block xl:flex xl:flex-wrap xl:flex-row xl:gap-[30px]">
          {productData?.images.slice(1).map((item, index) => (
            <img
              key={index}
              src={item}
              width={350}
              height={365}
              alt={`Image${index + 1}`}
            />
          ))}
        </div>

        <div className="w-[350px] mx-auto xl:hidden">
          <Carousel
            slideSize={100}
            height={200}
            slideGap="xl"
            loop
            dragFree
            previousControlIcon={
              <Image
                src={LeftArrow}
                alt="LeftArrow"
                width={80}
                className="my-[30px] ml-[50px] md:ml-[20px]"
              />
            }
            nextControlIcon={
              <Image
                src={RightArrow}
                alt="RightArrow"
                width={80}
                className="my-[30px] mr-[50px] md:mr-[20px]"
              />
            }
          >
            {/* {slides} */}
          </Carousel>
        </div>
        <NumberInput 
            type="text" 
            max={maxQuantity} 
            min={1} 
            value={quantity} 
          //  onChange={handleQuantityChange} 
            classNames={{ 
              control: "border-none before:hidden after:hidden", 
              input: "focus:border-primary h-[44px] w-[80px] text-xs", 
            }} 
            disabled={isOutOfStock} 
          />
          {isOutOfStock && ( 
              <p className="text-red-500">Немає в наявності</p> 
            )}
        <div className="flex flex-col items-center text-center">
          <h3 className="text-[32px]">{productData?.title}</h3>
          <p className="text-[12px] my-[20px] w-[350px] md:w-[400px] text-silver">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim
            facilisi elementum commodo ipsum. Aenean aenean adipiscing lect
          </p>

          <hr className="hidden xl:block w-[350px] md:w-[400px]" />

          <div className="my-[15px] w-[350px] md:w-[400px] order-1 xl:order-none">
          {/* <div dangerouslySetInnerHTML={{ __html: productData.description }} /> */}
            {/* {ProductValue.map((item, index) => (
              <p
              key={index}
              className="text-[10px] text-silver flex flex-row justify-between"
              >
              <span>{item.label}</span>
              <span>{item.value}</span>
              </p>
              ))} */}
          </div>

          <hr className="hidden xl:block w-[400px]" />

          <div className="flex my-[25px] space-x-[40px] items-center">
            <Button
              text="Place an order"
              className="mini:w-[80%] w-[100%] px-[50px]"
            />
            <span className="text-[20px] px-[10px]">
              {/* {PRODUCT_DATA.minPrice}$ */}
            </span>
          </div>

          {/* <Button
            className="w-[350px] md:w-[400px]"
            text="Try on in AR Online"
            icon="cube"
            bordered
            /> */}

          {/* <Button
            text="Design Your Watch"
            className="my-[30px] w-[350px] md:w-[400px]"
            /> */}
        </div>
      </div>
    </section>
  );
};
export default ProductSection;

// const ProductValue = [
//   { label: "Case:", value: PRODUCT_DATA.case },
//   { label: "Coating:", value: PRODUCT_DATA.coating },
//   { label: "Glass:", value: PRODUCT_DATA.glass },
//   { label: "Straps:", value: "22mm Stainless-steel bracelet" },
//   { label: "Case Size:", value: `${PRODUCT_DATA.case_size}mm` },
//   { label: "Case Color: ", value: PRODUCT_DATA.case_color },
//   { label: "Dial Color:", value: PRODUCT_DATA.dial_color },
//   { label: "Water Resistance:", value: PRODUCT_DATA.water_resistance },
//   { label: "Straps:", value: PRODUCT_DATA.straps },
//   { label: "Movement:", value: PRODUCT_DATA.movement },
//   { label: "Instantaneous rate:", value: PRODUCT_DATA.instantaneus_rate },
//   {
//     label: "Standard Battery life:",
//     value: PRODUCT_DATA.standard_battery_life,
//   },
// ];
