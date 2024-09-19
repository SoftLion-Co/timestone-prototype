import React, { FC } from "react";

interface ButtonProps {
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  background?: "darkBurgundy" | "transparent" | "onyx";
  bordered?: boolean;
  fullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({
  text,
  className,
  type = "button",
  background = "darkBurgundy",
  bordered = false,
  fullWidth = false,
}) => {
  const finalBackground = bordered ? "transparent" : background;
  const backgroundClass =
    finalBackground === "darkBurgundy"
      ? "bg-darkBurgundy"
      : finalBackground === "onyx"
      ? "bg-onyx"
      : "bg-transparent";

  const textClass =
    finalBackground === "darkBurgundy" || finalBackground === "onyx"
      ? "text-white"
      : bordered
      ? "text-darkBurgundy"
      : "";

  const borderClass = bordered ? "border border-darkBurgundy border-solid" : "";

  const widthClass = fullWidth ? "w-[100%]" : "";

  const hoverClass = bordered
    ? "hover:bg-darkBurgundy hover:text-white focus:bg-darkBurgundy focus:text-white transition-colors duration-300"
    : finalBackground === "darkBurgundy"
    ? "hover:bg-darkMaroon focus:bg-darkMaroon transition-colors duration-300"
    : "";

  return (
    <button
      className={`${className} ${backgroundClass} ${borderClass} ${textClass} ${widthClass} ${hoverClass} w-max py-[16px] px-[24px] rounded-[6px]`}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
