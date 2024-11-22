"use client";
import React from "react";
import CartProduct from "@/components/cart-component/CartProduct";
import { useCart } from "@/hooks/useCart";
import { motion } from "framer-motion";

const ProductsSection = () => {
  const { products, totalAmount } = useCart();

  const handleSubmit = () => {};

  return (
    <section>
      <div className="flex flex-col mini:mx-auto lg:mx-0 mini:w-[420px] md:w-[500px] lg:w-[400px] xl:w-[450px]">
        <motion.div
          className="bordered-[10px] shadow-lg rounded-lg px-[20px]"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="flex flex-col gap-3 mb-[30px]">
            {products.map((product) => (
              <CartProduct key={product.id} card={product} />
            ))}
          </ul>
        </motion.div>

        <div
          className="flex flex-col bg-darkBurgundy py-[25px] rounded-[10px] text-white text-center items-center gap-[8px]"
          onClick={handleSubmit}
        >
          <h3 className="text-[20px] md:text-[25px]">${totalAmount}</h3>
          <p className="text-[10px] md:text-[15px]">Grand Total</p>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
