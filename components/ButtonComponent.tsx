import React, { FC } from "react";

interface ButtonProps {
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  background?: "amethyst" | "transparent" | "onyx";
  bordered?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  text,
  className,
  type = "button",
  background = "amethyst",
  bordered = false,
  fullWidth = false,
  onClick,
}) => {
  const finalBackground = bordered ? "transparent" : background;
  const backgroundClass =
    finalBackground === "amethyst"
      ? "bg-amethyst"
      : finalBackground === "onyx"
      ? "bg-onyx"
      : "bg-transparent";

  const textClass =
    finalBackground === "amethyst" || finalBackground === "onyx"
      ? "text-white"
      : bordered
      ? "text-amethyst"
      : "";

  const borderClass = bordered ? "border border-amethyst border-solid" : "";

  const widthClass = fullWidth ? "w-[100%]" : "";

  const hoverClass = bordered
    ? "hover:bg-amethyst hover:text-white focus:bg-amethyst focus:text-white transition-colors duration-300"
    : finalBackground === "amethyst"
    ? "hover:bg-darkerAmethyst focus:bg-darkerAmethyst transition-colors duration-300"
    : "";

  return (
    <button
      className={`${className} ${backgroundClass} ${borderClass} ${textClass} ${widthClass} ${hoverClass} py-[16px] px-[24px] rounded-[6px]`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
