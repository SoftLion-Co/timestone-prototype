'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePagination } from '@mantine/hooks';

import { CARD_INFORMATION } from '@/config/constants';
import CardComponent from '@/components/CardComponent';
import ArrowDown from '@/images/test-cotegory-page/arrow-down-filter.svg';

import { useFilters } from '@/hooks/useFilters';

const CategorySection = () => {
  const { filters, dispatch } = useFilters();

  const [itemToShow, setItemToShow] = useState(9);
  const [products, setProducts] = useState(CARD_INFORMATION);

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

  const handleChangeCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_COUNTRY', payload: e.target.value });
  };

  const handleChangeSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_SORTING', payload: e.target.value });
  };

  return (
    <section className="pt-[43px] px-[60px] flex-1">
      <div className="flex flex-col justify-center items-center gap-5 lg:justify-end lg:flex-row">
        <div className="relative">
          <select
            className="bg-pearl text-silver text-[14px] pr-[30px] pl-[56px] py-[22px] appearance-none"
            value={filters.country}
            onChange={handleChangeCountry}>
            <option value="">Countries</option>
            <option value="Ukraine">Ukraine</option>
            <option value="USA">USA</option>
            <option value="Germany">Germany</option>
          </select>
          <div className="absolute top-1/2 left-[26px] -translate-y-1/2">
            <Image src={ArrowDown} alt="arrow down" />
          </div>
        </div>

        <div className="relative">
          <select
            className="bg-pearl text-silver text-[14px] pr-[30px] pl-[56px] py-[22px] appearance-none"
            value={filters.sortedBy}
            onChange={handleChangeSorting}>
            <option value="">Sort By</option>
            <option value="Top">Top</option>
            <option value="HighestPrice">Higest Price</option>
            <option value="LowestPrice">Lowest Price</option>
          </select>
          <div className="absolute top-1/2 left-[26px] -translate-y-1/2">
            <Image src={ArrowDown} alt="arrow down" />
          </div>
        </div>
      </div>

      <div className="mt-[32px] flex flex-wrap gap-[30px] justify-center lg:justify-between">
        {visibleProducts.map((cardProps) => (
          <CardComponent {...cardProps} key={cardProps.product_id} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 ml-auto my-[70px]">
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
                  ? 'bg-amethyst text-white'
                  : 'bg-pearl text-silver hover:font-bold'
              }`}
              key={range}
              onClick={() => pagination.setPage(+range)}>
              {range}
            </button>
          )
        )}
      </div>
    </section>
  );
};

export default CategorySection;
