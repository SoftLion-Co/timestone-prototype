"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import ArrowUp from "@/images/category-section/arrow-up.svg";
import Button from "@/components/ButtonComponent";
import { useFilters } from "@/hooks/useFilters";
import { CardProps } from "@/config/types";
import { getProducts } from "@/services/ProductService";
import FilterContainerComponent from "@/components/filters-component/FilterContainerComponent";
import FilterComponent from "@/components/filters-component/FilterComponent";
import { useCustomPagination } from "@/hooks/useCustomPagination";

const DEF_COUNTRIES = [
  "USA",
  "Ukraine",
  "Germany",
  "France",
  "Italy",
  "Sweden",
  "Albania",
  "Poland",
  "Greece",
];
const DEF_WATCHESCOLOR = ["black", "silver", "blue", "white"];
const DEF_STRAPSCOLOR = ["orange", "purplegreen", "purpleblue", "black"];

const CategoryAsideFilters = ({
  handleUpdateProducts,
  handleChangeTotalProducts,
  limit,
}: {
  handleUpdateProducts: (newProducts: CardProps[]) => void;
  handleChangeTotalProducts: (num: number) => void;
  limit: number;
}) => {
  const { filters, dispatch } = useFilters();
  const { setPageInfo, setTotalPages, pageInfo, currentPage, totalPages } =
    useCustomPagination();

  const [searchText, setSearchText] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [productType, setProductType] = useState<string>("");
  const [watchesColor, setWatchesColor] = useState<string[]>([]);
  const [strapsColor, setStrapsColor] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [previousPage, setPreviousPage] = useState<number>(0);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isOpenCountriesItem, setIsOpenCountriesItem] =
    useState<boolean>(false);
  const [isOpenCaseItem, setIsOpenCaseItem] = useState<boolean>(false);
  const [isOpenStrapsItem, setIsOpenStrapsItem] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      await getProductData(false);
    };

    getData();
  }, [currentPage]);

  const handleSubmitFilters = async () => {
    await getProductData(true);
  };

  const getProductData = async (isForm: boolean) => {
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

    let data;

    if (currentPage == 1 || isForm) {
		console.log(10);
      data = await getProducts(
        selectedFilters,
        selectedOptions,
        limit,
        "",
        filters.sortedBy,
        filters.reverse,
        true
      );
      // } else if (currentPage == totalPages) {
      //   data = await getProducts(
      //     selectedFilters,
      //     selectedOptions,
      //     limit,
      //     "",
      //     filters.sortedBy,
      //     filters.reverse,
      //     false
      //   );
    } else if (previousPage < currentPage) {
      data = await getProducts(
        selectedFilters,
        selectedOptions,
        limit,
        pageInfo.endCursor,
        filters.sortedBy,
        filters.reverse,
        true
      );
    } else {
      data = await getProducts(
        selectedFilters,
        selectedOptions,
        limit,
        pageInfo.startCursor,
        filters.sortedBy,
        filters.reverse,
        false
      );
    }
    console.log("d", data);

    setPageInfo(data.pageInfo);
    setPreviousPage(currentPage);
    setTotalPages(data.count === 0 ? 1 : Math.ceil(data.count / limit));

    handleUpdateProducts([...data.products]);
    handleChangeTotalProducts(data.count);
  };

  const handleOpenFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen((isOpen) => !isOpen);
  };

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(+e.target.value);
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(+e.target.value);
  };

  const handleProductType = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: string
  ) => {
    e.preventDefault();

    if (type !== productType) {
      setProductType(type);
    } else {
      setProductType("");
    }
  };

  const handleSetWatchesColor = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    if (e.target.checked) {
      setWatchesColor((watchesColor) => [...watchesColor, value]);
    } else {
      setWatchesColor(watchesColor.filter((c) => c !== value));
    }
  };

  const handleSetStrapsColor = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    if (e.target.checked) {
      setStrapsColor((strapsColor) => [...strapsColor, value]);
    } else {
      setStrapsColor(strapsColor.filter((c) => c !== value));
    }
  };

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

  const handleSubmitFormForPc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "SET_SEARCH_TEXT", payload: searchText });
    dispatch({ type: "SET_MIN_PRICE", payload: minPrice });
    dispatch({ type: "SET_MAX_PRICE", payload: maxPrice });
    dispatch({ type: "SET_PRODUCT_TYPE", payload: productType });
    dispatch({ type: "TOGGLE_WATCH_COLOR", payload: watchesColor });
    dispatch({ type: "TOGGLE_STRAP_COLOR", payload: strapsColor });
    dispatch({ type: "SET_COUNTRIES", payload: countries });
  };

  const handleSubmitFormForMobile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "SET_SEARCH_TEXT", payload: searchText });
    dispatch({ type: "SET_MIN_PRICE", payload: minPrice });
    dispatch({ type: "SET_MAX_PRICE", payload: maxPrice });
    dispatch({ type: "SET_PRODUCT_TYPE", payload: productType });
    dispatch({ type: "TOGGLE_WATCH_COLOR", payload: watchesColor });
    dispatch({ type: "TOGGLE_STRAP_COLOR", payload: strapsColor });
    dispatch({ type: "SET_COUNTRIES", payload: countries });

    setIsOpen(false);
  };

  return (
    <>
      {/* pc filters */}
      <aside className="hidden xl:block xl:bg-pearl pt-[43px] pb-[93px] pl-[30px] pr-[50px]">
        <form onSubmit={handleSubmitFormForPc}>
          <div className="pb-5 text-silver text-[12px] font-poppins">
            <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 pb-5">
              <h4 className=" text-black font-semibold">Search</h4>
              <input
                className="rounded-sm bg-white py-[14px] px-5 w-full focus:outline-none focus:border-[1px] focus:border-darkBurgundy"
                type="text"
                placeholder="Type Here"
                value={searchText}
                onChange={handleSearchText}
              />
            </label>

            <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 py-5">
              <h4 className="text-black font-semibold">Price Range</h4>

              <div className="flex gap-[15px] items-center">
                <input
                  className="rounded-sm bg-white py-[14px] text-center w-[76px] appearance-none focus:outline-none focus:border-[1px] focus:border-darkBurgundy"
                  type="text"
                  placeholder="$0"
                  onChange={handleMinPrice}
                />
                <span className="text-silver text-[12px] font-poppins ">
                  to
                </span>
                <input
                  className="rounded-sm bg-white py-[14px] text-center w-[76px] focus:outline-none focus:border-[1px] focus:border-darkBurgundy"
                  type="text"
                  placeholder="$150"
                  onChange={handleMaxPrice}
                />
              </div>
            </label>

            <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 py-5">
              <h4 className=" text-black font-semibold ">Select Products</h4>

              <div className="flex flex-col justify-start items-start gap-1">
                <button
                  onClick={(e) => handleProductType(e, "watches")}
                  className={`${productType === "watches" ? "font-bold" : ""}`}
                >
                  Watches
                </button>
                <button
                  onClick={(e) => handleProductType(e, "straps")}
                  className={`${productType === "straps" ? "font-bold" : ""}`}
                >
                  Straps
                </button>
              </div>
            </label>

            <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 py-5">
              <div className="flex justify-between items-center">
                <h4 className=" text-black font-semibold ">Select Countries</h4>
                <div className="flex justify-center items-center h-5 w-5 cursor-pointer">
                  <button
                    className={`relative bg-darkBurgundy h-[2px] w-5 ${
                      isOpenCountriesItem
                        ? ""
                        : " after:absolute after:h-[2px] after:bg-darkBurgundy after:w-5 after:top-0 after:left-0 after:rotate-90"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpenCountriesItem(
                        (isOpenCountriesItem) => !isOpenCountriesItem
                      );
                    }}
                  ></button>
                </div>
              </div>
              <FilterContainerComponent
                filters={{
                  isOpen: isOpenCountriesItem,
                  styles: "",
                }}
              >
                <div className="flex flex-col justify-start items-start gap-2 overflow-y-scroll h-24">
                  {DEF_COUNTRIES.map((coutry) => (
                    <div className="flex gap-2" key={coutry}>
                      <input
                        type="checkbox"
                        className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-darkBurgundy checked:border-darkBurgundy checked:after:content-['✔'] checked:after:flex checked:after:justify-center checked:after:items-center checked:after:w-full checked:after:h-full checked:after:text-white focus:outline-none focus:ring-0"
                        checked={
                          countries.find((item) => item === coutry)
                            ? true
                            : false
                        }
                        onChange={(e) => handleSetCountries(e, coutry)}
                      />
                      <span>{coutry}</span>
                    </div>
                  ))}
                </div>
              </FilterContainerComponent>
            </label>

            <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 py-5">
              <div className="flex justify-between items-center">
                <h4 className=" text-black font-semibold">Case Color</h4>
                <div className="flex justify-center items-center h-5 w-5 cursor-pointer">
                  <button
                    className={`relative bg-darkBurgundy h-[2px] w-5 ${
                      isOpenCaseItem
                        ? ""
                        : " after:absolute after:h-[2px] after:bg-darkBurgundy after:w-5 after:top-0 after:left-0 after:rotate-90"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpenCaseItem((isOpenCaseItem) => !isOpenCaseItem);
                    }}
                  ></button>
                </div>
              </div>
              <FilterContainerComponent
                filters={{
                  isOpen: isOpenCaseItem,
                  styles: "",
                }}
              >
                <div className="flex flex-col justify-start items-start gap-2 overflow-y-scroll h-24">
                  {DEF_WATCHESCOLOR.map((watchColor) => (
                    <div className="flex gap-2" key={watchColor}>
                      <input
                        type="checkbox"
                        className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-darkBurgundy checked:border-darkBurgundy checked:after:content-['✔'] checked:after:flex checked:after:justify-center checked:after:items-center checked:after:w-full checked:after:h-full checked:after:text-white focus:outline-none focus:ring-0"
                        checked={
                          watchesColor.find((item) => item === watchColor)
                            ? true
                            : false
                        }
                        onChange={(e) => handleSetWatchesColor(e, watchColor)}
                      />
                      <span>{watchColor}</span>
                    </div>
                  ))}
                </div>
              </FilterContainerComponent>
            </label>

            <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 py-5">
              <div className="flex justify-between items-center">
                <h4 className=" text-black font-semibold">
                  Filter By Strap Colors
                </h4>
                <div className="flex justify-center items-center h-5 w-5 cursor-pointer">
                  <button
                    className={`relative bg-darkBurgundy h-[2px] w-5 ${
                      isOpenStrapsItem
                        ? ""
                        : " after:absolute after:h-[2px] after:bg-darkBurgundy after:w-5 after:top-0 after:left-0 after:rotate-90"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpenStrapsItem(
                        (isOpenStrapsItem) => !isOpenStrapsItem
                      );
                    }}
                  ></button>
                </div>
              </div>
              <FilterContainerComponent
                filters={{ isOpen: isOpenStrapsItem, styles: "" }}
              >
                <div className="flex flex-col justify-start items-start gap-2 overflow-y-scroll h-24">
                  {DEF_STRAPSCOLOR.map((strapColor) => (
                    <div className="flex gap-2" key={strapColor}>
                      <input
                        type="checkbox"
                        className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-darkBurgundy checked:border-darkBurgundy checked:after:content-['✔'] checked:after:flex checked:after:justify-center checked:after:items-center checked:after:w-full checked:after:h-full checked:after:text-white focus:outline-none focus:ring-0"
                        checked={
                          strapsColor.find((item) => item === strapColor)
                            ? true
                            : false
                        }
                        onChange={(e) => handleSetStrapsColor(e, strapColor)}
                      />
                      <span>{strapColor}</span>
                    </div>
                  ))}
                </div>
              </FilterContainerComponent>
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
      <div className="z-50 top-0 xl:hidden bg-pearl">
        <div className="container">
          <form onSubmit={handleSubmitFormForMobile}>
            {isOpen && (
              <motion.div
                className="bg-pearl pt-9 pb-5 text-silver text-[10px] font-poppins md:text-[12px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 pb-5 px-[15px]">
                  <h4 className=" text-black font-semibold ">Search</h4>
                  <input
                    className="rounded-sm bg-white py-[14px] px-5 w-full focus:outline-none focus:border-[1px] focus:border-darkBurgundy"
                    type="text"
                    placeholder="Type Here"
                    value={searchText}
                    onChange={handleSearchText}
                  />
                </label>

                <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 py-5 px-[15px]">
                  <h4 className="text-black font-semibold">Price Range</h4>
                  <div className="flex gap-[15px] items-center">
                    <input
                      className="rounded-sm bg-white py-[14px] text-center w-[76px] appearance-none outline-1 focus:outline-none focus:border-[1px] focus:border-darkBurgundy"
                      type="text"
                      placeholder="$0"
                      onChange={handleMinPrice}
                    />
                    <span className="text-silver text-[10px] font-poppins">
                      to
                    </span>
                    <input
                      className="rounded-sm bg-white py-[14px] text-center w-[76px] outline-1 focus:outline-none focus:border-[1px] focus:border-darkBurgundy"
                      type="text"
                      placeholder="$150"
                      onChange={handleMaxPrice}
                    />
                  </div>
                </label>

                <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 py-5 px-[15px]">
                  <h4 className=" text-black font-semibold ">
                    Select Products
                  </h4>
                  <div className="bg-darkBurgundy border-darkBurgundy border flex items-center w-fit rounded-md overflow-hidden gap-[2px]">
                    <button
                      className={`py-[14px] px-[52px] ${
                        productType === "watches"
                          ? "bg-darkBurgundy text-white"
                          : "bg-white"
                      }`}
                      onClick={(e) => handleProductType(e, "watches")}
                    >
                      Watches
                    </button>
                    <button
                      className={`py-[14px] px-[52px] ${
                        productType === "straps"
                          ? "bg-darkBurgundy text-white"
                          : "bg-white"
                      }`}
                      onClick={(e) => handleProductType(e, "straps")}
                    >
                      Straps
                    </button>
                  </div>
                </label>

                <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 py-5 px-[15px]">
                  <div className="flex justify-between items-center">
                    <h4 className=" text-black font-semibold ">
                      Select Countries
                    </h4>
                    <div className="flex justify-center items-center h-5 w-5 cursor-pointer">
                      <button
                        className={`relative bg-darkBurgundy h-[2px] w-5 ${
                          isOpenCountriesItem
                            ? ""
                            : " after:absolute after:h-[2px] after:bg-darkBurgundy after:w-5 after:top-0 after:left-0 after:rotate-90"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpenCountriesItem(
                            (isOpenCountriesItem) => !isOpenCountriesItem
                          );
                        }}
                      ></button>
                    </div>
                  </div>
                  <FilterContainerComponent
                    filters={{
                      isOpen: isOpenCountriesItem,
                      styles: "",
                    }}
                  >
                    <div className="flex flex-col justify-start items-start gap-2 overflow-y-scroll h-24">
                      {DEF_COUNTRIES.map((coutry) => (
                        <div className="flex gap-2" key={coutry}>
                          <input
                            type="checkbox"
                            className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-darkBurgundy checked:border-darkBurgundy checked:after:content-['✔'] checked:after:flex checked:after:justify-center checked:after:items-center checked:after:w-full checked:after:h-full checked:after:text-white focus:outline-none focus:ring-0"
                            checked={
                              countries.find((item) => item === coutry)
                                ? true
                                : false
                            }
                            onChange={(e) => handleSetCountries(e, coutry)}
                          />
                          <span>{coutry}</span>
                        </div>
                      ))}
                    </div>
                  </FilterContainerComponent>
                </label>

                <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 py-5 px-[15px]">
                  <div className="flex justify-between items-center">
                    <h4 className=" text-black font-semibold">Case Color</h4>
                    <div className="flex justify-center items-center h-5 w-5 cursor-pointer">
                      <button
                        className={`relative bg-darkBurgundy h-[2px] w-5 ${
                          isOpenCaseItem
                            ? ""
                            : " after:absolute after:h-[2px] after:bg-darkBurgundy after:w-5 after:top-0 after:left-0 after:rotate-90"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpenCaseItem(
                            (isOpenCaseItem) => !isOpenCaseItem
                          );
                        }}
                      ></button>
                    </div>
                  </div>
                  <FilterContainerComponent
                    filters={{
                      isOpen: isOpenCaseItem,
                      styles: "",
                    }}
                  >
                    <div className="flex flex-col justify-start items-start gap-2 overflow-y-scroll h-24">
                      {DEF_WATCHESCOLOR.map((watchColor) => (
                        <div className="flex gap-2" key={watchColor}>
                          <input
                            type="checkbox"
                            className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-darkBurgundy checked:border-darkBurgundy checked:after:content-['✔'] checked:after:flex checked:after:justify-center checked:after:items-center checked:after:w-full checked:after:h-full checked:after:text-white focus:outline-none focus:ring-0"
                            checked={
                              watchesColor.find((item) => item === watchColor)
                                ? true
                                : false
                            }
                            onChange={(e) =>
                              handleSetWatchesColor(e, watchColor)
                            }
                          />
                          <span>{watchColor}</span>
                        </div>
                      ))}
                    </div>
                  </FilterContainerComponent>
                </label>

                <label className="flex flex-col gap-[10px] border-b border-silver border-opacity-20 py-5 px-[15px]">
                  <div className="flex justify-between items-center">
                    <h4 className=" text-black font-semibold">
                      Filter By Strap Colors
                    </h4>
                    <div className="flex justify-center items-center h-5 w-5 cursor-pointer">
                      <button
                        className={`relative bg-darkBurgundy h-[2px] w-5 ${
                          isOpenStrapsItem
                            ? ""
                            : " after:absolute after:h-[2px] after:bg-darkBurgundy after:w-5 after:top-0 after:left-0 after:rotate-90"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpenStrapsItem(
                            (isOpenStrapsItem) => !isOpenStrapsItem
                          );
                        }}
                      ></button>
                    </div>
                  </div>
                  <FilterContainerComponent
                    filters={{ isOpen: isOpenStrapsItem, styles: "" }}
                  >
                    <div className="flex flex-col justify-start items-start gap-2 overflow-y-scroll h-24">
                      {DEF_STRAPSCOLOR.map((strapColor) => (
                        <div className="flex gap-2" key={strapColor}>
                          <input
                            type="checkbox"
                            className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-darkBurgundy checked:border-darkBurgundy checked:after:content-['✔'] checked:after:flex checked:after:justify-center checked:after:items-center checked:after:w-full checked:after:h-full checked:after:text-white focus:outline-none focus:ring-0"
                            checked={
                              strapsColor.find((item) => item === strapColor)
                                ? true
                                : false
                            }
                            onChange={(e) =>
                              handleSetStrapsColor(e, strapColor)
                            }
                          />
                          <span>{strapColor}</span>
                        </div>
                      ))}
                    </div>
                  </FilterContainerComponent>
                </label>
              </motion.div>
            )}
            <div className="flex justify-between items-center py-[22px]">
              {isOpen ? (
                <Button
                  text="Apply Filters"
                  className="px-[50px] text-[14px] font-default"
                  type="submit"
                  onClick={handleSubmitFilters}
                />
              ) : (
                <h2 className="font-spaceage text-[28px] leading-[25px]">
                  Fillters
                </h2>
              )}

              <button
                className="w-[55px] h-[55px] rounded-md border border-darkBurgundy flex items-center justify-center hover:bg-white duration-300"
                onClick={handleOpenFilterClick}
              >
                <Image
                  src={ArrowUp}
                  alt="arrow up"
                  className={`object-fit transition-transform ${
                    isOpen ? "" : "rotate-180"
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
