// import React, { FC, useState } from "react";
// import { RangeSlider, Button } from "@mantine/core";
// import { motion } from "framer-motion";

// type FilterComponentProps = {
//   title: string;
//   items: string[];
//   selectedItems: string[];
//   onItemChange: (item: string) => void;
//   showSearch: boolean;
//   searchQuery: string;
//   isRangeSlider?: boolean;
//   min?: number;
//   max?: number;
//   step?: number;
//   rangeValue?: [number, number];
//   onSearchChange: (query: string) => void;
//   clearSearchQuery: () => void;
//   onApplyClick: () => void;
//   onRangeChange?: (value: [number, number]) => void;
// };

// const FilterComponent: FC<FilterComponentProps> = ({
//   title,
//   items,
//   selectedItems,
//   onItemChange,
//   searchQuery,
//   onSearchChange,
//   isRangeSlider = false,
//   rangeValue = [0, 1000],
//   step = 1,
//   onRangeChange,
//   showSearch,
//   clearSearchQuery,

//   onApplyClick,
// }) => {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleOpen = () => {
//     setIsOpen((prev) => !prev);
//   };

//   return (
//     <div className="xl:pr-[12px]">
//       {/* Title */}
//       <div
//         className="flex justify-between items-center cursor-pointer mb-[16px]"
//         onClick={toggleOpen}
//       >
//         <h3 className="font-semibold">{title}</h3>

//         <motion.div
//           initial={{ rotate: 0 }}
//           animate={{ rotate: isOpen ? 45 : 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           <span className="text-xl">+</span>
//         </motion.div>
//       </div>

//       {/* Search input */}
//       <motion.div
//         initial={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
//         animate={
//           isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
//         }
//         transition={{ duration: 0.3 }}
//         style={{ overflow: "hidden" }}
//       >
//         <>
//           {showSearch && (
//             <div className="mb-[16px] relative">
//               <h4 className=" text-black font-semibold">Search</h4>
//               <input
//                 type="text"
//                 placeholder="Search"
//                 value={searchQuery}
//                 onChange={(e) => onSearchChange(e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 className="rounded-sm bg-white py-[14px] px-5 w-full focus:outline-none focus:border-[1px] focus:border-darkBurgundy"
//                 type="text"
//                 placeholder="Type Here"
//                 value={searchQuery}
//                 onChange={(e) => onSearchChange(e.target.value)}
//               />
//               {searchQuery && (
//                 <button
//                   onClick={clearSearchQuery}
//                   className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
//                 >
//                   ✕
//                 </button>
//               )}
//             </div>
//           )}

//           {isRangeSlider ? (
//             <div>
//               <RangeSlider
//                 value={rangeValue}
//                 onChange={onRangeChange}
//                 min={rangeValue[0]}
//                 max={rangeValue[1]}
//                 step={step}
//                 className={"mb-[30px] relative"}
//                 classNames={{
//                   root: "w-[90%] md:w-[80%] xl:w-[100%]",
//                   bar: "bg-[#17696A]",
//                   thumb: "border-[#17696A]",
//                 }}
//               />
//               <div className="flex gap-[12px] items-center justify-between">
//                 <input
//                   type="number"
//                   value={rangeValue[0]}
//                   onChange={(e) =>
//                     onRangeChange?.([+e.target.value, rangeValue[1]])
//                   }
//                   className="w-[48%] p-2 border rounded-[4px] border-[#D7DADD]"
//                   placeholder="Мінімальна ціна"
//                 />
//                 <span>—</span>
//                 <input
//                   type="number"
//                   value={rangeValue[1]}
//                   onChange={(e) =>
//                     onRangeChange?.([rangeValue[0], +e.target.value])
//                   }
//                   className="w-[48%] p-2 border rounded-[4px] border-[#D7DADD]"
//                   placeholder="Максимальна ціна"
//                 />

//                 <button
//                   onClick={onApplyClick}
//                   className=" text-black px-4 p-2 border rounded-[4px] border-[#D7DADD]"
//                 >
//                   OK
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col justify-start items-start overflow-y-scroll h-24">
//               {items.map((item, index) => (
//                 <div key={index}>
//                   <label className="flex gap-2 cursor-pointer w-full h-full px-3 py-2 hover:bg-gra-200 rounded-md  transition-all duration-200">
//                     <input
//                       type="checkbox"
//                       className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-darkBurgundy checked:border-darkBurgundy checked:after:content-['✔'] checked:after:flex checked:after:justify-center checked:after:items-center checked:after:w-full checked:after:h-full checked:after:text-white focus:outline-none focus:ring-0"
//                       checked={selectedItems.includes(item)}
//                       onChange={() => onItemChange(item)}
//                     />
//                     <span className="first-letter:uppercase">{item}</span>
//                   </label>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       </motion.div>

//       <Button
//         onClick={onApplyClick}
//         className="w-full text-[14px] font-default mt-4"
//       >
//         Apply Filters
//       </Button>
//     </div>
//   );
// };

// export default FilterComponent;
