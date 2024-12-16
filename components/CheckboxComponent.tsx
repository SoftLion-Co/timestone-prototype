import React, { FC, ReactNode } from "react";

interface checkboxProps {
  className?: string;
  label: string;
  description: string;
  price: string;
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
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={onChange}
        />

        <div
          className={`min-w-[15px] h-[15px] border-[1px] rounded transition-all duration-0.3
              ${
                checked
                  ? "bg-darkBurgundy border-darkBurgundy"
                  : "border-silver"
              }`}
        ></div>

        <div className="flex flex-col gap-[7px] ml-[15px] xl:flex-row xl:items-center xl:justify-between w-full">
          <div className="md:text-[14px] text-[11px] whitespace-nowrap">
            <p>{label}</p>
            <p className="text-silver">{description}</p>
          </div>

          <p className="text-darkBurgundy whitespace-nowrap">{price}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default CheckboxComponent;
