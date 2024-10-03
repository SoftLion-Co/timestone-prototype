import React from 'react';

import CategorySection from '@/app/sections/category-page/CategorySection';
import CategoryAsideFilters from '@/app/sections/category-page/CategoryAsideFilters';
import TitleComponents from '@/components/TitleComponents';

export default function CategoryPage() {
  return (
    <>
      <TitleComponents text="Products" additionalText="365 Total products" />
      <div className="xl:flex xl:container">
        <CategoryAsideFilters />
        <CategorySection />
      </div>
    </>
  );
}
