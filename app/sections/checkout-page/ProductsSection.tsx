"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { useCart } from "@/hooks/useCart";
import { CreateOrder } from "@/services/OrderService";
import CartProduct from "@/components/cart-component/CartProduct";

import Shipping from "@/images/checkout-section/shipping.svg";
import { CreatePayment } from "@/services/PaymentService";

const ProductsSection = ({
  basicInfo,
  shippingValue,
  addressInfo,
  paymentInfo,
}: {
  basicInfo: any;
  shippingValue: any;
  addressInfo: any;
  paymentInfo: any;
}) => {
  const { products, totalAmount } = useCart();

  const handleSubmit = async () => {
    if (paymentInfo === "" || products.length == 0) {
      console.log("Error");
      throw new Error("oops!");
    }
    if (paymentInfo === "Post") {
      const lineItems = products.map((product) => ({
        productId: product.id,
        title: product.title,
        priceSet: {
          shopMoney: {
            amount: product.price,
            currencyCode: "UAH",
          },
        },
        quantity: product.quantity,
      }));

      const data = {
        currency: "UAH",
        customerId: "",
        email: basicInfo.email,
        phone: basicInfo.phone,
        shippingAddress: {
          firstName: basicInfo.firstName,
          lastName: basicInfo.lastName,
          address1:
            addressInfo.street ||
            addressInfo.postomat ||
            addressInfo.department,
          address2: addressInfo.house + " , " + addressInfo.flat,
          city: basicInfo.city,
          zip: addressInfo.zipCode,
          countryCode: "UA",
        },
        shippingLines: shippingValue.shippingLines
          ? shippingValue.shippingLines
          : [],
        lineItems: lineItems,
      };

      const response = await CreateOrder(data, {
        sendReceipt: "true",
        sendFulfillmentReceipt: "true",
        inventoryBehaviour: "BYPASS",
      });

    } else if (paymentInfo === "LiqPay") {
		// const result = await CreatePayment(products,totalAmount);
		// if (result.paymentUrl) {
		// 	window.location.href = result.paymentUrl;
		// 	console.log("yes", result)
		//  } else {
		// 	console.error("Error creating payment session", result);
		//  }
    }
  };

  return (
    <>
      <div className="flex flex-col mini:mx-auto lg:mx-0 mini:w-[420px] md:w-[500px] lg:w-[350px] xl:w-[450px] sticky top-[15px] ">
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
            {products.length == 0 && (
              <div className="flex my-[10px]">
                <Image src={Shipping} alt={Shipping} />
                <div className="flex flex-col justify-center ml-[20px]">
                  <p className="text-[13px] md:text-[15px] text-silver">
                    У вас немає товарів у кошику
                  </p>
                </div>
              </div>
            )}
          </ul>
        </motion.div>

        <div
          className="flex flex-col bg-darkBurgundy py-[25px] rounded-[10px] text-white text-center items-center gap-[8px]"
          onClick={handleSubmit}
          id="payment-button-container"
        >
          <h2 className="text-[20px] md:text-[25px]">{totalAmount}₴</h2>
          <p className="text-[16px] md:text-[15px]">Сума</p>
        </div>
      </div>
    </>
  );
};

export default ProductsSection;
