"use client";
import { Input } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import React, { FC } from "react";

type Option = { title: string; value: string };

interface InputProps {
  placeholder: string;
  className?: string;
  type: "text" | "password" | "email" | "search" | "number";
  background?: "snow";
  bordered?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  pattern?: string;
  value?: string;
  selected?: Option | null;
  options?: Option[];
  mode?: "rows";
  status?: "default";
  onChange?: (selected: Option["value"]) => void;
  onClose?: () => void;
  showSelect?: boolean;
}

const InputComponent: FC<InputProps> = ({
  placeholder,
  className,
  type = "text",
  background = "snow",
  bordered = false,
  fullWidth = false,
  required = false,
  pattern,
  value,
  mode = "rows",
  options,
  status = "default",
  selected,
  onChange,
  onClose,
  showSelect = false,
}) => {
  const backgroundClass = bordered ? "transparent" : background;
  const textClass = background ? "text-silver" : "";
  const borderClass = bordered ? "border border-whisper border-solid" : "";
  const widthClass = fullWidth ? "w-[100%]" : "";

  return (
    <>
      <Input component="button" pointer>
        Button input
      </Input>

      <Input
        component="select"
        rightSection={<IconChevronDown size={14} stroke={1.5} />}
        pointer
        mt="md"
      >
        <option value="1">1</option>
        <option value="2">2</option>
      </Input>
    </>

    // <div>
    //   <input
    //     className={`${className} ${backgroundClass} ${textClass} ${borderClass} ${widthClass} py-[16px] px-[29px] rounded-[5px] mini:w-[320px]`}
    //     type={type}
    //     placeholder={placeholder}
    //     required={required}
    //     pattern={pattern}
    //     value={value}
    //   />
    // </div>
  );
};

export default InputComponent;
