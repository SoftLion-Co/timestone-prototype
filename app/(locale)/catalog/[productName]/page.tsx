import ProductSection from "@/app/sections/product-page/ProductSection";
// import type { Metadata } from "next";

// export async function generateMetadata({ params }: { params: { productName: string } }): Promise<Metadata> {
//   const productName = params.productName;

//   const products: Product[] = await getProducts();
  
//   const product = products.find((p) => p.title.toLowerCase() === productName.toLowerCase());

//   if (!product) {
//     return {
//       title: "Товар не знайдено",
//     };
//   }

//   return {
//     title: product.title,
//     description: product.description,
//     keywords: "",
//     openGraph: {
//       title: product.title,
//       description: product.description,
//       url: `https://timestone.com/catalog/${productName}`,
//       images: [
//         {
//           url: product.images[0],
//           width: 800,
//           height: 600,
//           alt: product.title,
//         },
//       ],
//     },
//   };
// }
const Page = ({ params }: { params: any }) => {

  const productName = params.productName;

  return (
    <>
      <ProductSection productName={productName} />
    </>
  );
};

export default Page;
