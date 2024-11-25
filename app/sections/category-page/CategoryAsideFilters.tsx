'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import ArrowUp from '@/images/category-section/arrow-up.svg';
import Button from '@/components/ButtonComponent';
import { useFilters } from '@/hooks/useFilters';
import { CardProps } from '@/config/types';
import { getProducts } from '@/services/ProductService';
import { reverse } from 'dns';

const CategoryAsideFilters = ({
  handleUpdateProducts,
  handleChangeTotalProducts,
}: {
  handleUpdateProducts: (newProducts: CardProps[]) => void;
  handleChangeTotalProducts: (num: number) => void;
}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [productType, setProductType] = useState<string>('');
  const [watchesColor, setWatchesColor] = useState<string[]>([]);
  const [strapsColor, setStrapsColor] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  const { filters, dispatch } = useFilters();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // open and close filters
  const [isOpenCountriesItem, setIsOpenCountriesItem] =
    useState<boolean>(false);
  const [isOpenTypeItem, setIsOpenTypeItem] = useState<boolean>(false);
  const [isOpenCaseItem, setIsOpenCaseItem] = useState<boolean>(false);
  const [isOpenStrapsItem, setIsOpenStrapsItem] = useState<boolean>(false);

  // get products
  useEffect(() => {
    const getData = async () => {
      const data = await getProducts();

      const selectedFilters = {
        productType: filters.productType,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        searchText: filters.searchText,
      };

      const selectedOptions = {
        colors: filters.watchesColor,
        countries: filters.countries,
        strapsColor: filters.strapsColor,
      };

      let hasNext = data.pageInfo.hasNextPage;
      let end = data.pageInfo.endCursor;
      let sum = data.products.length;
      let allProducts = [...data.products];

      while (hasNext) {
        const newData = await getProducts(
          selectedFilters,
          selectedOptions,
          end
        );
        sum += newData.products.length;
        hasNext = newData.pageInfo.hasNextPage;
        end = newData.pageInfo.endCursor;
        allProducts.push(...newData.products);
      }

      handleUpdateProducts(allProducts);
      handleChangeTotalProducts(sum);
    };

    getData();
  }, []);

  // get filtered products
  useEffect(() => {
    const getData = async () => {
      const selectedFilters = {
        productType: filters.productType,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        searchText: filters.searchText,
      };

      const selectedOptions = {
        colors: filters.watchesColor,
        countries: filters.countries,
        strapsColor: filters.strapsColor,
      };

      const data = await getProducts(
        selectedFilters,
        selectedOptions,
        9,
        '',
        filters.sortedBy,
        filters.reverse
      );

      let allProducts = [...data.products];

      let hasNext = data.pageInfo.hasNextPage;
      let end = data.pageInfo.endCursor;
      let sum = data.products.length;

      while (hasNext) {
        const newData = await getProducts({
          filters: selectedFilters,
          options: selectedOptions,
          pageCursor: end,
        });

        sum += newData.products.length;
        hasNext = newData.pageInfo.hasNextPage;
        end = newData.pageInfo.endCursor;
        allProducts.push(...newData.filteredProducts);
      }

      handleUpdateProducts(allProducts);
      handleChangeTotalProducts(sum);

      window.scrollTo({ top: 100, behavior: 'smooth' });
    };

    getData();
  }, [filters]);

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

  // set straps colors
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

  // set countries
  const handleSetCountries = (
    e: React.ChangeEvent<HTMLInputElement>,
    country: string
  ) => {
    if (e.target.checked) {
      setCountries((countries) => [...countries, country]);
    } else {
      setCountries(countries.filter((c) => c !== country));
    }
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
    dispatch({ type: 'SET_COUNTRIES', payload: countries });
  };

  const handleSubmitFormForMobile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: 'SET_SEARCH_TEXT', payload: searchText });
    dispatch({ type: 'SET_MIN_PRICE', payload: minPrice });
    dispatch({ type: 'SET_MAX_PRICE', payload: maxPrice });
    dispatch({ type: 'SET_PRODUCT_TYPE', payload: productType });
    dispatch({ type: 'TOGGLE_WATCH_COLOR', payload: watchesColor });
    dispatch({ type: 'TOGGLE_STRAP_COLOR', payload: strapsColor });
    dispatch({ type: 'SET_COUNTRIES', payload: countries });

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
              <div className="flex justify-between items-center">
                <h4 className=" text-black font-semibold ">Select Countries</h4>
                <button
                  className={`relative bg-darkBurgundy h-[2px] w-5 ${
                    isOpenCountriesItem
                      ? ''
                      : ' after:absolute after:h-[2px] after:bg-darkBurgundy after:w-5 after:top-0 after:left-0 after:rotate-90'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpenCountriesItem(
                      (isOpenCountriesItem) => !isOpenCountriesItem
                    );
                  }}></button>
              </div>

              <motion.div className="flex flex-col justify-start items-start gap-1">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-darkBurgundy checked:border-darkBurgundy checked:after:content-['✔'] checked:after:flex checked:after:justify-center checked:after:items-center checked:after:w-full checked:after:h-full checked:after:text-white focus:outline-none focus:ring-0"
                    onChange={(e) => handleSetCountries(e, 'USA')}
                  />
                  <span>USA</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-darkBurgundy checked:border-darkBurgundy checked:after:content-['✔'] checked:after:flex checked:after:justify-center checked:after:items-center checked:after:w-full checked:after:h-full checked:after:text-white focus:outline-none focus:ring-0"
                    onChange={(e) => handleSetCountries(e, 'Ukraine')}
                  />
                  <span>Ukraine</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-darkBurgundy checked:border-darkBurgundy checked:after:content-['✔'] checked:after:flex checked:after:justify-center checked:after:items-center checked:after:w-full checked:after:h-full checked:after:text-white focus:outline-none focus:ring-0"
                    onChange={(e) => handleSetCountries(e, 'Germany')}
                  />
                  <span>Germany</span>
                </div>
              </motion.div>
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
                  onClick={(e) => handleSetWatchesColor(e, 'Black')}
                  className={`w-10 h-10 rounded-md bg-gradient-to-bl from-[#555555] to-[#0A0A0A] ${
                    watchesColor.length !== 0 &&
                    watchesColor.indexOf('Black') === -1
                      ? 'opacity-50'
                      : 'opacity-100'
                  }`}></button>
                <button
                  onClick={(e) => handleSetWatchesColor(e, 'Silver')}
                  className={`w-10 h-10 rounded-md bg-gradient-to-bl from-[#e3e3e3] to-[#7B838F] ${
                    watchesColor.length !== 0 &&
                    watchesColor.indexOf('Silver') === -1
                      ? 'opacity-50'
                      : 'opacity-100'
                  }`}></button>
                <button
                  onClick={(e) => handleSetWatchesColor(e, 'Blue')}
                  className={`w-10 h-10 rounded-md bg-gradient-to-bl from-[#58B2CE] to-[#023C96] ${
                    watchesColor.length !== 0 &&
                    watchesColor.indexOf('Blue') === -1
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
                  onClick={(e) => handleSetStrapsColor(e, 'purplegreen')}
                  className={`w-10 h-10 rounded-md bg-gradient-to-bl from-[#2D9B87] to-[#AF29CB] ${
                    strapsColor.length !== 0 &&
                    strapsColor.indexOf('purplegreen') === -1
                      ? 'opacity-50'
                      : 'opacity-100'
                  }`}></button>
                <button
                  onClick={(e) => handleSetStrapsColor(e, 'purpleblue')}
                  className={`w-10 h-10 rounded-md bg-gradient-to-bl from-[#2184CE] to-[#9020AD] ${
                    strapsColor.length !== 0 &&
                    strapsColor.indexOf('purpleblue') === -1
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
      <div className="z-50 top-0 xl:hidden">
        <div className="container">
          <form onSubmit={handleSubmitFormForMobile}>
            {isOpen && (
              <motion.div
                className="bg-pearl pt-9 pb-5 text-silver text-[10px] font-poppins md:text-[12px]"
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
                    Select Countries
                  </h4>
                  <div className="flex flex-col justify-start items-start gap-1">
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        onChange={(e) => handleSetCountries(e, 'USA')}
                      />
                      <span>USA</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        onChange={(e) => handleSetCountries(e, 'Ukraine')}
                      />
                      <span>Ukraine</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        onChange={(e) => handleSetCountries(e, 'Germany')}
                      />
                      <span>Germany</span>
                    </div>
                  </div>
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

                <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 py-5 px-[15px]">
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

                <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 py-5 px-[15px]">
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
