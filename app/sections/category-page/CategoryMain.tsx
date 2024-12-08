"use client";

import React, { useState, createContext, useEffect } from "react";

import TitleComponents from "@/components/TitleComponents";
import CategoryAsideFilters from "./CategoryAsideFilters";
import CategorySection from "./CategorySection";
import { CardProps } from "@/config/types";
import { FiltersProvider } from "@/hooks/useFilters";
import { PaginationProvider } from "@/hooks/useCustomPagination";
import FilterComponent from "@/components/filters-component/FilterComponent";

export const ProductsContext = createContext<CardProps[]>([]);
const LIMIT = 2;

const CategoryMain = () => {
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
      value: [0, 150],
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

  const [filters, setFilters] = useState(filter);

  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [products, setProducts] = useState<CardProps[]>([]);

  const handleChangeTotalProducts = (num: number) => {
    setTotalProducts(num);
  };

  const handleUpdateProducts = (newProducts: CardProps[]) => {
    setProducts(newProducts);
  };

  return (
    <>
      <PaginationProvider>
        <FiltersProvider>
          <ProductsContext.Provider value={products}>
            <TitleComponents
              text="Products"
              additionalText={`${totalProducts} Total Products`}
            />
            <div className="xl:flex md:px-[75px]">
              <CategoryAsideFilters
                handleUpdateProducts={handleUpdateProducts}
                handleChangeTotalProducts={handleChangeTotalProducts}
                limit={LIMIT}
                filtersData={filters}
              />

              <CategorySection totalProducts={totalProducts} limit={LIMIT} />
            </div>
          </ProductsContext.Provider>
        </FiltersProvider>
      </PaginationProvider>
    </>
  );
};

export default CategoryMain;
