'use client';

import React, { useContext, useEffect, useState } from 'react';

import { usePagination } from '@mantine/hooks';

import { useFilters } from '@/hooks/useFilters';
import CardComponent from '@/components/CardComponent';
import CustomSelect from '@/components/test-select/SelectComponent';
import ProductSceleton from './ProductSceleton';
import { CardProps } from '@/config/types';
import { ProductsContext } from './CategoryMain';

const ITEM_TO_SHOW = 9;

const CategorySection = ({ totalProducts }: { totalProducts: number }) => {
  const allProducts1 = useContext(ProductsContext);

  const { dispatch } = useFilters();

  const [visibleProducts, setVisibleProducts] = useState<CardProps[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const pagination = usePagination({
    total: Math.ceil(totalProducts / ITEM_TO_SHOW),
    initialPage: 1,
    onChange(page) {
      const start = (page - 1) * ITEM_TO_SHOW;
      const end = start + ITEM_TO_SHOW;
      setVisibleProducts(allProducts1.slice(start, end));
    },
  });

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setVisibleProducts(allProducts1.slice(0, ITEM_TO_SHOW));
      pagination.setPage(1);
      setIsLoading(false);
    }, 700);
  }, [allProducts1]);

  const handleChangePage = (range: number) => {
    pagination.setPage(+range);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleChangeCountry = (value: string) => {
    let arr = [value];
    dispatch({ type: 'SET_COUNTRIES', payload: arr });
  };

  const handleChangeSorting = (value: string) => {
    dispatch({ type: 'SET_SORTING', payload: value });
  };

  return (
    <section className="pt-[43px] pb-[70px] sm:px-[60px] flex-1">
      <div className="flex flex-row items-center justify-center flex-wrap gap-5 xl:justify-end">
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
          {Array.from({ length: 6 }, (_, index) => (
            <ProductSceleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="mt-[32px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {visibleProducts.map((card: CardProps) => (
              <CardComponent {...card} key={card.id} />
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
