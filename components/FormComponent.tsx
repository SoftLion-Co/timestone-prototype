import React, { FC, useState, ReactNode } from "react";
import Image from "next/image";
import Arrow from "@/images/news-section/arrow.svg";

interface formProps {
  className?: string;
  title: string;
  children?: ReactNode;
}

const FormComponent: FC<formProps> = ({ className, title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`${className} rounded-[5px] border-[1px] border-whisper w-full justify-center md:w-[500px] lg:w-[420px] mini:w-[420px] xl:w-[600px] mx-auto lg:mx-0`}
    >
      <p className="mx-[30px] my-[25px] flex justify-between">
        <span className="font-semibold">{title}</span>
        <Image
          src={Arrow}
          alt="Arrow"
          className={`transition-transform  ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        />
      </p>

      {isOpen && (
        <form
          className={`${className} mini:mx-0 mx-[30px] pb-[40px] flex flex-col items-center gap-y-[15px]`}
        >
          {children}
        </form>
      )}
    </div>
  );
};

export default FormComponent;
