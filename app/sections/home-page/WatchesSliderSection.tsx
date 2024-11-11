"use client";
import React from "react";
import Image from "next/image";

import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";

import Button from "@/components/ButtonComponent";
import ImgArrow from "@/images/vectors/arrow.svg";

import { TestSliderProducts } from "@/test/sliderProducts"

const textSliderObject = {
  title: "Watches",
  textParagraphPart1:
    "We have inVolumenzeit gives you a total of 48 style combinations with 4 dial types, 4 dial colors, 3 case colors,",
  textParagraphPart2:
    "multiple stylish strap combinations, and customized engraving options.",
};


const SortAndLimitProducts = (items: typeof TestSliderProducts) => {
  return items
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 12);
};

const SliderSection = () => {
  return (
    <section className="container">
      <div>
        <h1 className="font-spaceAge text-center text-[48px] lg:text-left">
          {textSliderObject.title}
        </h1>

        <div className="font-poppins text-silver text-default text-center leading-[28px] mt-[38px] lg:text-left lg:max-w-[600px]">
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
              lg: "36%",
              xl: "26%",
            }}
            loop
            align="start"
            nextControlIcon={
              <div className="mt-[30px] absolute top-1/2 right-[60px] sm:mt-[102px] sm:left-[218px] ">
                <Image
                  src={ImgArrow}
                  alt="Next Arrow"
                  className="w-[80px] h-auto"
                />
              </div>
            }
            previousControlIcon={
              <div className="mt-[30px] absolute top-1/2 left-[60px] sm:left-0 sm:mt-[102px]">
                <Image
                  src={ImgArrow}
                  alt="Previous Arrow"
                  className="w-[80px] h-auto transform scale-x-[-1]"
                />
              </div>
            }
          >
            {SortAndLimitProducts(TestSliderProducts).map((item, index) => (
              <Carousel.Slide
                key={index}
                className="flex flex-col items-center text-center"
                style={{
                  marginRight: "40px",
                }}
              >
                <Image
                  src={item.src}
                  alt={item.name}
                  className="object-contain h-[400px] w-[100%] rounded-[14px] md:object-cover"
                />

                <div className="mt-[26px] font-poppins text-silver text-default">
                  {item.name}
                </div>

                <div className="mt-[24px] font-poppins text-[26px]">
                  {item.price}
                </div>
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>

        <Button
          text="Design Your Watch"
          className="mt-[80px] mx-auto sm:mx-0 sm:ml-auto sm:mt-[90px]"
        />
      </div>
    </section>
  );
};

export default SliderSection;
