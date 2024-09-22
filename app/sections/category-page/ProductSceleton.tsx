import React, { FC } from 'react';

const ProductSceleton: FC = () => {
  return (
    <div className="flex flex-col gap-2 items-center w-[255px] h-fit bg-pearl p-2">
      <div className="animate-pulse w-full h-[300px] rounded-md bg-gray-300 mb-2"></div>
      <div className="animate-pulse h-3 w-1/2 bg-gray-300"></div>
      <div className="animate-pulse h-5 w-1/3 bg-gray-300"></div>
    </div>
  );
};

export default ProductSceleton;
