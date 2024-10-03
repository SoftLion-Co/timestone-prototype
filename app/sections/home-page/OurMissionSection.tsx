import React from "react";
import Image from "next/image";
import TestImgWoman from "@/images/test-our-mission/watch-on-woman.png";
import Button from "@/components/ButtonComponent";

const textOurMissionObject = {
  title: "OUR MISSION",
  textParagraph1:
    "We have invested 6 year of our lifes to invent a new technology of production a 3D dials with quality of wristwatch industry. All what we need to turn on our imagination on maximum.",
  textParagraph2:
    "We love Out-of-the-box designs and believe there are many people who thinks the same.",
};

const OurMissionSection = () => {
  return (
    <section className="bg-onyx mb-[20px]">
      <div className="flex flex-col items-center md:flex-row md:gap-[140px] lg:gap-[280px]">
        <div className="relative w-full md:w-auto">
          <Image
            src={TestImgWoman}
            alt="Woman"
            className="object-cover w-full h-[574px] md:w-auto lg:h-[668px]"
          />

          <div className="absolute top-0 -right-[4px] bg-gradient-to-l from-onyx to-transparent h-full w-[110px] hidden md:block" />

          <div
            className="absolute -bottom-[4px] w-[600px] h-[76px] bg-snow hidden md:block lg:w-[800px]"
            style={{ clipPath: "polygon(0 0,75% 0,90% 100%,0 100%)" }}
          />
        </div>

        <div className="gap-[40px] py-[50px] mx-[18px] text-snow flex flex-col text-center items-center md:text-start md:items-start md:w-[328px] md:py-0 ">
          <h1 className="font-spaceAge text-[28px] lg:text-[48px]">
            {textOurMissionObject.title}
          </h1>
          <p className="font-poppins text-default">
            {textOurMissionObject.textParagraph1}
          </p>
          <p className="font-poppins text-default">
            {textOurMissionObject.textParagraph2}
          </p>
          <Button text="Design Your Watch" className="w-[208px]" />
        </div>
      </div>
    </section>
  );
};

export default OurMissionSection;
