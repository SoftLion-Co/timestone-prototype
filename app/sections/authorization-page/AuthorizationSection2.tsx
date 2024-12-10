"use client";
import React, { useState } from "react";
import Background from "@/images/authorization-page/bg-geomitrical.svg";
import Image from "next/image";
import LoginFormSection from "@/app/sections/authorization-page/LoginFormSection";
import RegistrationFormSection from "@/app/sections/authorization-page/RegistrationFormSection";

const AuthorizationSection = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  
  return (
    <section className="relative flex justify-center items-center font-poppins">
      <div className="bg-darkMaroon h-[500px] w-full absolute bottom-0 z-0">
        <Image
          src={Background}
          alt="Background"
          className="w-full h-full"
          layout="fill"
          objectFit="cover"
          loading="lazy"
        />
      </div>

      <form className="flex flex-col bg-snow w-[350px] md:w-[600px] lg:w-[860px] ring-[20px] ring-snow text-center border-[2px] border-gray-300 rounded-[10px] z-10 px-[20px] lg:px-[110px] mb-[174px]">
        <div className="mb-[28px] lg:flex lg:space-between mt-[24px] lg:mt-[60px] items-center">
          {["Login", "Create Account"].map((title, index) => {
            const isActive = isLoginPage ? index === 0 : index === 1;
            return (
              <div
                key={title}
                className="w-full text-center relative mb-[24px] lg:mb-0"
              >
                <h2
                  className={`text-[20px] cursor-pointer font-bold pb-[8px] ${isActive ? "text-onyx" : "text-silver"}`}
                  onClick={() => {
                    setIsLoginPage(index === 0);
                  }}
                >
                  {title}
                </h2>
                <div
                  className={`w-full absolute left-0 ${isActive ? "bg-darkMaroon h-[6px]" : "bg-silver h-[2px] -bottom-[4px]"}`}
                />
              </div>
            );
          })}
        </div>

        {isLoginPage ? (
          <LoginFormSection />
        ) : (
          <RegistrationFormSection />
        )}
      </form>
    </section>
  );
};

export default AuthorizationSection;
