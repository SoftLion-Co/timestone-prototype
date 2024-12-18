import React, { FC, ReactNode } from "react";

interface checkboxProps {
  className?: string;
  label: string;
  description: string;
  price?: string;
  checked?: boolean;
  children?: ReactNode;
  onChange?: () => void;
}

const CheckboxComponent: FC<checkboxProps> = ({
  className,
  label,
  description,
  price,
  checked,
  children,
  onChange,
}) => {
  return (
    <div className="flex flex-col my-[10px] mx-[10px] py-[30px] px-[25px] border-[1px] border-silver rounded cursor-pointer mini:w-[80%] w-[100%]">
      <div className="flex items-center" onClick={onChange}>
        <input
          type="radio"
          className="w-[25px] h-[25px] accent-darkBurgundy"
          checked={checked}
          onChange={onChange}
        />

        <div className="flex flex-col gap-[7px] ml-[15px] mini:flex-row mini:items-center mini:justify-between w-full">
          <div className="md:text-[14px] text-[11px]">
            <p className="whitespace-nowrap">{label}</p>
            <p className="text-silver mini:whitespace-nowrap">{description}</p>
          </div>

          <p className="whitespace-nowrap">{price}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default CheckboxComponent;
