"use client";

import React, { useState, createContext, useEffect } from "react";

import TitleComponents from "@/components/TitleComponents";
import CategoryAsideFilters from "./CategoryAsideFilters";
import CategorySection from "./CategorySection";
import { CardProps } from "@/config/types";

import { PaginationProvider } from "@/hooks/useCustomPagination";
import { getFilters } from "@/services/ProductService";

export const ProductsContext = createContext<CardProps[]>([]);
const LIMIT = 12; //24

const filter = {
  search: {
    title: "Search",
  },
  buttons: {
    title: "Types",
    value: ["Wathes", "Other"],
  },
  priceRange: {
    title: "Price",
    value: [0, 10],
  },
  checkboxes: [
    {
      title: "example",
      value: ["1", "2", "3"],
    },
    {
      title: "example2",
      value: ["1", "2", "3"],
    },
  ],
};

const CategoryMain = () => {
  const [filters, setFilters] = useState(filter);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [products, setProducts] = useState<CardProps[]>([]);
  const [isStart, setIsStart] = useState<boolean>(true);

  const [sort, setSort] = useState<string>("RELEVANCE");
  const [reverse, setReverse] = useState<boolean>(true);

  useEffect(() => {
    const fetchFilters = async () => {
      const data = await getFilters();
      setFilters(data);
    };

    fetchFilters();
  }, []);

  const handleChangeTotalProducts = (num: number) => {
    setTotalProducts(num);
  };

  const handleUpdateProducts = (newProducts: CardProps[]) => {
    setProducts(newProducts);
  };

  return (
    <>
      <PaginationProvider>
        {/* <FiltersProvider> */}
        <ProductsContext.Provider value={products}>
          <TitleComponents
            text="Products"
            additionalText={`${totalProducts} Total Products`}
          />
          <div className="xl:flex xl:px-[75px]">
            <CategoryAsideFilters
              handleUpdateProducts={handleUpdateProducts}
              handleChangeTotalProducts={handleChangeTotalProducts}
              limit={LIMIT}
              filtersData={filters}
              sort={sort}
				  setSort={setSort}
              reverse={reverse}
              setReverse={setReverse}
              setIsStart={setIsStart}
            />
            <CategorySection
              isStart={isStart}
              totalProducts={totalProducts}
              limit={LIMIT}
              setSort={setSort}
              setReverse={setReverse}
				  reverse={reverse}
				  sort={sort}
            />
          </div>
        </ProductsContext.Provider>
        {/* </FiltersProvider> */}
      </PaginationProvider>
    </>
  );
};

export default CategoryMain;
