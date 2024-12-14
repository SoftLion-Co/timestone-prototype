"use client";

import Image from "next/image";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import Button from "@/components/ButtonComponent";
import CardComponent from "@/components/CardComponent";
import { CardProps } from "@/config/types";
import ImgArrow from "@/images/vectors/arrow.svg";
import { getProducts } from "@/services/ProductService";
import ProductSceleton from "../category-page/ProductSceleton";

const textSliderObject = {
  title: "Watches",
  textParagraphPart1:
    "We have inVolumenzeit gives you a total of 48 style combinations with 4 dial types, 4 dial colors, 3 case colors, multiple stylish strap combinations, and customized engraving options.",
};

const SliderSection = () => {
  const [sliderProducts, setSliderProducts] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(
          { productType: "", minPrice: 0, maxPrice: 0, searchText: "" },
          "",
          12,
          "",
          "BEST_SELLING",
          true,
          true
        );
        if (response.products) {
          setSliderProducts(response.products);
          setLoading(true);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const isMobile = useMediaQuery("(max-width: 767.98px)");
  const isTablet = useMediaQuery(
    "(min-width: 768px) and (max-width: 1023.98px)"
  );
  const isLaptop = useMediaQuery(
    "(min-width: 1024px) and (max-width: 1439.98px)"
  );
  const isXlLaptop = useMediaQuery(
    "(min-width: 1440px) and (max-width: 1919.98px)"
  );
  const isDesktop = useMediaQuery("(min-width: 1920px)");

  let slidesToShow;

  switch (true) {
    case isMobile:
      slidesToShow = 1;
      break;
    case isTablet:
      slidesToShow = 3;
      break;
    case isLaptop:
      slidesToShow = 4;
      break;
    case isXlLaptop:
      slidesToShow = 5;
      break;
    case isDesktop:
      slidesToShow = 6;
      break;
    default:
      slidesToShow = 0;
  }
  return (
    <>
      <section className="py-[40px] lg:pb-[80px] lg:pt-[150px] xl:pt-[240px]">
        <div className="flex flex-col mx-[20px] lg:mx-[60px] gap-[10px] lg:items-start">
          <h1 className="font-spaceage text-center text-[28px] md:text-[48px] lg:text-left">
            {textSliderObject.title}
          </h1>

          <div className="font-poppins text-silver text-default text-center leading-[28px] lg:text-left lg:max-w-[600px]">
            <p>{textSliderObject.textParagraphPart1}</p>
          </div>
        </div>
        <div className="mb-[112px] mt-[50px] overflow-hidden">
          <div className="">
            <Carousel
              className="w-[100%] mb-[80px]"
              slideGap="xl"
              slideSize={`${100 / slidesToShow}%`}
              loop
              align={isMobile && isTablet ? "center" : "start"}
              nextControlIcon={
                <div className="mt-[30px] w-[80px] absolute top-1/2 right-[60px] sm:mt-[102px] sm:left-[260px]">
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
              {loading ? (
                <>
                  {sliderProducts.map((card) => (
                    <Carousel.Slide
                      key={card.id}
                      className="flex justify-center"
                    >
                      <CardComponent {...card} />
                    </Carousel.Slide>
                  ))}
                </>
              ) : (
                <>
                  {Array.from({ length: slidesToShow }, (_, index) => (
                    <Carousel.Slide key={index} className="flex justify-center">
                      <ProductSceleton key={index} />
                    </Carousel.Slide>
                  ))}
                </>
              )}
            </Carousel>
          </div>
          <Button
            text="Your watches"
            tag="a"
            href="/catalog"
            className="mt-[80px] max-w-[200px] mx-auto sm:mr-[20px] sm:ml-auto sm:mt-[90px] lg:mr-[60px]"
          />
        </div>
      </section>
    </>
  );
};

export default SliderSection;
