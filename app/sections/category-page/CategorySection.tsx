"use client";
import { motion } from "framer-motion";
import { usePagination } from "@mantine/hooks";
import React, { useContext, useEffect, useState } from "react";

import { CardProps } from "@/config/types";
import ProductSceleton from "./ProductSceleton";
import { ProductsContext } from "./CategoryMain";
import CardComponent from "@/components/CardComponent";
import CustomSelect from "@/components/SelectComponent";
import { useCustomPagination } from "@/hooks/useCustomPagination";

const CategorySection = ({
  totalProducts,
  limit,
  sort,
  reverse,
  setSort,
  setReverse,
  isStart,
}: {
  totalProducts: number;
  limit: number;
  sort: string;
  reverse: boolean;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setReverse: React.Dispatch<React.SetStateAction<boolean>>;
  isStart: boolean;
}) => {
  const { goToPage, currentPage } = useCustomPagination();
  const allProducts = useContext(ProductsContext);
  const [isLoading, setIsLoading] = useState(true);

  const generatePaginationRange = () => {
    const range = [];
    const totalPages = Math.ceil(totalProducts / limit);
    const currentPage = pagination.active;
    if (currentPage !== 1) {
      range.push(1);
    }
    if (currentPage > 3) {
      range.push("...");
    }
    if (currentPage > 2) {
      range.push(currentPage - 1);
    }
    range.push(currentPage);
    if (currentPage < totalPages - 1) {
      range.push(currentPage + 1);
    }
    if (currentPage === totalPages - 1) {
      range.push(totalPages);
    }
    if (currentPage < totalPages - 2) {
      range.push("...");
    }
    return range;
  };

  const pagination = usePagination({
    total: Math.ceil(totalProducts / limit),
    initialPage: 1,
    siblings: 1,
    boundaries: 1,
  });

  useEffect(() => {
    console.log("k", allProducts)
    if (allProducts.length != 0) {
      console.log("p")
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } else {
      console.log("j")
      setTimeout(() => {
        setIsLoading(false);
      }, 21000);
    }
  }, [allProducts]);

  useEffect(() => {
    if (currentPage === 1) {
      pagination.setPage(0);
      goToPage(1);
    }
  }, [currentPage]);

  const handleChangePage = (range: number) => {
    pagination.setPage(range);
    goToPage(range);
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  const handleChangeSorting = (value: string) => {
    let newValue = value == "HPRICE" || value == "LPRICE" ? "PRICE" : value;

    if (value === "HPRICE") setReverse(true);
    if (value === "LPRICE") setReverse(false);
    if (value === null || value === "") {
      setReverse(true);
      newValue = "RELEVANCE";
    }

    setSort(newValue);
  };

  return (
    <section className="pt-[150px] xl:pt-[43px] pb-[70px] sm:px-[60px] lg:pr-0 lg:pl-[30px] flex-1">
      <div className="flex flex-row items-center justify-center flex-wrap gap-5 xl:justify-end">
        <CustomSelect
          left
          placeholder="Sort By"
          options={[
            { value: "CREATED_AT", label: "New Products" },
            { value: "HPRICE", label: "Highest Price" },
            { value: "LPRICE", label: "Lowest Price" },
            { value: "BEST_SELLING", label: "Best Sellers" },
          ]}
          onSelect={handleChangeSorting}
          sort={sort}
        />
      </div>

      {isLoading ? (
        <div className="mt-[32px] grid grid-cols-1 justify-center place-items-center mx-[30px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
          {Array.from({ length: limit }, (_, index) => (
            <ProductSceleton key={index} />
          ))}
        </div>
      ) : allProducts.length === 0 && !isStart ? (
        <motion.div
          className="text-center text-gray-500 text-lg py-[40px] lg:py-[60px] lg:text-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          Товару з даними характеристиками не знайдено
        </motion.div>
      ) : (
        <>
          <div className="mt-[32px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allProducts.map((card: CardProps) => (
              <CardComponent {...card} key={card.id} />
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-10 items-center">
            <button
              disabled={pagination.active === 1}
              onClick={() => handleChangePage(pagination.active - 1)}
              className="h-7 w-3 text-darkBurgundy rounded-sm disabled:opacity-0 hover:font-extrabold"
            >
              &lt;
            </button>
            {generatePaginationRange().map((range, index) =>
              range === "..." ? (
                <button
                  key={index}
                  className="h-[28px] rounded-sm text-center text-[10px] bg-pearl text-silver px-2"
                >
                  ...
                </button>
              ) : (
                <button
                  key={index}
                  className={`h-7 w-7 rounded-sm ${
                    pagination.active === range
                      ? "bg-darkBurgundy text-white"
                      : "bg-pearl text-silver hover:font-bold"
                  }`}
                  onClick={() => handleChangePage(range as number)}
                >
                  {range}
                </button>
              )
            )}
            <button
              disabled={pagination.active === Math.ceil(totalProducts / limit)}
              onClick={() => handleChangePage(pagination.active + 1)}
              className="h-7 w-3 text-darkBurgundy rounded-sm disabled:opacity-0 hover:font-extrabold "
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default CategorySection;
