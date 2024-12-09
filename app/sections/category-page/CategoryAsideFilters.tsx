"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import ArrowUp from "@/images/category-section/arrow-up.svg";
import Button from "@/components/ButtonComponent";
import { useFilters } from "@/hooks/useFilters";
import { CardProps } from "@/config/types";
import { getProducts } from "@/services/ProductService";
import { useCustomPagination } from "@/hooks/useCustomPagination";
import CustomFilterComponent from "@/components/filters-component/CustomFilterComponent";

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
  filtersData,
}: {
  handleUpdateProducts: (newProducts: CardProps[]) => void;
  handleChangeTotalProducts: (num: number) => void;
  limit: number;
  filtersData: any;
}) => {
  const { filters, dispatch } = useFilters();
  const { setPageInfo, setTotalPages, pageInfo, currentPage, totalPages } =
    useCustomPagination();

  const [searchText, setSearchText] = useState<string>("");
  const [priceRangeFromObject, setPriceRangeFromObject] = useState<
    [number, number]
  >([0, 30000]);
  const [productType, setProductType] = useState<string>("");
  const [watchesColor, setWatchesColor] = useState<string[]>([]);
  const [strapsColor, setStrapsColor] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [previousPage, setPreviousPage] = useState<number>(0);

  const [isOpen, setIsOpen] = useState<boolean>(false);

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
  const newHandleSearchText = (query: string) => {
    setSearchText(query);
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

  const changeProductType = (type: string) => {
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

  const handleSetWatchesColor1 = (value: string) => {
    handleChangeCategory(value, setWatchesColor);
  };

  const handleSetStrapsColor1 = (value: string) => {
    handleChangeCategory(value, setStrapsColor);
  };

  const handleSetCountries1 = (value: string) => {
    handleChangeCategory(value, setCountries);
  };

  const handleChangeCategory = function <T>(
    value: T,
    setState: React.Dispatch<React.SetStateAction<T[]>>
  ) {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRangeFromObject(value);
  };

  const handleApplyPrice = () => {
    console.log(priceRangeFromObject);
    dispatch({ type: "SET_MIN_PRICE", payload: priceRangeFromObject[0] });
    dispatch({ type: "SET_MAX_PRICE", payload: priceRangeFromObject[1] });
  };

  const handleApplySearch = () => {
    console.log(searchText);
    dispatch({ type: "SET_SEARCH_TEXT", payload: searchText });
  };

  const handleSubmitFormForPc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "SET_SEARCH_TEXT", payload: searchText });
    dispatch({ type: "SET_MIN_PRICE", payload: priceRangeFromObject[0] });
    dispatch({ type: "SET_MAX_PRICE", payload: priceRangeFromObject[1] });
    dispatch({ type: "SET_PRODUCT_TYPE", payload: productType });
    dispatch({ type: "TOGGLE_WATCH_COLOR", payload: watchesColor });
    dispatch({ type: "TOGGLE_STRAP_COLOR", payload: strapsColor });
    dispatch({ type: "SET_COUNTRIES", payload: countries });
  };

  const handleSubmitFormForMobile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "SET_SEARCH_TEXT", payload: searchText });
    dispatch({ type: "SET_MIN_PRICE", payload: priceRangeFromObject[0] });
    dispatch({ type: "SET_MAX_PRICE", payload: priceRangeFromObject[1] });
    dispatch({ type: "SET_PRODUCT_TYPE", payload: productType });
    dispatch({ type: "TOGGLE_WATCH_COLOR", payload: watchesColor });
    dispatch({ type: "TOGGLE_STRAP_COLOR", payload: strapsColor });
    dispatch({ type: "SET_COUNTRIES", payload: countries });

    setIsOpen(false);
  };

  return (
    <>
      {/* pc filters */}
      <aside className="hidden w-[30%] xl:block xl:bg-pearl pt-[43px] pb-[93px] pl-[30px] pr-[30px]">
        <form
          onSubmit={handleSubmitFormForPc}
          className="pb-5 flex flex-col gap-5 font-poppins ">
          {filtersData.search.title && (
            <CustomFilterComponent
              title={filtersData.search.title}
              type="search"
              searchQuery={searchText}
              onSearchChange={newHandleSearchText}
              clearSearchQuery={() => setSearchText("")}
              onApplyClick={handleApplySearch}
            />
          )}

          {filtersData.buttons.title && (
            <CustomFilterComponent
              title={filtersData.buttons.title}
              type="buttons"
              items={filtersData.buttons.value}
              activeButton={productType}
              onChangeButton={changeProductType}
            />
          )}

          {filtersData.priceRange.title && (
            <CustomFilterComponent
              title={filtersData.priceRange.title}
              type="price"
              rangeValue={priceRangeFromObject}
              step={1}
              onRangeChange={handlePriceChange}
              onApplyClick={handleApplyPrice}
            />
          )}

          {/* TODO для кожного блоку useState */}
          {filtersData.checkboxes.length > 0 &&
            filtersData.checkboxes.map((item: any) => (
              <CustomFilterComponent
                key={item.title}
                title={item.title}
                type="checkboxes"
                items={item.value}
                selectedItems={countries}
                onItemChange={handleSetCountries1}
              />
            ))}

          <Button
            text="Apply Filters"
            className="w-full text-[16px] font-medium"
            type="submit"
          />
        </form>
      </aside>

      {/* mobile filters */}
      <div className="z-20 top-0 xl:hidden bg-pearl">
        <div className="lg:px-[125px] md:px-[75px] px-5 absolute w-full bg-pearl z-20">
          <form onSubmit={handleSubmitFormForMobile}>
            {/* {isOpen && ( */}
            <motion.div
              className={`bg-pearl flex flex-col gap-5 font-poppins h-fit ${
                isOpen ? "pt-5" : ""
              }`}
              initial={{
                opacity: 0,
                height: 0,
                visibility: "hidden",
                translateY: "-500px",
              }}
              animate={{
                opacity: isOpen ? 1 : 0,
                height: isOpen ? "fit-content" : 0,
                visibility: isOpen ? "visible" : "hidden",
                translateY: isOpen ? "0" : "-500px",
              }}
              transition={{ duration: 0.5 }}>
              {filtersData.search.title && (
                <CustomFilterComponent
                  title={filtersData.search.title}
                  type="search"
                  searchQuery={searchText}
                  onSearchChange={newHandleSearchText}
                  clearSearchQuery={() => setSearchText("")}
                  onApplyClick={handleApplySearch}
                />
              )}

              {filtersData.buttons.title && (
                <CustomFilterComponent
                  title={filtersData.buttons.title}
                  type="buttons"
                  items={filtersData.buttons.value}
                  activeButton={productType}
                  onChangeButton={changeProductType}
                />
              )}

              {filtersData.priceRange.title && (
                <CustomFilterComponent
                  title={filtersData.priceRange.title}
                  type="price"
                  rangeValue={priceRangeFromObject}
                  step={1}
                  onRangeChange={handlePriceChange}
                  onApplyClick={handleApplyPrice}
                />
              )}

              {/* TODO для кожного блоку useState */}
              {filtersData.checkboxes.length > 0 &&
                filtersData.checkboxes.map((item: any) => (
                  <CustomFilterComponent
                    key={item.title}
                    title={item.title}
                    type="checkboxes"
                    items={item.value}
                    selectedItems={countries}
                    onItemChange={handleSetCountries1}
                  />
                ))}
            </motion.div>
            {/* )} */}
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
                  Filters
                </h2>
              )}

              <button
                className="w-[55px] h-[55px] rounded-md border border-darkBurgundy flex items-center justify-center hover:bg-white duration-300"
                onClick={handleOpenFilterClick}>
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
