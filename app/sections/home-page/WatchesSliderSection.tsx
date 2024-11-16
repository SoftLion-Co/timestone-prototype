"use client";
import Image from "next/image";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import React, { useEffect, useState } from "react";

import { CardProps } from "@/config/types";
import Button from "@/components/ButtonComponent";
import { getProducts } from "@/services/ProductService";

import ImgArrow from "@/images/vectors/arrow.svg";
import { textSliderObject, TestWatchesImages } from "@/test/sliderData";

//! потрібна заглушка як на youtube
const SliderSection = () => {
  // const [products, setProducts] = useState<CardProps[]>([]);
  // const [loading, setLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const SortAndLimitProducts = (items: typeof TestWatchesImages) => {
    return items
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 12);
  };

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
        <section className="container py-[40px] lg:py-[80px]">
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
                {SortAndLimitProducts(TestWatchesImages).map((item, index) => (
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
      ) : (
        <section>loading...</section>
      )}
    </>
  );
};

export default SliderSection;
