import React, { FC, useState } from 'react';
import Image from 'next/image';
import { Checkbox, RangeSlider } from '@mantine/core';
import Plus from '@/images/vectors/arrow.svg';
import { motion } from 'framer-motion';

type FilterComponentProps = {
  title: string;
  items?: string[];
  selectedItems?: string[];
  onItemChange?: (item: string) => void;
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  clearSearchQuery?: () => void;
  isRangeSlider?: boolean;
  min?: number;
  max?: number;
  step?: number;
  rangeValue?: [number, number];
  onRangeChange?: (value: [number, number]) => void;
  onApplyClick?: () => void;
  showOkButton?: boolean;
};

const FilterComponent: FC<FilterComponentProps> = ({
  title,
  items = [],
  selectedItems = [],
  onItemChange,
  searchQuery = '',
  onSearchChange,
  showSearch = false,
  clearSearchQuery,
  isRangeSlider = false,
  rangeValue = [0, 1000],
  onRangeChange,
  step = 1,
  showOkButton = false,
  onApplyClick,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="xl:pr-[12px]">
      <div
        className="flex justify-between items-center cursor-pointer mb-[16px]"
        onClick={toggleOpen}>
        <h3 className="font-semibold">{title}</h3>

        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}>
          <Image src={Plus} alt="Toggle" width={20} height={20} />
        </motion.div>
      </div>

      <motion.div
        initial={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        animate={
          isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}>
        <>
          {showSearch && (
            <div className="mb-[16px] relative">
              <input
                type="text"
                placeholder="Пошук"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full p-2 border rounded"
              />
              {searchQuery && (
                <button
                  onClick={clearSearchQuery}
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              )}
            </div>
          )}

          {isRangeSlider ? (
            <div>
              <RangeSlider
                value={rangeValue}
                onChange={onRangeChange}
                min={rangeValue[0]}
                max={rangeValue[1]}
                step={step}
                className={'mb-[30px] relative'}
                classNames={{
                  root: 'w-[90%] md:w-[80%] xl:w-[100%]',
                  bar: 'bg-[#17696A]',
                  thumb: 'border-[#17696A]',
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

                {showOkButton && (
                  <button
                    onClick={onApplyClick}
                    className=" text-black px-4 p-2 border rounded-[4px] border-[#D7DADD]">
                    OK
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid gap-[8px] max-h-[260px] overflow-auto">
              {items.map((item, index) => (
                <div key={index}>
                  <label className="cursor-pointer flex items-center transition-padding duration-300 hover:bg-[#17696A10] hover:rounded hover:px-1">
                    <Checkbox
                      color="teal"
                      radius="xs"
                      size="xs"
                      className="mr-2"
                      checked={selectedItems.includes(item)}
                      onChange={() => onItemChange?.(item)}
                    />
                    <span className="first-letter:uppercase">{item}</span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </>
      </motion.div>
    </div>
  );
};

export default FilterComponent;
