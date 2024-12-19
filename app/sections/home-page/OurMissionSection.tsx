import React from "react";
import Image from "next/image";

import Button from "@/components/ButtonComponent";

import TestImgWoman from "@/images/our-mission/our-mission.jpg";

const OurMissionSection = () => {
  return (
    <section className="bg-onyx mb-[20px]">
      <div className="flex flex-col items-center md:flex-row md:gap-[100px] lg:gap-[20%] md:mr-[15px]">
        <div className="relative w-full md:w-auto">
          <Image
            src={TestImgWoman}
            alt="Woman"
            className="object-cover w-full h-[574px] md:w-auto lg:h-[668px]"
            loading="lazy"
          />

          <div className="absolute block w-full rotate-180 -bottom-1 bg-gradient-to-b from-onyx to-transparent h-[60px] block right-0 md:rotate-0 md:top-0 md:-right-[4px] md:bg-gradient-to-l md:h-full md:w-[110px] " />

          <div
            className="absolute -bottom-[4px] w-[600px] h-[76px] bg-snow hidden md:block lg:w-[800px]"
            style={{ clipPath: "polygon(0 0,75% 0,90% 100%,0 100%)" }}
          />
        </div>

        <div className="gap-[40px] py-[50px] mx-[18px] text-snow flex flex-col text-center items-center md:text-start md:items-start md:w-[328px] lg:w-[400px] md:mx-0 md:py-0 md:text-right">
          <h1 className="font-frontrunner  leading-[50px] text-[28px] md:text-[35px] lg:text-[45px]">
          Наше призначення
          </h1>
          <div className="flex w-[80%] md:w-full flex-col font-poppins text-default gap-[10px]">
            <p> Наш магазин спеціалізується на продажі стильних та надійних годинників, які підходять для будь-якої ситуації — від повсякденних до урочистих моментів.</p>
            <p> Ми прагнемо дарувати нашим клієнтам не тільки точність, але й емоційний зв’язок із часом, роблячи кожен момент особливим.</p>
          </div>
          <Button text="Контакти" tag="a" href="/contact-us" />
        </div>
      </div>
    </section>
  );
};

export default OurMissionSection;
