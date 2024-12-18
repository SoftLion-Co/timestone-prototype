"use client";
import React, { FC, useState, useRef, useEffect } from "react";

import Image from "next/image";
import { motion } from "framer-motion";

import Arrow from "@/images/category-section/arrow-down-filter.svg";
import CloseSvg from "@/images/vectors/close.svg";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[];
  placeholder?: string;
  left?: boolean;
  sort: string;
  onSelect: (value: string) => void;
};

const CustomSelect: FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onSelect,
  left = false,
  sort = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (sort === "RELEVANCE") {
      setSelected(null);
      onSelect("");
    }
  }, [sort]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResetOption = () => {
    setSelected(null);
    onSelect("");
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-56 bg-pearl text-[14px]`} ref={selectRef}>
      <div
        className={`px-[26px] text-silver rounded-lg py-[22px] cursor-pointer text-center`}
        onClick={toggleDropdown}
      >
        {selected
          ? options.find((option) => option.value === selected)?.label
          : placeholder}
      </div>

      <Image
        src={Arrow}
        alt="Arrow"
        width={14}
        className={`absolute top-1/2 -translate-y-1/2 transition-transform ${
          isOpen ? "rotate-180" : "rotate-0"
        } ${left ? "left-[25px]" : "right-[25px]"}`}
      />

      {options.find((option) => option.value === selected) ? (
        <button
          className={`absolute top-1/2 -translate-y-1/2 hover:rotate-180 duration-500 ${
            left ? "right-[25px]" : "left-[25px]"
          }`}
          onClick={handleResetOption}
        >
          <Image src={CloseSvg} alt="Arrow" width={14} />
        </button>
      ) : (
        ""
      )}

      {isOpen && (
        <motion.ul
          className="absolute border mt-2 w-full border-silver rounded-lg bg-pearl z-10 overflow-hidden text-silver text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className="px-2 py-4 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default CustomSelect;
