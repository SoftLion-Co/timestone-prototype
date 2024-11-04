"use client";
import React, { FC, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

import Image from "next/image";
import Arrow from "@/images/news-section/arrow.svg";

interface InputProps {
  placeholder?: string;
  className?: string;
  type?: "text" | "password" | "email" | "search" | "number";
  background?: "snow";
  bordered?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  pattern?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showSelect?: boolean;
  options?: Option[];
  onSelect?: (value: string) => void;
  scrollable?: boolean;
}

type Option = {
  value: string;
  label: string;
};

const InputComponent: FC<InputProps> = ({
  placeholder,
  className,
  type = "text",
  background = "snow",
  bordered = false,
  fullWidth = false,
  required = false,
  showSelect,
  pattern,
  value,
  onChange,
  options,
  onSelect,
  scrollable = false,
}) => {
  const backgroundClass = bordered ? "transparent" : background;
  const textClass = background ? "text-silver" : "";
  const borderClass = bordered ? "border border-whisper border-solid" : "";
  const widthClass = fullWidth ? "w-[100%]" : "";

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

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

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect?.(value);
    setIsOpen(false);
  };

  return (
    <>
      {showSelect ? (
        <div className="relative w-[272px] mini:w-[320px]" ref={selectRef}>
          <div
            className="border border-gray-300 rounded-lg py-[15px] px-[30px] cursor-pointer bg-snow text-silver"
            onClick={toggleDropdown}
          >
            {selected
              ? options?.find((option) => option.value === selected)?.label
              : placeholder}

            <Image
              src={Arrow}
              alt="Arrow"
              width={14}
              className={`absolute right-[25px] top-[25px] transition-transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          {isOpen && (
            <motion.ul
              className={`absolute mt-2 w-full border border-gray-300 rounded-lg bg-snow z-10 ${
                scrollable ? "max-h-[160px] overflow-y-auto" : ""
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {options?.map((option) => (
                <li
                  key={option.value}
                  className="p-2 hover:bg-gray-200 cursor-pointer text-silver rounded-lg"
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      ) : (
        <input
          className={`${className} ${backgroundClass} ${borderClass} ${widthClass} ${textClass} py-[16px] px-[30px] rounded-[5px] mini:w-[320px]`}
          type={type}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          value={value}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default InputComponent;
