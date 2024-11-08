'use client';

import React, { useState, createContext, useEffect } from 'react';

import TitleComponents from '@/components/TitleComponents';
import CategoryAsideFilters from './CategoryAsideFilters';
import CategorySection from './CategorySection';
import { CardProps } from '@/config/types';

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

  return (
    <>
      <ProductsContext.Provider value={products}>
        <TitleComponents
          text="Products"
          additionalText={`${totalProducts} Total products`}
        />
        <div className="xl:flex xl:container">
          <CategoryAsideFilters
            handleUpdateProducts={handleUpdateProducts}
            handleChangeTotalProducts={handleChangeTotalProducts}
          />
          <CategorySection totalProducts={totalProducts} />
        </div>
      </ProductsContext.Provider>
    </>
  );
};

export default CategoryMain;
