"use client";

import React, { FC, useState } from "react";
import Button from "../ButtonComponent";
import OpenedFilter from "./OpenedFilter";
import { motion } from "framer-motion";

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

interface Category {
  title: string;
  keys: string[];
  activeItems: string[];
  onChange: (value: string) => void;
}

// type FilterComponentProps = {
//   type: "checkboxes" | "buttons" | "search" | "price";
//   title: string;

//   searchQuery: string;
//   onSearchChange: (query: string) => void;
//   clearSearchQuery: () => void;

//   min?: number;
//   max?: number;
//   step?: number;
//   handleMinPrice?: (min: number) => void;
//   handleMaxPrice?: (max: number) => void;

//   buttons?: string[];
//   activeButton?: string;
//   onChangeButton?: (value: string) => void;

//   checkboxes?: Category[];

//   onApplyClick: () => void;
// };

type FilterComponentProps = {
  type: "checkboxes" | "buttons" | "search" | "price";
  title: string;

  //text
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  clearSearchQuery?: () => void;

  //checkbox
  items?: string[];
  selectedItems?: string[];
  onItemChange?: (item: string) => void;

  //price
  rangeValue?: [number, number];
  step?: number;
  onApplyClick?: () => void;
  onRangeChange?: (value: [number, number]) => void;

  // buttons
  activeButton?: string;
  onChangeButton?: (value: string) => void;
};

const CustomFilterComponent: FC<FilterComponentProps> = ({
  type,
  title,
  items,
  selectedItems,
  onItemChange,
  rangeValue = [0, 100],
  step,
  onApplyClick,
  onRangeChange,
  searchQuery,
  onSearchChange,
  clearSearchQuery,
  activeButton,
  onChangeButton,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <label className="relative flex flex-col gap-[10px] border-b text-[14px] border-silver border-opacity-20 pb-5">
        <div
          className={`flex justify-between items-center ${
            type === "checkboxes" ? "cursor-pointer" : ""
          }`}
          onClick={toggleOpen}>
          <h3 className="font-semibold text-[16px]">{title}</h3>

          {type === "checkboxes" && (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3 }}>
              <span className="text-4xl text-darkBurgundy">+</span>
            </motion.div>
          )}
        </div>

        {type === "search" && (
          <div className="flex gap-3">
            <input
              className="rounded-sm bg-white py-[10px] pl-3 pr-10 w-full focus:outline-none focus:border-[1px] focus:border-darkBurgundy"
              type="text"
              placeholder="Type Here"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={clearSearchQuery}
                className="absolute right-20 top-[60px] -translate-y-1/2 text-gray-500 hover:text-gray-700 text-[25px]">
                ✕
              </button>
            )}
            <button
              onClick={onApplyClick}
              className="text-white px-4 p-2 border rounded-[4px] border-[#D7DADD] bg-darkBurgundy hover:bg-darkMaroon">
              OK
            </button>
          </div>
        )}

        {type === "price" && (
          <>
            <div className="flex flex-col gap-4">
              <RangeSlider
                value={rangeValue}
                onChange={onRangeChange}
                min={rangeValue[0]}
                max={rangeValue[1]}
                step={step}
                marks={[
                  { value: 0, label: "$0" },
                  { value: 1000, label: "$1000" },
                ]}
                styles={{
                  bar: {
                    backgroundColor: "#1971c2", // Синя лінія
                  },
                  thumb: {
                    borderColor: "#1971c2", // Синя рамка для повзунка
                    backgroundColor: "#ffffff", // Білий повзунок
                  },
                  mark: {
                    backgroundColor: "#1971c2", // Сині мітки
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                  },
                  markLabel: {
                    color: "#1971c2", // Синій текст міток
                    fontSize: "14px",
                    fontWeight: "bold",
                  },
                }}
              />
              <div className="flex gap-[5px] justify-between items-center">
                <input
                  type="number"
                  value={rangeValue[0]}
                  onChange={(e) =>
                    onRangeChange?.([+e.target.value, rangeValue[1]])
                  }
                  className="w-[30%] p-2 border rounded-[4px] border-[#D7DADD] focus:outline-none focus:border-[1px] focus:border-darkBurgundy"
                  placeholder="Мінімальна ціна"
                />
                <span>—</span>
                <input
                  type="number"
                  value={rangeValue[1]}
                  onChange={(e) =>
                    onRangeChange?.([rangeValue[0], +e.target.value])
                  }
                  className="w-[30%] p-2 border rounded-[4px] border-[#D7DADD] focus:outline-none focus:border-[1px] focus:border-darkBurgundy"
                  placeholder="Максимальна ціна"
                />

                <button
                  onClick={onApplyClick}
                  className="text-white px-4 p-2 border rounded-[4px] border-[#D7DADD] bg-darkBurgundy hover:bg-darkMaroon">
                  OK
                </button>
              </div>
            </div>
          </>
        )}

        {type === "buttons" && (
          <>
            <div className="hidden xl:flex flex-col justify-start items-start gap-1">
              {items?.map((btn) => (
                <button
                  key={btn}
                  onClick={() => onChangeButton?.(btn)}
                  className={`${
                    activeButton === btn
                      ? "font-bold text-darkBurgundy"
                      : "text-silver"
                  } `}>
                  {btn}
                </button>
              ))}
            </div>

            <div className="xl:hidden bg-darkBurgundy border-darkBurgundy border flex items-center w-fit rounded-md overflow-hidden gap-[2px]">
              {items?.map((btn) => (
                <button
                  key={btn}
                  onClick={(e) => {
                    e.preventDefault();
                    onChangeButton?.(btn);
                  }}
                  className={`${
                    activeButton === btn
                      ? "bg-darkBurgundy text-white"
                      : "bg-white"
                  } py-[14px] px-[52px]`}>
                  {btn}
                </button>
              ))}
            </div>
          </>
        )}

        {type === "checkboxes" && (
          <motion.div
            initial={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            animate={
              isOpen
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}>
            <div className="flex flex-col justify-start items-start overflow-y-scroll h-24">
              {items?.map((item, index) => (
                <label
                  key={index}
                  htmlFor={`checkbox-item-${title.toLowerCase}-${item}`}
                  className="flex gap-2 cursor-pointer w-full h-full px-3 py-2 hover:bg-gray-200 rounded-md  transition-all duration-200">
                  <input
                    id={`checkbox-item-${title.toLowerCase}-${item}`}
                    type="checkbox"
                    className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-darkBurgundy checked:border-darkBurgundy checked:after:content-['✔'] checked:after:flex checked:after:justify-center checked:after:items-center checked:after:w-full checked:after:h-full checked:after:text-white focus:outline-none focus:ring-0"
                    checked={selectedItems?.includes(item)}
                    onChange={() => onItemChange?.(item)}
                  />
                  <span className="first-letter:uppercase">{item}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </label>
    </>
  );
};

export default CustomFilterComponent;
