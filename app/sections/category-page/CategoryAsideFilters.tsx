"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import { CardProps } from "@/config/types";
import FiltersSkeleton from "./FilterSceleton";
import Button from "@/components/ButtonComponent";
import { getProducts } from "@/services/ProductService";
import { useCustomPagination } from "@/hooks/useCustomPagination";
import CustomFilterComponent from "@/components/filters-component/CustomFilterComponent";

import ArrowUp from "@/images/category-section/arrow-up.svg";

const CategoryAsideFilters = ({
  handleUpdateProducts,
  handleChangeTotalProducts,
  limit,
  filtersData,
  sort,
  reverse,
  setSort,
  setReverse,
  setIsStart,
  isFilter,
}: {
  handleUpdateProducts: (newProducts: CardProps[]) => void;
  handleChangeTotalProducts: (num: number) => void;
  limit: number;
  filtersData: any;
  sort: string;
  reverse: boolean;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setReverse: React.Dispatch<React.SetStateAction<boolean>>;
  setIsStart: React.Dispatch<React.SetStateAction<boolean>>;
  isFilter: boolean;
}) => {
  const { setPageInfo, setTotalPages, pageInfo, currentPage, setCurrentPage } =
    useCustomPagination();
  const [searchText, setSearchText] = useState<string>("");
  const [priceRangeFromObject, setPriceRangeFromObject] = useState<
    [number, number]
  >([0, 10]);
  const [productType, setProductType] = useState<string>("");
  const [checkboxes, setCheckboxes] = useState<Record<string, string[]>>({});
  const [previousPage, setPreviousPage] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isFilter) {
      const getData = async () => {
        await getProductData(false);
      };
      getData();
    }
  }, [currentPage]);

  useEffect(() => {
    if (isFilter) {
      const getData = async () => {
        await getProductData(true);
      };
      getData();
    }
  }, [sort, reverse]);

  useEffect(() => {
    if (isFilter) {
      setPriceRangeFromObject(filtersData.priceRange.value);
    }
  }, [filtersData]);

  useEffect(() => {
    if (isFilter && priceRangeFromObject === filtersData.priceRange.value) {
      const getData = async () => {
        await getProductData(false);
      };
      getData();
    }
  }, [priceRangeFromObject]);

  const handleCheckboxChange = (title: string, value: string) => {
    setCheckboxes((prev) => {
      const currentValues = prev[title] || [];
      return {
        ...prev,
        [title]: currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  };

  const handleSubmitFilters = async () => {
    await getProductData(true);
  };

  const handleResetFilters = async () => {
    setSearchText("");
    setProductType("");
    setSort("RELEVANCE");
    setReverse(true);
    setPriceRangeFromObject(filtersData.priceRange.value);
    setCheckboxes({});
    await getProductData(true);
  };

  const getProductData = async (isForm: boolean) => {
    const selectedFilters = {
      productType: productType,
      minPrice: priceRangeFromObject[0],
      maxPrice: priceRangeFromObject[1],
      searchText: searchText,
    };

    const selectedOptions =
      Object.keys(checkboxes).length !== 0
        ? Object.entries(checkboxes)
            .flatMap(([key, values]) =>
              values.map(
                (value) => `${key.toLowerCase()}-${value.toLowerCase()}`
              )
            )
            .join(" ")
        : "";

    let data;
    if (currentPage == 1 || isForm) {
      data = await getProducts(
        selectedFilters,
        selectedOptions,
        limit,
        "",
        sort,
        reverse,
        true
      );
      setCurrentPage(1);
    } else if (previousPage < currentPage) {
      data = await getProducts(
        selectedFilters,
        selectedOptions,
        limit,
        pageInfo.endCursor,
        sort,
        reverse,
        true
      );
    } else {
      data = await getProducts(
        selectedFilters,
        selectedOptions,
        limit,
        pageInfo.startCursor,
        sort,
        reverse,
        false
      );
    }
    setPreviousPage(currentPage);
    setPageInfo(data.pageInfo);
    setTotalPages(data.count === 0 ? 1 : Math.ceil(data.count / limit));

    handleUpdateProducts([...data.products]);
    handleChangeTotalProducts(data.count);
    setIsStart(false);
  };

  const handleOpenFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen((isOpen) => !isOpen);
  };

  const newHandleSearchText = (query: string) => {
    setSearchText(query);
  };

  const changeProductType = (type: string) => {
    if (type !== productType) {
      setProductType(type);
    } else {
      setProductType("");
    }
  };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRangeFromObject(value);
  };

  const handleSubmitFormForPc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitFilters();
  };

  const handleSubmitFormForMobile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitFilters();
    setIsOpen(false);
  };

  return (
    <>
      {isLoading ? (
        <FiltersSkeleton />
      ) : (
        <>
          {isFilter && (
            <aside className="hidden w-[480px] xl:block xl:bg-pearl pt-[43px] pb-[93px] pl-[30px] pr-[50px]">
              <form
                onSubmit={handleSubmitFormForPc}
                className="pb-5 flex flex-col gap-5 font-poppins "
              >
                {filtersData.search.title && (
                  <CustomFilterComponent
                    title={filtersData.search.title}
                    type="search"
                    searchQuery={searchText}
                    onSearchChange={newHandleSearchText}
                    clearSearchQuery={() => setSearchText("")}
                    onApplyClick={handleSubmitFilters}
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
                    limit={filtersData.priceRange.value}
                    rangeValue={priceRangeFromObject}
                    step={1}
                    onRangeChange={handlePriceChange}
                    onApplyClick={handleSubmitFilters}
                  />
                )}
                {filtersData.checkboxes.length > 0 &&
                  filtersData.checkboxes.map((item: any) => (
                    <CustomFilterComponent
                      key={item.title}
                      title={item.title}
                      type="checkboxes"
                      items={item.value}
                      selectedItems={checkboxes[item.title]}
                      onItemChange={(value: string) =>
                        handleCheckboxChange(item.title, value)
                      }
                    />
                  ))}
                <div className="flex flex-row gap-[10px]">
                  <Button
                    text="Скидання"
                    className="w-[30%] text-[16px] font-medium"
                    type="submit"
                    background="white"
                    bordered
                    onClick={handleResetFilters}
                  />
                  <Button
                    text="Підтверження"
                    className="w-[70%] text-[16px] font-medium"
                    type="submit"
                  />
                </div>
              </form>
            </aside>
          )}
        </>
      )}

      {isFilter && (
        <div className="z-20 top-0 xl:hidden bg-pearl">
          <div className="lg:px-[125px] md:px-[75px] px-5 absolute w-full bg-pearl z-20">
            <form onSubmit={handleSubmitFormForMobile}>
              <motion.div
                className={`bg-pearl pb-5 flex flex-col gap-5 font-poppins h-fit ${
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
                transition={{ duration: 0.5 }}
              >
                {filtersData.search.title && (
                  <CustomFilterComponent
                    title={filtersData.search.title}
                    type="search"
                    searchQuery={searchText}
                    onSearchChange={newHandleSearchText}
                    clearSearchQuery={() => setSearchText("")}
                    onApplyClick={handleSubmitFilters}
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
                    limit={filtersData.priceRange.value}
                    rangeValue={priceRangeFromObject}
                    step={1}
                    onRangeChange={handlePriceChange}
                    onApplyClick={handleSubmitFilters}
                  />
                )}

                {filtersData.checkboxes.length > 0 &&
                  filtersData.checkboxes.map((item: any) => (
                    <CustomFilterComponent
                      key={item.title}
                      title={item.title}
                      type="checkboxes"
                      items={item.value}
                      selectedItems={checkboxes[item.title]}
                      onItemChange={(value: string) =>
                        handleCheckboxChange(item.title, value)
                      }
                    />
                  ))}
              </motion.div>

              <div className="flex justify-between items-center py-[22px] gap-[20px]">
                {isOpen ? (
                  <div className="flex flex-row gap-[10px]">
                    <Button
                      text="Скидання"
                      className="w-[30%] text-[12px] md:text-[14px] font-medium"
                      type="submit"
                      background="white"
                      bordered
                      onClick={handleResetFilters}
                    />
                    <Button
                      text="Підтверження"
                      className=" md:px-[50px] w-[60%] md:w-[70%] text-[12px] md:text-[14px] font-default "
                      type="submit"
                      onClick={handleSubmitFilters}
                    />
                  </div>
                ) : (
                  <h2 className="font-frontrunner text-[28px] leading-[25px]">
                    Фільтри
                  </h2>
                )}

                <button
                  className="w-[55px] h-[52px] rounded-md border border-darkBurgundy flex items-center justify-center hover:bg-white duration-300"
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
      )}
    </>
  );
};

export default CategoryAsideFilters;
