'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import ArrowUp from '@/images/category-section/arrow-up.svg';
import Button from '@/components/ButtonComponent';
import { useFilters } from '@/hooks/useFilters';

const CategoryAsideFilters = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [productType, setProductType] = useState<string>('');
  const [watchesColor, setWatchesColor] = useState<string[]>([]);
  const [strapsColor, setStrapsColor] = useState<string[]>([]);

  const { filters, dispatch } = useFilters();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // open and close filters
  const handleOpenFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen((isOpen) => !isOpen);
  };

  // search text
  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // set max and min price
  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(+e.target.value);
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(+e.target.value);
  };

  // change product type in filter
  const handleProductType = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: string
  ) => {
    e.preventDefault();

    if (type !== productType) {
      setProductType(type);
    } else {
      setProductType('');
    }
  };

  // set watch colors
  const handleSetWatchesColor = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    e.preventDefault();

    setWatchesColor((watchesColor) =>
      watchesColor.indexOf(value) !== -1
        ? watchesColor.filter((color) => color !== value)
        : [...watchesColor, value]
    );
  };

  // set watch colors
  const handleSetStrapsColor = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    e.preventDefault();
    setStrapsColor((strapsColor) =>
      strapsColor.indexOf(value) !== -1
        ? strapsColor.filter((color) => color !== value)
        : [...strapsColor, value]
    );
  };

  // submit filters
  const handleSubmitFormForPc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: 'SET_SEARCH_TEXT', payload: searchText });
    dispatch({ type: 'SET_MIN_PRICE', payload: minPrice });
    dispatch({ type: 'SET_MAX_PRICE', payload: maxPrice });
    dispatch({ type: 'SET_PRODUCT_TYPE', payload: productType });
    dispatch({ type: 'TOGGLE_WATCH_COLOR', payload: watchesColor });
    dispatch({ type: 'TOGGLE_STRAP_COLOR', payload: strapsColor });
  };

  const handleSubmitFormForMobile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'SET_SEARCH_TEXT', payload: searchText });
    dispatch({ type: 'SET_MIN_PRICE', payload: minPrice });
    dispatch({ type: 'SET_MAX_PRICE', payload: maxPrice });
    dispatch({ type: 'SET_PRODUCT_TYPE', payload: productType });
    dispatch({ type: 'TOGGLE_WATCH_COLOR', payload: watchesColor });
    dispatch({ type: 'TOGGLE_STRAP_COLOR', payload: strapsColor });

    setIsOpen(false);
  };

  return (
    <>
      {/* pc filters */}
      <aside className="hidden xl:block xl:bg-pearl pt-[43px] pb-[93px] pl-[30px] pr-[50px]">
        <form onSubmit={handleSubmitFormForPc}>
          <div className="pb-5 text-silver text-[12px] font-poppins">
            <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 pb-5">
              <h4 className=" text-black font-semibold ">Search</h4>
              <input
                className="rounded-sm bg-white py-[14px] px-5 w-full"
                type="text"
                placeholder="Type Here"
                value={searchText}
                onChange={handleSearchText}
              />
            </label>

            <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 py-5">
              <h4 className=" text-black font-semibold ">Select Products</h4>
              <div className="flex flex-col justify-start items-start gap-1">
                <button
                  onClick={(e) => handleProductType(e, 'watches')}
                  className={`${productType === 'watches' ? 'font-bold' : ''}`}>
                  Watches
                </button>
                <button
                  onClick={(e) => handleProductType(e, 'straps')}
                  className={`${productType === 'straps' ? 'font-bold' : ''}`}>
                  Straps
                </button>
              </div>
            </label>

            <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 py-5">
              <h4 className="text-black font-semibold">Price Range</h4>
              <div className="flex gap-[15px] items-center">
                <input
                  className="rounded-sm bg-white py-[14px] text-center w-[76px] appearance-none"
                  type="text"
                  placeholder="$0"
                  onChange={handleMinPrice}
                />
                <span className="text-silver text-[12px] font-poppins ">
                  to
                </span>
                <input
                  className="rounded-sm bg-white py-[14px] text-center w-[76px]"
                  type="text"
                  placeholder="$150"
                  onChange={handleMaxPrice}
                />
              </div>
            </label>

            <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 py-5 px-[15px] xl:px-0">
              <h4 className=" text-black font-semibold">Case Color</h4>
              <div className="flex gap-3">
                <button
                  onClick={(e) => handleSetWatchesColor(e, 'black')}
                  className={`w-10 h-10 rounded-md bg-gradient-to-bl from-[#555555] to-[#0A0A0A] ${
                    watchesColor.length !== 0 &&
                    watchesColor.indexOf('black') === -1
                      ? 'opacity-50'
                      : 'opacity-100'
                  }`}></button>
                <button
                  onClick={(e) => handleSetWatchesColor(e, 'silver')}
                  className={`w-10 h-10 rounded-md bg-gradient-to-bl from-[#e3e3e3] to-[#7B838F] ${
                    watchesColor.length !== 0 &&
                    watchesColor.indexOf('silver') === -1
                      ? 'opacity-50'
                      : 'opacity-100'
                  }`}></button>
                <button
                  onClick={(e) => handleSetWatchesColor(e, 'blue')}
                  className={`w-10 h-10 rounded-md bg-gradient-to-bl from-[#58B2CE] to-[#023C96] ${
                    watchesColor.length !== 0 &&
                    watchesColor.indexOf('blue') === -1
                      ? 'opacity-50'
                      : 'opacity-100'
                  }`}></button>
              </div>
            </label>

            <label className="flex flex-col gap-[10px] xl:border-none border-b border-silver border-opacity-20 py-5 xl:pb-0 px-[15px] xl:px-0">
              <h4 className=" text-black font-semibold">
                Filter By Strap Colors
              </h4>
              <div className="flex gap-3">
                <button
                  onClick={(e) => handleSetStrapsColor(e, 'orange')}
                  className={`w-10 h-10 rounded-md bg-gradient-to-bl from-[#D39138] to-[#B95371] ${
                    strapsColor.length !== 0 &&
                    strapsColor.indexOf('orange') === -1
                      ? 'opacity-50'
                      : 'opacity-100'
                  }`}></button>
                <button
                  onClick={(e) => handleSetStrapsColor(e, 'purple-green')}
                  className={`w-10 h-10 rounded-md bg-gradient-to-bl from-[#2D9B87] to-[#AF29CB] ${
                    strapsColor.length !== 0 &&
                    strapsColor.indexOf('purple-green') === -1
                      ? 'opacity-50'
                      : 'opacity-100'
                  }`}></button>
                <button
                  onClick={(e) => handleSetStrapsColor(e, 'purple-blue')}
                  className={`w-10 h-10 rounded-md bg-gradient-to-bl from-[#2184CE] to-[#9020AD] ${
                    strapsColor.length !== 0 &&
                    strapsColor.indexOf('purple-blue') === -1
                      ? 'opacity-50'
                      : 'opacity-100'
                  }`}></button>
                <button
                  onClick={(e) => handleSetStrapsColor(e, 'black')}
                  className={`w-10 h-10 rounded-md bg-gradient-to-bl from-[#707885] to-[#363636] ${
                    strapsColor.length !== 0 &&
                    strapsColor.indexOf('black') === -1
                      ? 'opacity-50'
                      : 'opacity-100'
                  }`}></button>
              </div>
            </label>
          </div>

          <Button
            text="Apply Filters"
            className="w-full text-[14px] font-default"
            type="submit"
          />
        </form>
      </aside>

      {/* mobile filters */}
      <div className="bg-pearl sticky z-50 top-0 xl:hidden">
        <div className="container">
          <form onSubmit={handleSubmitFormForMobile}>
            {isOpen && (
              <motion.div
                className="pt-9 pb-5 text-silver text-[10px] font-poppins md:text-[12px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}>
                <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 pb-5 px-[15px]">
                  <h4 className=" text-black font-semibold ">Search</h4>
                  <input
                    className="rounded-sm bg-white py-[14px] px-5 w-full"
                    type="text"
                    placeholder="Type Here"
                    value={searchText}
                    onChange={handleSearchText}
                  />
                </label>

                <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 py-5 px-[15px]">
                  <h4 className=" text-black font-semibold ">
                    Select Products
                  </h4>
                  <div className="bg-white flex items-center w-fit rounded-sm overflow-hidden">
                    <button
                      className={`py-[14px] px-[52px] rounded-sm ${
                        productType === 'watches' &&
                        'bg-darkBurgundy text-white'
                      }`}
                      onClick={(e) => handleProductType(e, 'watches')}>
                      Watches
                    </button>
                    <button
                      className={`py-[14px] px-[52px] rounded-sm ${
                        productType === 'straps' && 'bg-darkBurgundy text-white'
                      }`}
                      onClick={(e) => handleProductType(e, 'straps')}>
                      Straps
                    </button>
                  </div>
                </label>

                <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 py-5 px-[15px]">
                  <h4 className="text-black font-semibold">Price Range</h4>
                  <div className="flex gap-[15px] items-center">
                    <input
                      className="rounded-sm bg-white py-[14px] text-center w-[76px] appearance-none"
                      type="text"
                      placeholder="$0"
                      onChange={handleMinPrice}
                    />
                    <span className="text-silver text-[10px] font-poppins">
                      to
                    </span>
                    <input
                      className="rounded-sm bg-white py-[14px] text-center w-[76px]"
                      type="text"
                      placeholder="$150"
                      onChange={handleMaxPrice}
                    />
                  </div>
                </label>

                <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 py-5 px-[15px] ">
                  <h4 className=" text-black font-semibold">Case Color</h4>
                  <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-md bg-gradient-to-bl from-[#555555] to-[#0A0A0A]"></button>
                    <button className="w-10 h-10 rounded-md bg-gradient-to-bl from-[#e3e3e3] to-[#7B838F]"></button>
                    <button className="w-10 h-10 rounded-md bg-gradient-to-bl from-[#58B2CE] to-[#023C96]"></button>
                  </div>
                </label>

                <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 py-5 px-[15px] ">
                  <h4 className=" text-black font-semibold">
                    Filter By Strap Colors
                  </h4>
                  <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-md bg-gradient-to-bl from-[#D39138] to-[#B95371]"></button>
                    <button className="w-10 h-10 rounded-md bg-gradient-to-bl from-[#2D9B87] to-[#AF29CB]"></button>
                    <button className="w-10 h-10 rounded-md bg-gradient-to-bl from-[#2184CE] to-[#9020AD]"></button>
                    <button className="w-10 h-10 rounded-md bg-gradient-to-bl from-[#707885] to-[#363636]"></button>
                  </div>
                </label>
              </motion.div>
            )}
            <div className="flex justify-between items-center py-[22px]">
              {isOpen ? (
                <Button
                  text="Apply Filters"
                  className="px-[50px] text-[14px] font-default"
                  type="submit"
                />
              ) : (
                <h2 className="font-spaceage text-[28px] leading-[25px]">
                  Fillters
                </h2>
              )}

              <button
                className="w-[55px] h-[55px] rounded-md border border-darkBurgundy flex items-center justify-center hover:bg-white duration-300"
                onClick={handleOpenFilterClick}>
                <Image
                  src={ArrowUp}
                  alt="arrow up"
                  className={`object-fit transition-transform ${
                    isOpen ? '' : 'rotate-180'
                  }`}
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CategoryAsideFilters;
