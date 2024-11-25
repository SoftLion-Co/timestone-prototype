import ProductSection from "@/app/sections/product-page/ProductSection";

const Page = ({ params }: { params: any }) => {
  const productName = params.productName;

  return (
    <>
      <ProductSection productName={productName} />
    </>
  );
};

export default Page;
