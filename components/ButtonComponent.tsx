
import React, { FC } from "react";
import Image from "next/image";
import Cube from "@/images/vectors/cube.svg";
import Profile from "@/images/vectors/profile.svg";
import FacebookIcon from "@/images/authorization-page/facebook-icon.svg";
import GoogleIcon from "@/images/authorization-page/google-icon.svg";

interface ButtonProps {
  text: string;
  className?: string;
  href?: string;
  target?: string;
  tag?: "a" | "button";
  type?: "button" | "submit" | "reset";
  background?: "darkBurgundy" | "transparent" | "onyx";
  bordered?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  icon?: "cube" | "profile" | "facebook" | "google";
}

const Button: FC<ButtonProps> = ({
  text,
  className,
  href,
  target,
  tag = "button",
  type = "button",
  background = "darkBurgundy",
  bordered = false,
  fullWidth = false,
  disabled,
  onClick,
  icon,
}) => {
  const Tag = tag
  const finalBackground = bordered ? "transparent" : background;
  const backgroundClass =
    finalBackground === 'darkBurgundy'
      ? 'bg-darkBurgundy'
      : finalBackground === 'onyx'
      ? 'bg-onyx'
      : 'bg-transparent';
const disabledBg =   finalBackground === 'darkBurgundy'
? 'disabled:bg-darkBurgundy  disabled:bg-opacity-70 disabled:text-snow'
: 'disabled:bg-black  disabled:bg-opacity-60 disabled:text-snow';
  const textClass =
    finalBackground === 'darkBurgundy' || finalBackground === 'onyx'
      ? 'text-white'
      : bordered
      ? 'text-darkBurgundy'
      : '';

  const borderClass = bordered ? 'border border-darkBurgundy border-solid' : '';

  const widthClass = fullWidth ? 'w-[100%]' : ''; 

  const hoverClass = bordered
    ? 'hover:bg-darkBurgundy hover:text-white focus:bg-darkBurgundy focus:text-white transition-colors duration-300'
    : finalBackground === 'darkBurgundy'
    ? 'hover:bg-darkMaroon focus:bg-darkMaroon transition-colors duration-300'
    : '';

  const renderIcon = () => {
    if (icon === 'cube') {
      return (
        <Image
          src={Cube}
          alt="Cube"
          width={20}
          height={20}
          className="mr-2 inline-block"
        />
      );
    }
    if (icon === 'profile') {
      return (
        <Image
          src={Profile}
          alt="Profile"
          width={20}
          height={20}
          className="mr-2 inline-block"
        />
      );
    }
    if (icon === "facebook") {
      return (
        <Image
          src={FacebookIcon}
          alt="Facebook icon"
          width={14}
          height={14}
          className="mr-2 inline-block"
        />
      );
    }
    if (icon === "google") {
      return (
        <Image
          src={GoogleIcon}
          alt="Facebook icon"
          width={22}
          height={22}
          className="mr-2 inline-block"
        />
      );
    }
    return null;
  };

  return (
    <Tag
      className={`${className} ${disabledBg} ${backgroundClass} ${borderClass} ${textClass} ${widthClass} ${hoverClass} py-[16px] px-[24px] rounded-[6px] flex items-center justify-center disabled:cursor-not-allowed `}
      type={type}
      target={target}
      href={href}
      disabled={disabled}
      onClick={onClick}
    >
      {renderIcon()}
      {text}
    </Tag>
  );
};

export default Button;
