"use client";
import React from "react";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import Button from "@/components/ButtonComponent";
import Image from "next/image";
import { PRODUCT_DATA } from "@/config/productData";
import LeftArrow from "@/images/product-page/arrow-left.svg";
import RightArrow from "@/images/product-page/arrow-right.svg";
import TitleComponents from "@/components/TitleComponents";

const ProductValue = [
  { label: "Case:", value: PRODUCT_DATA.case },
  { label: "Coating:", value: PRODUCT_DATA.coating },
  { label: "Glass:", value: PRODUCT_DATA.glass },
  { label: "Straps:", value: "22mm Stainless-steel bracelet" },
  { label: "Case Size:", value: `${PRODUCT_DATA.case_size}mm` },
  { label: "Case Color: ", value: PRODUCT_DATA.case_color },
  { label: "Dial Color:", value: PRODUCT_DATA.dial_color },
  { label: "Water Resistance:", value: PRODUCT_DATA.water_resistance },
  { label: "Straps:", value: PRODUCT_DATA.straps },
  { label: "Movement:", value: PRODUCT_DATA.movement },
  { label: "Instantaneous rate:", value: PRODUCT_DATA.instantaneus_rate },
  {
    label: "Standard Battery life:",
    value: PRODUCT_DATA.standard_battery_life,
  },
];

const slides = PRODUCT_DATA.photo_url.map((item, index) => (
  <Carousel.Slide key={index}>
    <Image src={item} alt={`Image${index + 1}`} />
  </Carousel.Slide>
));

const ProductSection = () => {
  return (
    <section>
      <TitleComponents
        text="products"
        additionalText="Products / Product Number One"
      />

      <div className="container flex flex-col md:flex-row gap-[100px] justify-items-center py-[30px] xl:py-[65px]">
        <div className="hidden xl:block xl:flex xl:flex-wrap xl:flex-row xl:gap-[30px]">
          {PRODUCT_DATA.photo_url.map((item, index) => (
            <Image key={index} src={item} alt={`Image${index + 1}`} />
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
            {slides}
          </Carousel>
        </div>

        <div className="flex flex-col items-center text-center">
          <h3 className="text-[32px]">{PRODUCT_DATA.model}</h3>
          <p className="text-[12px] my-[20px] w-[350px] md:w-[400px] text-silver">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim
            facilisi elementum commodo ipsum. Aenean aenean adipiscing lect
          </p>

          <hr className="hidden xl:block w-[350px] md:w-[400px]" />

          <div className="my-[15px] w-[350px] md:w-[400px] order-1 xl:order-none">
            {ProductValue.map((item, index) => (
              <p
                key={index}
                className="text-[10px] text-silver flex flex-row justify-between"
              >
                <span>{item.label}</span>
                <span>{item.value}</span>
              </p>
            ))}
          </div>

          <hr className="hidden xl:block w-[400px]" />

          <div className="flex my-[25px] space-x-[40px] items-center">
            <Button text="Place an order" className="w-[210px] md:w-[260px]" />
            <span className="text-[20px] px-[10px]">{PRODUCT_DATA.price}$</span>
          </div>

          <Button
            className="w-[350px] md:w-[400px]"
            text="Try on in AR Online"
            icon="cube"
            bordered
          />

          <Button
            text="Design Your Watch"
            className="my-[30px] w-[350px] md:w-[400px]"
          />
        </div>
      </div>
    </section>
  );
};
export default ProductSection;
