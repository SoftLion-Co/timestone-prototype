import React from "react";
import Image from "next/image";

import AboutUs from "@/test/images/aboutUs.png";

const AboutUsSection = () => {
  return (
    <section className="container flex flex-col justify-between gap-[40px] items-center py-[80px] lg:gap-[100px] lg:flex-row  lg:py-[110px] ">
      <div className="flex flex-col text-center lg:text-left lg:w-[400px]">
        <h2 className="font-spaceage text-[28px] mb-6 lg:text-[42px]">
          ABOUT US
        </h2>
        <p className="text-gray-600 leading-7">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Accumsan
          volutpat tristique metus, nibh massa quam iaculis lectus. A dui nam
          phasellus porttitor nisi. Eget a quam est, eget dictum nisi.
        </p>
      </div>
      <div
        className="relative w-full h-[300px] rounded-xl overflow-hidden lg:w-[500px]"
      >
        <div className="absolute inset-0 bg-radial-gradient bg-[#680A0ACC] pointer-events-none"></div>
        <Image
          src={AboutUs}
          alt="Video placeholder"
          className="object-cover w-full h-full"
        />

        <button className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-darkBurgundy"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      </div>
    </section>
  );
};

export default AboutUsSection;
