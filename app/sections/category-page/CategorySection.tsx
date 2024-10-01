'use client';

import React, { useEffect, useState } from 'react';
import { usePagination } from '@mantine/hooks';

import { useFilters } from '@/hooks/useFilters';

import { CARD_INFORMATION } from '@/config/constants';

import CardComponent from '@/components/CardComponent';
import CustomSelect from '@/components/test-select/SelectComponent';
import ProductSceleton from './ProductSceleton';

const CategorySection = () => {
  const { filters, dispatch } = useFilters();

  const [itemToShow, setItemToShow] = useState(9);
  const [products, setProducts] = useState(CARD_INFORMATION);

  const [isLoading, setIsLoading] = useState(true);

  const [visibleProducts, setVisibleProducts] = useState(
    products.slice(0, itemToShow)
  );

  const pagination = usePagination({
    total: Math.ceil(products.length / itemToShow),
    initialPage: 1,
    onChange(page) {
      const start = (page - 1) * itemToShow;
      const end = start + itemToShow;
      setVisibleProducts(products.slice(start, end));
    },
  });

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleChangePage = (range: number) => {
    pagination.setPage(+range);
    window.scrollTo({ top: 80, behavior: 'smooth' });
  };

  const handleChangeCountry = (value: string) => {
    dispatch({ type: 'SET_COUNTRY', payload: value });
  };

  const handleChangeSorting = (value: string) => {
    dispatch({ type: 'SET_SORTING', payload: value });
  };

  return (
    <section className="pt-[43px] pb-[70px] sm:px-[60px] flex-1">
      <div className="flex flex-row items-center justify-center flex-wrap gap-5 xl:justify-end">
        <CustomSelect
          left
          placeholder="Countries"
          options={[
            { value: 'USA', label: 'USA' },
            { value: 'Ukraine', label: 'Ukraine' },
            { value: 'Germany', label: 'Germany' },
          ]}
          onSelect={handleChangeCountry}
        />

        <CustomSelect
          left
          placeholder="Sort By"
          options={[
            { value: 'Top', label: 'Top' },
            { value: 'HighestPrice', label: 'Highest Price' },
            { value: 'LowestPrice', label: 'Lowest Price' },
          ]}
          onSelect={handleChangeSorting}
        />
      </div>

      {isLoading ? (
        <div className="mt-[32px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {Array.from({ length: itemToShow }, (_, index) => (
            <ProductSceleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="mt-[32px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {visibleProducts.map((cardProps) => (
              <CardComponent {...cardProps} key={cardProps.product_id} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 ml-auto mt-[70px]">
            {pagination.range.map((range) =>
              range === 'dots' ? (
                <button
                  className="h-[28px] rounded-sm text-center text-[10px] bg-pearl text-silver px-2"
                  key={range}>
                  ...
                </button>
              ) : (
                <button
                  className={`h-[28px] w-[28px] rounded-sm text-center text-[10px] ${
                    pagination.active === range
                      ? 'bg-darkBurgundy text-white'
                      : 'bg-pearl text-silver hover:font-bold'
                  }`}
                  key={range}
                  onClick={() => handleChangePage(range)}>
                  {range}
                </button>
              )
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default CategorySection;
