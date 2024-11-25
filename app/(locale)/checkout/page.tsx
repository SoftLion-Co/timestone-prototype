"use client";
import ProductsSection from "@/app/sections/checkout-page/ProductsSection";
import TitleComponents from "@/components/TitleComponents";
import PaymentSection from "@/app/sections/checkout-page/PaymentSection";
import BasicInfoSection from "@/app/sections/checkout-page/BasicInfoSection";
import ShippingSection from "@/app/sections/checkout-page/ShippingSection";
import { useRef, useState } from "react";

export default function CheckoutPage() {
  const [isBasicInfoValid, setIsBasicInfoValid] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isShippingValid, setIsShippingValid] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const basicInfoRef = useRef<HTMLDivElement>(null);
  const shippingRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);

  const handleBasicInfoContinue = (isValid: boolean) => {
    if (isValid) {
      setIsBasicInfoValid(true);
      setIsShippingOpen(true);

      setTimeout(() => {
        shippingRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  };

  const handleShippingContinue = (isValid: boolean) => {
    if (isValid) {
      setIsShippingValid(true);
      setIsPaymentOpen(true);

      setTimeout(() => {
        paymentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  };
  return (
    <>
      <TitleComponents text="CHECKOUT" />
      <div className="container flex flex-col gap-[30px] py-[50px] lg:flex-row lg:flex-row-reverse lg:gap-[50px]">
        <div className="lg:flex-1">
          <ProductsSection />
        </div>
        <div className="flex flex-col gap-[30px] lg:flex-1">
          <div ref={basicInfoRef}>
            <BasicInfoSection onContinue={handleBasicInfoContinue} />
          </div>
          <div ref={shippingRef}>
            <ShippingSection
              isDisabled={!isBasicInfoValid}
              isOpen={isShippingOpen}
              onContinue={handleShippingContinue}
            />
          </div>
          <div ref={paymentRef}>
            <PaymentSection
              isDisabled={!isShippingValid}
              isOpen={isPaymentOpen}
            />
          </div>
        </div>
      </div>
    </>
  );
}
