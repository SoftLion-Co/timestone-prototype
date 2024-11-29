// 'use client';
// import React, { FC } from 'react';
// import Image from 'next/image';
// import Shipping from '@/images/checkout-section/shipping.svg';
// import Tax from '@/images/checkout-section/tax.svg';
// import { Product } from '@/config/types';

// interface componentProps {
//   className?: string;
//   showShipping?: boolean;
//   showTax?: boolean;
//   src?: string;
//   alt?: string;
//   productData?: Product;
//   price?: number;
// }

// const CartComponent: FC<componentProps> = ({
//   className,
//   showShipping,
//   showTax,
//   src,
//   alt,
//   productData,
//   price,
// }) => {
//   return (
//     <>
//       {showShipping ? (
//         <div className="flex my-[15px]">
//           <Image src={Shipping} alt={'Shipping'} />
//           <div className="flex flex-col justify-center gap-[10px] ml-[20px]">
//             <p className="text-[10px] md:text-[15px] text-silver">
//               Shipping & handling
//             </p>
//             <p className="text-[20px] md:text-[25px]">${price}</p>
//           </div>
//         </div>
//       ) : showTax ? (
//         <div className="flex my-[15px]">
//           <Image src={Tax} alt={'Tax'} />
//           <div className="flex flex-col justify-center gap-[10px] ml-[20px]">
//             <p className="text-[10px] md:text-[15px] text-silver">Tax</p>
//             <p className="text-[20px] md:text-[25px]">$0</p>
//           </div>
//         </div>
//       ) : (
//         <div className="flex my-[15px]">
//           <img
//             src={productData?.images ? productData.images[0] : ''}
//             alt="Watch"
//             className="w-[88px] h-[103px]"
//           />
//           <div className="flex flex-col justify-center gap-[10px] ml-[20px]">
//             <p className="text-[10px] md:text-[15px] text-silver">
//               {productData?.title}
//             </p>
//             <p className="text-[20px] md:text-[25px]">${productData?.price}</p>
//             <p className="text-[10px] md:text-[15px] text-silver">
//               Quantity: {productData?.quantity}
//             </p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CartComponent;
