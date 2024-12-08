"use client";

import React, { FC, useState } from "react";
import Button from "../ButtonComponent";
import OpenedFilter from "./OpenedFilter";
import { motion } from "framer-motion";

import RangeSlider from "react-range-slider-input";

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
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <label className="relative flex flex-col gap-[10px] border-b border-silver border-opacity-20 pb-5">
        <div
          className="flex justify-between items-center cursor-pointer mb-[16px]"
          onClick={toggleOpen}>
          <h3 className="font-semibold">{title}</h3>

          {type === "checkboxes" && (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3 }}>
              <span className="text-2xl">+</span>
            </motion.div>
          )}
        </div>

        {type === "search" && (
          <div>
            <input
              className="rounded-sm bg-white py-[14px] pl-3 pr-10 w-full focus:outline-none focus:border-[1px] focus:border-darkBurgundy"
              type="text"
              placeholder="Type Here"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={clearSearchQuery}
                className="absolute right-2 top-[55px] -translate-y-1/2 text-gray-500 hover:text-gray-700 text-[25px]">
                ✕
              </button>
            )}
            <button
              onClick={onApplyClick}
              className=" text-black px-4 p-2 border rounded-[4px] border-[#D7DADD]">
              OK
            </button>
          </div>
        )}

        {type === "price" && (
          <>
            <div>
              <RangeSlider
                value={rangeValue}
                onChange={onRangeChange}
                min={rangeValue[0]}
                max={rangeValue[1]}
                step={step}
                className={"mb-[30px] relative"}
                classNames={{
                  root: "w-[90%] md:w-[80%] xl:w-[100%]",
                  bar: "bg-[#17696A]",
                  thumb: "border-[#17696A]",
                }}
              />
              <div className="flex gap-[12px] items-center justify-between">
                <input
                  type="number"
                  value={rangeValue[0]}
                  onChange={(e) =>
                    onRangeChange?.([+e.target.value, rangeValue[1]])
                  }
                  className="w-[48%] p-2 border rounded-[4px] border-[#D7DADD]"
                  placeholder="Мінімальна ціна"
                />
                <span>—</span>
                <input
                  type="number"
                  value={rangeValue[1]}
                  onChange={(e) =>
                    onRangeChange?.([rangeValue[0], +e.target.value])
                  }
                  className="w-[48%] p-2 border rounded-[4px] border-[#D7DADD]"
                  placeholder="Максимальна ціна"
                />

                <button
                  onClick={onApplyClick}
                  className=" text-black px-4 p-2 border rounded-[4px] border-[#D7DADD]">
                  OK
                </button>
              </div>
            </div>
          </>
        )}

        {type === "buttons" && (
          <div className="flex flex-col justify-start items-start gap-1">
            {items?.map((btn) => (
              <button
                key={btn}
                onClick={() => onChangeButton?.(btn)}
                className={`${activeButton === btn ? "font-bold" : ""}`}>
                {btn}
              </button>
            ))}
          </div>
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
                <div key={index}>
                  <label className="flex gap-2 cursor-pointer w-full h-full px-3 py-2 hover:bg-gra-200 rounded-md  transition-all duration-200">
                    <input
                      type="checkbox"
                      className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-darkBurgundy checked:border-darkBurgundy checked:after:content-['✔'] checked:after:flex checked:after:justify-center checked:after:items-center checked:after:w-full checked:after:h-full checked:after:text-white focus:outline-none focus:ring-0"
                      checked={selectedItems?.includes(item)}
                      onChange={() => onItemChange?.(item)}
                    />
                    <span className="first-letter:uppercase">{item}</span>
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </label>
    </>
  );
};

export default CustomFilterComponent;
