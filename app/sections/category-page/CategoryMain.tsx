'use client';

import React, { useState, createContext } from 'react';

import TitleComponents from '@/components/TitleComponents';
import CategoryAsideFilters from './CategoryAsideFilters';
import CategorySection from './CategorySection';
import { CardProps } from '@/config/types';
import { FiltersProvider } from '@/hooks/useFilters';
import FilterComponent from './test/FilterComponent';

export const ProductsContext = createContext<CardProps[]>([]);

const CategoryMain = () => {
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [products, setProducts] = useState<CardProps[]>([]);

  const handleChangeTotalProducts = (num: number) => {
    setTotalProducts(num);
  };

  const handleUpdateProducts = (newProducts: CardProps[]) => {
    setProducts(newProducts);
  };

  // TODO можна прибрати загальну кількість товарів на сторінці

  return (
    <>
      <FiltersProvider>
        <ProductsContext.Provider value={products}>
          <TitleComponents
            text="Products"
            additionalText={`${totalProducts} Total products`}
          />
          {/* <FilterComponent title="test" showSearch isRangeSlider showOkButton /> */}
          <div className="xl:flex lg:px-[150px] md:px-[75px]">
            <CategoryAsideFilters
              handleUpdateProducts={handleUpdateProducts}
              handleChangeTotalProducts={handleChangeTotalProducts}
            />

            <CategorySection totalProducts={totalProducts} />
          </div>
        </ProductsContext.Provider>
      </FiltersProvider>
    </>
  );
};

export default CategoryMain;
