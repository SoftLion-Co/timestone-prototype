import React from 'react';

type TitleProps = {
  text: string;
  additionalText?: string;
};

const TitleComponents = ({ text, additionalText = '' }: TitleProps) => {
  return (
    <div className="bg-darkBurgundy z-40 py-5 md:py-[35px] lg:py-[50px] lg:px-[125px] md:px-[75px] px-5">
      {additionalText ? (
        <>
          <h1
            className={`font-spaceage text-snow text-[24px] leading-[25px] mb-4 md:text-[30px] md:mb-[20px] lg:text-[40px] lg:mb-[25px] text-left`}>
            {text}
          </h1>
          <p className="text-pearl font-[8px] leading-3 md:text-[12px] lg:text-[14px]">
            {additionalText}
          </p>
        </>
      ) : (
        <h1
          className={`font-spaceage text-snow text-[24px] leading-[25px] md:text-[30px] lg:text-[40px] text-center`}>
          {text}
        </h1>
      )}
    </div>
  );
};

export default TitleComponents;
