import React from 'react';

type TitleProps = {
  text: string;
  additionalText?: string;
};

const TitleComponents = ({ text, additionalText = '' }: TitleProps) => {
  return (
    <div className="bg-darkBurgundy">
      <div className="container py-5 md:pt-[40px] md:pb-[22px] lg:pt-[90px] lg:pb-[52px]">
        <h2
          className={`font-spaceage text-snow text-[28px] leading-[25px] mb-4 md:text-[32px] md:mb-[20px] lg:text-[42px] lg:mb-[25px] ${
            additionalText === '' ? 'text-center' : 'text-left'
          }`}>
          {text}
        </h2>
        {additionalText !== '' && (
          <p className="text-pearl font-[10px] leading-3 md:text-[12px] lg:text-[14px]">
            {additionalText}
          </p>
        )}
      </div>
    </div>
  );
};

export default TitleComponents;
