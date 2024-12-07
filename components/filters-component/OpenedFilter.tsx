"use client";

import React, { useState } from "react";
import FilterContainerComponent from "./FilterContainerComponent";

const OpenedFilter = ({
  title,
  items,
  activeItems,
  onChange,
}: {
  title: string;
  items: string[];
  activeItems: string[];
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 py-5">
      <div className="flex justify-between items-center">
        <h4 className=" text-black font-semibold ">{title}</h4>
        <div className="flex justify-center items-center h-5 w-5 cursor-pointer">
          <button
            className={`relative bg-darkBurgundy h-[2px] w-5 ${
              isOpen
                ? ""
                : " after:absolute after:h-[2px] after:bg-darkBurgundy after:w-5 after:top-0 after:left-0 after:rotate-90"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setIsOpen((isOpenCountriesItem) => !isOpenCountriesItem);
            }}></button>
        </div>
      </div>
      <FilterContainerComponent
        filters={{
          isOpen: isOpen,
          styles: "",
        }}>
        <div className="flex flex-col justify-start items-start gap-3 overflow-y-scroll h-24">
          {items.map((item) => (
            <label
              htmlFor={`input-checkbox-${title.toLowerCase()}-${item}`}
              className="flex gap-2 w-full cursor-pointer"
              key={item}>
              <input
                id={`input-checkbox-${title.toLowerCase()}-${item}`}
                type="checkbox"
                className="w-[20px] h-[20px] cursor-pointer appearance-none border-2 border-gray-400 rounded-sm checked:bg-darkBurgundy checked:border-darkBurgundy checked:after:content-['✔'] checked:after:flex checked:after:justify-center checked:after:items-center checked:after:w-full checked:after:h-full checked:after:text-white focus:outline-none focus:ring-0"
                checked={activeItems.find((_) => _ === item) ? true : false}
                onChange={() => onChange(item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </FilterContainerComponent>
    </label>
  );
};

export default OpenedFilter;
