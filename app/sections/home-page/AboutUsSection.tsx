import React from "react";

const AboutUsSection = () => {
  return (
    <section id="about-us" className="container flex flex-col justify-between gap-[40px] items-center py-[80px] lg:gap-[100px] lg:flex-row  lg:py-[110px] ">
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
      <div className="w-[90%] rounded-xl overflow-hidden lg:w-[700px]">
        <iframe
          src="https://drive.google.com/file/d/1ay7Rh_APemR9OjGzaNAGNode0Mt2OxRO/preview"
          width="100%"
          height="auto"
          style={{ aspectRatio: "16/9", objectFit: "contain" }}
          allow="autoplay"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default AboutUsSection;
