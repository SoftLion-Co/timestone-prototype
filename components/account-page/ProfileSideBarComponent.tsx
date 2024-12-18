"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";

import { SidebarProps } from "@/config/types";
import Button from "../ButtonComponent";

const ProfileSideBarComponent: FC<SidebarProps> = ({
  setActiveSection,
  className,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("section1");
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setActiveSection(category);
  };

  const handleLogout = () => {
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    router.push("/");
    setIsLoggedIn(false);
  };

  const activeClass = `
  cursor-pointer py-[0] px-[10px] md:px-[20px] md:py-[10px]
  text-black border-l-[3px] border-darkBurgundy
  md:border-b-[3px] md:border-l-0 md:border-primary 
`;
  const inactiveClass = `
  cursor-pointer py-[0] px-[10px] md:px-[20px] md:py-[10px] text-gray-500 hover:text-black
  border-l-[1px] border-gray-200
  md:border-b-[1px] md:border-l-0 
`;

  return (
    <div className="">
      <div
        className={`${className} flex justify-between items-start md:items-center md:justify-end md:gap-[100px] lg:gap-[200px] xl:gap-[380px] `}
      >
        <nav className="flex flex-col gap-[30px] md:flex-row md:items-center ">
          <p
            onClick={() => {
              handleCategorySelect("section1");
            }}
            className={
              "section1" === selectedCategory ? activeClass : inactiveClass
            }
          >
            Профіль
          </p>
          <p
            onClick={() => {
              handleCategorySelect("section2");
            }}
            className={
              "section2" === selectedCategory ? activeClass : inactiveClass
            }
          >
            Історія замовлень
          </p>
        </nav>
        <div className="flex flex-row items-center">
          <Button
            bordered
            onClick={handleLogout}
            className="text-[12px] py-[8px] px-[10px]"
            text="Вийти"
            background="transparent"
            icon="logout"
            type="button"
            tag="button"
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ProfileSideBarComponent;
