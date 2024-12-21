"use client";
import { motion } from "framer-motion";
import React, { FC, useState} from "react";

import Plus from "@/images/vectors/plus.svg";

type FilterComponentProps = {
  type: "checkboxes" | "buttons" | "search" | "price";
  title: string;

  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  clearSearchQuery?: () => void;

  items?: string[];
  selectedItems?: string[];
  onItemChange?: (item: string) => void;

  rangeValue?: [number, number];
  limit?: [number, number];
  step?: number;
  onApplyClick?: () => void;
  onRangeChange?: (value: [number, number]) => void;

  activeButton?: string;
  onChangeButton?: (value: string) => void;
};

const CustomFilterComponent: FC<FilterComponentProps> = ({
  type,
  title,
  items,
  selectedItems = [],
  onItemChange,
  rangeValue = [0, 1],
  limit = [0, 1],
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
      <div className="relative flex flex-col gap-[10px] border-b text-[14px] border-silver border-opacity-20 pb-5">
        <div
          className={`flex justify-between items-center ${
            type === "checkboxes" ? "cursor-pointer" : ""
          }`}
          onClick={toggleOpen}
        >
          <h3 className="font-semibold text-[16px]">{title}</h3>

          {type === "checkboxes" && (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-4xl text-darkBurgundy !select-none">+</span>
            </motion.div>
          )}
        </div>

        {type === "search" && (
          <div className="flex gap-3">
            <input
              className="rounded-sm bg-white py-[8px] border pl-3 pr-10 w-full border-[#D7DADD] focus:outline-none focus:border-[1px] focus:border-darkBurgundy"
              type="text"
              placeholder="Type Here"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={clearSearchQuery}
                className="absolute right-20 top-[60px] -translate-y-1/2 text-gray-500 hover:text-gray-700 text-[25px]"
              >
                ✕
              </button>
            )}
            <button
              onClick={onApplyClick}
              className="text-white px-4 p-2 border rounded-[4px] border-[#D7DADD] bg-darkBurgundy hover:bg-darkMaroon"
            >
              OK
            </button>
          </div>
        )}

        {type === "price" && (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex gap-[5px] justify-between items-center">
                <input
                  type="number"
                  value={rangeValue[0]}
                  onChange={(e) =>
                    onRangeChange?.([+e.target.value, rangeValue[1]])
                  }
                  className="w-[30%] p-2 border rounded-[4px] border-[#D7DADD] focus:outline-none focus:border-[1px] focus:border-darkBurgundy"
                  placeholder="Мінімальна ціна"
                  min={limit[0]}
                  max={limit[1]}
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
                  min={limit[0]}
                  max={limit[1]}
                />

                <button
                  onClick={onApplyClick}
                  className="text-white px-4 p-2 border rounded-[4px] border-[#D7DADD] bg-darkBurgundy hover:bg-darkMaroon"
                >
                  OK
                </button>
              </div>
            </div>
          </>
        )}

        {type === "buttons" && (
          <>
            <div className=" flex flex-row gap-[5px]">
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
                      : "bg-white text-darkBurgundy border-darkBurgundy border rounded-md"
                  } py-[6px] px-[12px] text-sm font-medium rounded-md`}
                >
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
            style={{ overflow: "hidden" }}
          >
            <div className="flex flex-col justify-start items-start overflow-y-scroll h-50">
              {items?.map((item, index) => (
                <label
                  key={`${title.toLowerCase()}-${item}`}
                  htmlFor={`checkbox-item-${title.toLowerCase()}-${item}`}
                  className="flex gap-2 cursor-pointer w-full h-full px-3 py-2 hover:bg-gray-200 rounded-md  transition-all duration-200"
                >
                  <input
                    id={`checkbox-item-${title.toLowerCase()}-${item}`}
                    type="checkbox"
                    className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-darkBurgundy checked:border-darkBurgundy checked:after:content-['✔'] checked:after:flex checked:after:justify-center checked:after:items-center checked:after:w-full checked:after:h-full checked:after:text-white focus:outline-none focus:ring-0"
                    checked={
                      selectedItems ? selectedItems.includes(item) : false
                    }
                    onChange={() => onItemChange?.(item)}
                  />
                  <span className="first-letter:uppercase">{item}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default CustomFilterComponent;
