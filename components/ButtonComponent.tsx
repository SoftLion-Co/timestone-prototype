import React, { FC } from "react";

interface ButtonProps {
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  background?: "amethyst" | "transparent";
  bordered?: boolean;
  fullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({
  text,
  className,
  type = "button",
  background = "amethyst",
  bordered = false,
  fullWidth = false,
}) => {
  const finalBackground = bordered ? "transparent" : background;
  const backgroundClass =
    finalBackground === "amethyst" ? "bg-amethyst" : "bg-transparent";

  const textClass =
    finalBackground === "amethyst"
      ? "text-white"
      : bordered
      ? "text-amethyst"
      : "";

  const borderClass = bordered ? "border border-amethyst border-solid" : "";

  const widthClass = fullWidth ? "w-[100%]" : "";

  const hoverClass = bordered
    ? "hover:bg-amethyst hover:text-white focus:bg-amethyst focus:text-white transition-colors duration-300"
    : "";

  return (
    <button
      className={`${className} ${backgroundClass} ${borderClass} ${textClass} ${widthClass} ${hoverClass} py-[16px] px-[24px] rounded-[6px]`}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
