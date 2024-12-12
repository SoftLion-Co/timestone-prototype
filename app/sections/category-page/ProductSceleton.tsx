import React, { FC } from "react";

const ProductSceleton: FC = () => {
  return (
    <div className="flex flex-col gap-2 items-center w-[255px] h-fit bg-pearl p-2 rounded-md">
      <div className="animate-pulse w-full h-[300px] rounded-md bg-gray-300 mb-2"></div>
      <div className="animate-pulse h-3 w-2/3 bg-gray-300 rounded-sm"></div>
      <div className="animate-pulse h-4 w-1/3 bg-gray-300 rounded-sm"></div>
    </div>
  );
};

export default ProductSceleton;
