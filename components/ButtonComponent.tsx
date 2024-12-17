import React, { FC } from "react";
import Image from "next/image";

import Back from"@/images/vectors/back.svg";
import Cube from "@/images/vectors/cube.svg";
import Logout from "@/images/vectors/logout.svg";
import Profile from "@/images/vectors/profile.svg";
import GoogleIcon from "@/images/authorization-page/google-icon.svg";
import FacebookIcon from "@/images/authorization-page/facebook-icon.svg";
interface ButtonProps {
  text: string;
  className?: string;
  href?: string;
  target?: string;
  tag?: "a" | "button";
  type?: "button" | "submit" | "reset";
  background?: "darkBurgundy" | "transparent" | "onyx" | "white";
  bordered?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  icon?: "cube" | "profile" | "facebook" | "google" | "logout" | "back";
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
  const Tag = tag;
  const finalBackground = bordered ? "transparent" : background;
  const backgroundClass =
    finalBackground === "darkBurgundy"
      ? "bg-darkBurgundy"
      : finalBackground === "white"
      ? "bg-show"
      : finalBackground === "onyx"
      ? "bg-onyx"
      : "bg-transparent";
  const disabledBg =
    finalBackground === "darkBurgundy"
      ? "disabled:bg-darkBurgundy  disabled:bg-opacity-70 disabled:text-snow"
      : "disabled:bg-black  disabled:bg-opacity-60 disabled:text-snow";
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

  const renderIcon = () => {
    if (icon === "cube") {
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
    if (icon === "profile") {
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
          alt="Google icon"
          width={22}
          height={22}
          className="mr-2 inline-block"
        />
      );
    }
    if (icon === "logout") {
      return (
        <Image
          src={Logout}
          alt="Logout icon"
          width={22}
          height={22}
          className="mr-2 inline-block w-[15px] filter group-hover:brightness-0 group-hover:invert group-active:brightness-0 group-active:invert transition duration-300 ease-in-out"
        />
      );
    }
    if (icon == "back") {
      return (
        <Image
          src={Back}
          alt="Back arrow icon"
          width={20}
          height={20}
          className="mr-2 inline-block inline-block w-[15px] filter group-hover:brightness-0 group-hover:invert group-active:brightness-0 group-active:invert transition duration-300 ease-in-out"
        />
      );
    }
    return null;
  };

  return (
    <Tag
      className={`${className} ${disabledBg} ${backgroundClass} ${borderClass} ${textClass} ${widthClass} ${hoverClass} py-[16px] px-[24px] rounded-[6px] flex items-center justify-center disabled:cursor-not-allowed group`}
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
