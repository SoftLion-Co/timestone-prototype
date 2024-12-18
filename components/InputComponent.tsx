"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { FC, useState, useRef, useEffect, ChangeEvent } from "react";

import Eyes from "@/images/vectors/eyes.svg"
import Arrow from "@/images/news-section/arrow.svg";
import ClosedEyes from "@/images/vectors/closed-eye.svg"

interface InputProps {
  placeholder?: string;
  className?: string;
  inputType: "select" | "input" | "textarea" | "password";
  type?: "text" | "password" | "email" | "search" | "number";
  bordered?: boolean;
  fullWidth?: boolean;
  pattern?: string;
  label?: string;
  value?: string;
  error?: string | null;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  options?: Option[];
  onSelect?: (value: string) => void;
  scrollable?: boolean;
  errorType?: "critical" | "warning";
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  visible?: boolean; 
  onVisibilityChange?: (visibility: boolean) => void | undefined;
}

type Option = {
  value: string;
  label: string;
};

const InputComponent: FC<InputProps> = ({
  placeholder,
  inputType,
  className,
  type = "text",
  bordered = false,
  fullWidth = false,
  pattern,
  value,
  label,
  name,
  error,
  onChange,
  options,
  onSelect,
  errorType,
  scrollable = false,
  required,
  disabled,
  maxLength,
  visible,
  onVisibilityChange,
}) => {
  const textClass = bordered ? "text-black" : "text-silver";

  const borderClass = bordered ? "border border-whisper border-solid" : "";
  const widthClass = fullWidth ? "w-[100%]" : "";

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(value || null);
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

  useEffect(() => {
    if (typeof value === "string") {
      setSelected(value);
    }
  }, [value]);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect?.(value);
    setIsOpen(false);
  };

  const inputContent = () => {
    if (inputType === "select") {
      return (
        <>
          <div
            className={`${className} relative w-full mini:w-[320px]`}
            ref={selectRef}
          >
            <div
              className={`border border-whisper border-solid rounded-lg py-[15px] px-[30px] cursor-pointer bg-snow text-silver`}
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
          {error && (
            <p
              className={`text-[14px] ${
                errorType === "critical" ? "text-darkBurgundy" : "text-snow"
              }`}
            >
              {error}
            </p>
          )}
        </>
      );
    }  else if (inputType === "input") {
      return (
        <>
          <input
            className={`${className} ${borderClass} ${widthClass} ${textClass} py-[16px] px-[30px] rounded-[5px] focus:outline-none focus:border-[1px] focus:border-darkBurgundy`}
            type={type}
            placeholder={placeholder}
            pattern={pattern}
            value={value}
            name={name}
            required={required}
            disabled={disabled}
            onChange={onChange}
            maxLength={maxLength}
          />
          {error && (
            <p
              className={`text-[14px] ${
                errorType === "critical" ? "text-darkBurgundy" : "text-snow"
              }`}
            >
              {error}
            </p>
          )}
        </>
      );
    } else if (inputType === "password") {
      return (
        <div className="relative">
        <input
          className={`${className} ${borderClass} ${widthClass} ${textClass} py-[16px] px-[30px] rounded-[5px] focus:outline-none focus:border-[1px] focus:border-darkBurgundy`}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          name={name}
          required={required}
          disabled={disabled}
          onChange={onChange}
          maxLength={maxLength}
        />
        <button
          type="button"
          className="absolute right-4 top-[50%] transform -translate-y-[50%] cursor-pointer"
          onClick={() => {
            if (onVisibilityChange) { 
              onVisibilityChange(!visible); 
            }
          }}
        >
          {visible ? <Image src={Eyes} alt="eyes"/> : <Image src={ClosedEyes} alt="eyes"/>}
        </button>
      </div>
      );
    } else if (inputType === "textarea") {
      return (
        <>
          <textarea
            placeholder={placeholder}
            required={required}
            value={value}
            disabled={disabled}
            onChange={onChange}
            className={`${className} ${borderClass} ${textClass} resize-none py-[16px] px-[30px] w-full h-[160px] rounded border-[1px] rounded-[5px] border-[#EAECF5] lg:w-[90%] xl:w-[70%] focus:outline-none focus:border-[1px] focus:border-darkBurgundy`}
          />
          {error && (
            <p
              className={`text-[14px] ${
                errorType === "critical" ? "text-darkBurgundy" : "text-snow"
              }`}
            >
              {error}
            </p>
          )}
        </>
      );
    } else {
      return null;
    }
  };
  return <>{inputContent()}</>;
};

export default InputComponent;
