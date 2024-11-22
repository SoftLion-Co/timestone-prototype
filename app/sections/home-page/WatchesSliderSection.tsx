"use client";

import Image from "next/image";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import React, { useEffect, useState } from "react";
import Button from "@/components/ButtonComponent";
import { TestSliderProducts } from "@/test/sliderProducts";
import CardComponent from "@/components/CardComponent";
import { CardProps } from "@/config/types";
import ImgArrow from "@/images/vectors/arrow.svg";
// import { getProducts } from "@/services/ProductService";


const textSliderObject = {
  title: "Watches",
  textParagraphPart1:
    "We have inVolumenzeit gives you a total of 48 style combinations with 4 dial types, 4 dial colors, 3 case colors,",
  textParagraphPart2:
    "multiple stylish strap combinations, and customized engraving options.",
};


//! потрібна заглушка як на youtube
const SliderSection = () => {

  const [sliderProducts, setSliderProducts] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);
  
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await getProducts(undefined, undefined, 10, undefined, "BEST_SELLING", true);
  //       setProducts(response)
  //       setLoading(true)
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <>
      {loading ? (
        <section className="py-[40px] lg:py-[80px] xl:pt-[130px]">
          <div className="flex flex-col mx-[20px] lg:mx-[60px] lg:items-start">
            <h1 className="font-spaceage text-center text-[28px] md:text-[48px] lg:text-left">
              {textSliderObject.title}
            </h1>

            <div className="font-poppins text-silver text-default text-center leading-[28px] lg:text-left lg:max-w-[600px]">
              <p>{textSliderObject.textParagraphPart1}</p>
              <p>{textSliderObject.textParagraphPart2}</p>
            </div>
          </div>
      <div className="mb-[112px] mt-[50px] overflow-hidden">
        <div>
          <Carousel
            slideSize={{
              mini: "100%",
              sm: "50%",
              md: "40%",
              lg: "30%",
              xl: "26%",
            }}
            loop
            align="start"
            nextControlIcon={
              <div className="mt-[30px] absolute top-1/2 right-[60px] sm:mt-[102px] sm:left-[260px]">
                <Image
                  src={ImgArrow}
                  alt="Next Arrow"
                  className="w-[80px] h-auto"
                />
              </div>
            }
            previousControlIcon={
              <div className="mt-[30px] absolute top-1/2 left-[60px] sm:mt-[102px]">
                <Image
                  src={ImgArrow}
                  alt="Previous Arrow"
                  className="w-[80px] h-auto transform scale-x-[-1]"
                /> 
              </div>
            }
          >
            {sliderProducts.map((card) => (
              <Carousel.Slide key={card.id}>
                <CardComponent {...card} />
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
            <Button
              text="Design Your Watch"
              className="mt-[80px] mx-auto sm:mr-[20px] lg:mr-[60px] sm:ml-auto sm:mt-[90px]"
            />
          </div>
        </section>
      ) : (
        <section>loading...</section>
      )}
    </>
  );
};

export default SliderSection;
