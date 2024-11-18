"use client";
import React, { FC, useState } from "react";

import { SidebarProps } from "@/config/types";

const ProfileSideBarComponent: FC<SidebarProps> = ({
  setActiveSection,
  className,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("section1");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setActiveSection(category);
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
    <div className={`${className} flex md:justify-center gap-[12px] `}>
      <nav className="flex flex-col gap-[30px] md:flex-row md:items-center ">
        <p
          onClick={() => {
            handleCategorySelect("section1");
          }}
          className={
            "section1" === selectedCategory ? activeClass : inactiveClass
          }
        >
          Dashboard
        </p>
        <p
          onClick={() => {
            handleCategorySelect("section2");
          }}
          className={
            "section2" === selectedCategory ? activeClass : inactiveClass
          }
        >
          Order History
        </p>
      </nav>
    </div>
  );
};

export default ProfileSideBarComponent;
