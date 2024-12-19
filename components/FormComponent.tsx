import React, { FC, useEffect, useState, ReactNode } from "react";
import Image from "next/image";
import Arrow from "@/images/news-section/arrow.svg";

interface formProps {
  className?: string;
  title: string;
  isOpen?: boolean;
  children?: ReactNode;
  closeText?: string | null;
  toggleOpen?: () => void;
}

const FormComponent: FC<formProps> = ({
  className,
  title,
  children,
  isOpen,
  closeText,
  toggleOpen,
}) => {
  return (
    <div
      className={`${className} rounded-[5px] border-[1px] border-whisper w-full justify-center md:w-[500px] lg:w-[600px] mini:w-[420px] xl:w-[760px] mx-auto lg:mx-0 bg-pearl`}
    >
      <p className="mx-[30px] my-[25px] flex justify-between">
        <span className="font-semibold">{title}</span>
        <Image
          src={Arrow}
          alt="Arrow"
          className={`cursor-pointer transition-transform  ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          onClick={toggleOpen}
        />
      </p>

      <div
        className={`transition-all duration-1000 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <form
          className={`${className} mini:mx-0 mx-[30px] pb-[40px] flex flex-col gap-y-[15px]`}
        >
          {children}
        </form>
      </div>

      {!isOpen && <p className="mx-[30px] mb-[20px] text-silver">{closeText}</p>}
    </div>
  );
};

export default FormComponent;
