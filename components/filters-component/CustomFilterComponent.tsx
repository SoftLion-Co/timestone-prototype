"use client";

import React, { FC } from "react";
import Button from "../ButtonComponent";
import OpenedFilter from "./OpenedFilter";

interface Category {
  title: string;
  keys: string[];
  activeItems: string[];
  onChange: (value: string) => void;
}

type FilterComponentProps = {
  showSearch: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  clearSearchQuery: () => void;

  showPrice?: boolean;
  // min?: number;
  // max?: number;
  // step?: number;
  handleMinPrice?: (min: number) => void;
  handleMaxPrice?: (max: number) => void;

  showButtons?: boolean;
  buttons?: string[];
  activeButton?: string;
  onChangeButton?: (value: string) => void;

  checkboxes?: Category[];

  onApplyClick: () => void;
};

const CustomFilterComponent: FC<FilterComponentProps> = ({
  showSearch,
  searchQuery,
  onSearchChange,
  clearSearchQuery,

  showPrice = false,
  // min = 0,
  // max = 15000,
  // step = 1,
  handleMinPrice = (number) => {
    console.log(number);
  },
  handleMaxPrice = (number) => {
    console.log(number);
  },

  showButtons = false,
  buttons = ["straps", "watches"],
  activeButton,
  onChangeButton = (value) => {
    console.log(value);
  },

  checkboxes = [],

  onApplyClick,
}) => {
  return (
    <>
      <div className="text-silver text-[14px] font-poppins flex flex-col gap-5">
        <>
          {showSearch && (
            <label className="relative flex flex-col gap-[10px] border-b border-silver border-opacity-20 pb-5">
              <h4 className=" text-black font-semibold">Search</h4>
              <input
                className="rounded-sm bg-white py-[14px] pl-3 pr-10 w-full focus:outline-none focus:border-[1px] focus:border-darkBurgundy"
                type="text"
                placeholder="Type Here"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={clearSearchQuery}
                  className="absolute right-2 top-[55px] -translate-y-1/2 text-gray-500 hover:text-gray-700 text-[25px]">
                  ✕
                </button>
              )}
            </label>
          )}
        </>

        <>
          {showPrice && (
            <label className="relative flex flex-col gap-[10px] border-b border-silver border-opacity-20 pb-5">
              <h4 className="text-black font-semibold">Price Range</h4>
              <div className="flex gap-[15px] items-center">
                <input
                  className="rounded-sm bg-white pl-2  py-[14px] text-center w-[76px] appearance-none focus:outline-none focus:border-[1px] focus:border-darkBurgundy"
                  type="number"
                  placeholder="$0"
                  onChange={(e) => handleMinPrice(+e.target.value)}
                />
                <span className="text-silver text-[14px] font-poppins ">
                  to
                </span>
                <input
                  className="rounded-sm bg-white pl-2 py-[14px] text-center w-[76px] focus:outline-none focus:border-[1px] focus:border-darkBurgundy"
                  type="number"
                  placeholder="$150"
                  onChange={(e) => handleMaxPrice(+e.target.value)}
                />
              </div>
            </label>
          )}
        </>

        <>
          {showButtons && (
            <label className="relative flex flex-col gap-[10px] border-b border-silver border-opacity-20 pb-5">
              <h4 className="text-black font-semibold">Select Type</h4>
              <div className="flex flex-col justify-start items-start gap-1">
                {buttons.map((btn) => (
                  <button
                    key={btn}
                    onClick={() => onChangeButton(btn)}
                    className={`${activeButton === btn ? "font-bold" : ""}`}>
                    {btn}
                  </button>
                ))}
              </div>
            </label>
          )}
        </>

        <>
          {checkboxes &&
            checkboxes.map((item) => (
              <OpenedFilter
                key={item.title}
                items={item.keys}
                onChange={item.onChange}
                activeItems={item.activeItems}
                title={item.title}
              />
            ))}
        </>
      </div>

      <Button
        onClick={() => onApplyClick}
        background="darkBurgundy"
        text="Apply Filters"
        className="w-full mt-5"
        type="submit"
      />
    </>
  );
};

export default CustomFilterComponent;
