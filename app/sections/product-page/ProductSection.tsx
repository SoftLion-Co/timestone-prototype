"use client";
import React, { useEffect, useState } from "react";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import Button from "@/components/ButtonComponent";
import Image from "next/image";

import Image1 from "@/images/product-page/image-1.svg";
import Image2 from "@/images/product-page/image-2.svg";
import Image3 from "@/images/product-page/image-3.svg";
import Image4 from "@/images/product-page/image-4.svg";
import Image5 from "@/images/product-page/image-5.svg";
import Image6 from "@/images/product-page/image-6.svg";
import LeftArrow from "@/images/product-page/arrow-left.svg";
import RightArrow from "@/images/product-page/arrow-right.svg";

const ProductImages = [
  { title: "Image1", image: Image1 },
  { title: "Image2", image: Image2 },
  { title: "Image3", image: Image3 },
  { title: "Image4", image: Image4 },
  { title: "Image5", image: Image5 },
  { title: "Image6", image: Image6 },
];

const ProductValue = [
  { label: "Case:", value: "316L Stainless-steel" },
  { label: "Coating:", value: "Color anodized anti-scratch" },
  { label: "Glass:", value: "Sapphire Crystal" },
  { label: "Straps:", value: "22mm Stainless-steel bracelet" },
  { label: "Case Size:", value: "42mm" },
  { label: "Case Color: ", value: "chamfered brush with mirror polish" },
  { label: "Dial Color:", value: "Black Metallic" },
  { label: "Water Resistance:", value: "5 ATM/50 meters" },
  { label: "Straps:", value: "Quick release" },
  { label: "Movement:", value: "Movement: Swiss Parts RONDA 762E" },
  { label: "Instantaneous rate:", value: "-10/ +20 sec/month" },
  { label: "Standard Battery life:", value: "10 years" },
];

const slides = ProductImages.map((item, index) => (
  <Carousel.Slide key={index}>
    <Image src={item.image} alt={item.title} />
  </Carousel.Slide>
));

const ProductSection = () => {
  return (
    <section>
      <div className="container flex flex-col md:flex-row gap-[100px] justify-items-center">
        <div className="hidden xl:block xl:flex xl:flex-wrap xl:flex-row xl:gap-[30px]">
          {ProductImages.map((item, index) => (
            <Image key={index} src={item.image} alt={item.title} />
          ))}
        </div>

        <div className="xl:hidden w-[350px] mx-auto">
          <Carousel
            slideSize={100}
            height={200}
            slideGap="xl"
            loop
            dragFree
            previousControlIcon={
              <Image
                src={LeftArrow}
                alt="LeftArrow"
                width={80}
                className="my-[30px] ml-[50px] md:ml-[20px]"
              />
            }
            nextControlIcon={
              <Image
                src={RightArrow}
                alt="RightArrow"
                width={80}
                className="my-[30px] mr-[50px] md:mr-[20px]"
              />
            }
          >
            {slides}
          </Carousel>
        </div>

        <div className="flex flex-col items-center text-center">
          <h3 className="text-[32px]">Molumenzeit S 7</h3>
          <p className="text-[12px] my-[20px] w-[350px] text-silver">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim
            facilisi elementum commodo ipsum. Aenean aenean adipiscing lect
          </p>

          <hr className="hidden xl:block w-[350px]" />

          <div className="my-[15px] w-[350px] order-1 xl:order-none">
            {ProductValue.map((item, index) => (
              <p
                key={index}
                className="text-[10px] text-silver flex flex-row justify-between"
              >
                <span>{item.label}</span>
                <span>{item.value}</span>
              </p>
            ))}
          </div>

          <hr className="hidden xl:block w-[350px]" />

          <div className="flex my-[25px] space-x-[40px] items-center">
            <Button text="Place an order" className="w-[210px]" />
            <span className="text-[20px] px-[10px]">$15,588</span>
          </div>

          <Button
            className="w-[350px]"
            text="Try on in AR Online"
            icon="cube"
            bordered
          />

          <Button text="Design Your Watch" className="my-[30px] w-[350px]" />
        </div>
      </div>
    </section>
  );
};
export default ProductSection;

// "use client";
// import React, { useEffect, useState } from "react";
// import { Carousel } from "@mantine/carousel";
// import "@mantine/carousel/styles.css";
// import Button from "@/components/ButtonComponent";
// import Image from "next/image";

// import Image1 from "@/images/product-page/image-1.svg";
// import Image2 from "@/images/product-page/image-2.svg";
// import Image3 from "@/images/product-page/image-3.svg";
// import Image4 from "@/images/product-page/image-4.svg";
// import Image5 from "@/images/product-page/image-5.svg";
// import Image6 from "@/images/product-page/image-6.svg";
// import LeftArrow from "@/images/product-page/arrow-left.svg";
// import RightArrow from "@/images/product-page/arrow-right.svg";

// const ProductImages = [
//   { title: "Image1", image: Image1 },
//   { title: "Image2", image: Image2 },
//   { title: "Image3", image: Image3 },
//   { title: "Image4", image: Image4 },
//   { title: "Image5", image: Image5 },
//   { title: "Image6", image: Image6 },
// ];

// const ProductValue = [
//   { label: "Case:", value: "316L Stainless-steel" },
//   { label: "Coating:", value: "Color anodized anti-scratch" },
//   { label: "Glass:", value: "Sapphire Crystal" },
//   { label: "Straps:", value: "22mm Stainless-steel bracelet" },
//   { label: "Case Size:", value: "42mm" },
//   { label: "Case Color: ", value: "chamfered brush with mirror polish" },
//   { label: "Dial Color:", value: "Black Metallic" },
//   { label: "Water Resistance:", value: "5 ATM/50 meters" },
//   { label: "Straps:", value: "Quick release" },
//   { label: "Movement:", value: "Movement: Swiss Parts RONDA 762E" },
//   { label: "Instantaneous rate:", value: "-10/ +20 sec/month" },
//   { label: "Standard Battery life:", value: "10 years" },
// ];

// const slides = ProductImages.map((item, index) => (
//   <Carousel.Slide key={index}>
//     <Image src={item.image} alt={item.title} />
//   </Carousel.Slide>
// ));

// const ProductSection = () => {
//   // const [slideSize, setSlideSize] = useState("50%");

//   // const changeSize = () => {
//   //   if (window.innerWidth >= 1024) {
//   //     setSlideSize("50%");
//   //   } else if (window.innerWidth >= 768) {
//   //     setSlideSize("60%");
//   //   } else if (window.innerWidth >= 640) {
//   //     setSlideSize("65%");
//   //   } else if (window.innerWidth >= 520) {
//   //     setSlideSize("75%");
//   //   } else if (window.innerWidth >= 440) {
//   //     setSlideSize("90%");
//   //   } else {
//   //     setSlideSize("100%");
//   //   }
//   // };

//   // useEffect(() => {

//   //   changeSize();

//   //   window.addEventListener("resize", changeSize);
//   // }, []);

//   return (
//     <section>
//       <div className="container flex flex-col xl:flex-row gap-[30px]">
//         <div className="hidden xl:block xl:flex xl:flex-wrap xl:flex-row xl:gap-[30px] xl:w-[730px]">

//           {ProductImages.map((item, index) => (
//             <Image key={index} src={item.image} alt={item.title} />
//           ))}
//         </div>

//         <div className="xl:hidden">
//           <Carousel
//             slideSize={100}
//             height={200}
//             slideGap="xl"
//             loop
//             dragFree
//             previousControlIcon={
//               <Image
//                 src={LeftArrow}
//                 alt="LeftArrow"
//                 width={80}
//                 className="my-[30px] ml-[40px] lg:ml-[300px] md:ml-[180px] sm:ml-[130px]"
//               />
//             }
//             nextControlIcon={
//               <Image
//                 src={RightArrow}
//                 alt="RightArrow"
//                 width={80}
//                 className="my-[30px] mr-[40px] lg:mr-[300px] md:mr-[180px] sm:mr-[130px]"
//               />
//             }
//           >
//             {slides}
//           </Carousel>
//         </div>

//         <div className="xl:w-[465px] flex flex-col items-center xl:items-start text-center xl:text-left">
//           <h3 className="text-[32px] pt-[55px] xl:pt-0">Molumenzeit S 7</h3>
//           <p className="text-[12px] py-[20px] xl:w-[75%] text-silver">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim
//             facilisi elementum commodo ipsum. Aenean aenean adipiscing lect
//           </p>

//           <hr className="hidden xl:block w-[350px]" />

//           <div className="py-[15px] md:w-[350px] order-1 xl:order-none">
//             {ProductValue.map((item, index) => (
//               <p
//                 key={index}
//                 className="text-[10px] text-silver flex flex-row justify-between"
//               >
//                 <span>{item.label}</span>
//                 <span>{item.value}</span>
//               </p>
//             ))}
//           </div>

//           <hr className="hidden xl:block w-[350px]" />

//           <div className="flex py-[25px] space-x-[40px] items-center">
//             <Button text="Place an order" className="w-[210px]" />
//             <span className="text-[20px]">$15,588</span>
//           </div>

//           <Button
//             className="w-[350px]"
//             text="Try on in AR Online"
//             icon="cube"
//             bordered
//           />

//           <Button text="Design Your Watch" className="my-[30px] w-[350px]" />
//         </div>
//       </div>
//     </section>
//   );
// };
// export default ProductSection;
