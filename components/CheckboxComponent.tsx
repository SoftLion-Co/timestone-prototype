import React, { FC, useState } from "react";

interface checkboxProps {
  className?: string;
  label: string;
  description: string;
  price: string;
  checked?: boolean;
  onChange?: () => void;
}

const CheckboxComponent: FC<checkboxProps> = ({
  className,
  label,
  description,
  price,
  checked,
  onChange,
}) => {
  return (
    <div
      className="flex items-center my-[10px] mx-[10px] py-[30px] px-[25px] border-[1px] border-whisper rounded cursor-pointer mini:w-[80%] w-[100%]"
      onClick={onChange}
    >
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={onChange}
      />

      <div
        className={`min-w-[15px] h-[15px] border-[1px] rounded transition-all duration-0.3 
            ${
              checked ? "bg-darkBurgundy border-darkBurgundy" : "border-whisper"
            }`}
      ></div>
      <div>
        <div className="ml-[15px] md:text-[14px] text-[11px]">
          <p>{label}</p>
          <p className="text-silver">{description}</p>
        </div>
      </div>

      <p className="md:text-[18px] ml-[50px] lg:ml-[100px] xl:ml-[200px]">
        {price}
      </p>
    </div>
  );
};

export default CheckboxComponent;
