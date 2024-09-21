import React from 'react';

import CategorySection from '@/app/sections/category-page/CategorySection';
import CategoryAsideFilters from '@/app/sections/category-page/CategoryAsideFilters';

export default function CategoryPage() {
  return (
    <>
      <div className="bg-amethyst">
        <div className="container py-5 md:pt-[40px] md:pb-[22px] lg:pt-[90px] lg:pb-[52px]">
          <h2 className="font-spaceage text-snow text-[28px] leading-[25px] mb-4 md:text-[32px] md:mb-[20px] lg:text-[42px] lg:mb-[25px]">
            Products
          </h2>
          <p className="text-pearl font-[10px] leading-3 md:text-[12px] lg:text-[14px]">
            356 Total Products
          </p>
        </div>
      </div>
      <div className="xl:flex xl:container">
        <CategoryAsideFilters />
        <CategorySection />
      </div>
    </>
  );
}
