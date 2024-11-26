"use client";
import ProductsSection from "@/app/sections/checkout-page/ProductsSection";
import TitleComponents from "@/components/TitleComponents";
import PaymentSection from "@/app/sections/checkout-page/PaymentSection";
import BasicInfoSection from "@/app/sections/checkout-page/BasicInfoSection";
import ShippingSection from "@/app/sections/checkout-page/ShippingSection";
import Button from "@/components/ButtonComponent";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [isBasicInfoValid, setIsBasicInfoValid] = useState(false);
  const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(true);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isShippingValid, setIsShippingValid] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [basicInfo, setBasicInfo] = useState({});
  const [shippingValue, setShippingValue] = useState({});
  const router = useRouter();

  const handleBasicInfoContinue = (isValid: boolean) => {
    if (isValid) {
      setIsBasicInfoValid(true);
      setIsBasicInfoOpen(false);

      setTimeout(() => {
        setIsShippingOpen(true);
      }, 300);
    }
  };

  const handleShippingContinue = (isValid: boolean) => {
    if (isValid) {
      setIsShippingValid(true);
      setIsShippingOpen(false);

      setTimeout(() => {
        setIsPaymentOpen(true);
      }, 300);
    }
  };

  const handleBack = () => {
    router.push("/catalog");
  };

  return (
    <>
      <TitleComponents text="CHECKOUT" />

      <div className="container mt-[30px]">
        <Button
          bordered
          onClick={handleBack}
          className="text-[12px] py-[8px] px-[10px]"
          text="Back to shopping"
          background="transparent"
          type="button"
          tag="button"
        />
      </div>

      <div className="container flex flex-col gap-[30px] py-[50px] lg:flex-row lg:flex-row-reverse lg:gap-[50px]">
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <ProductsSection
            basicInfo={basicInfo}
            shippingValue={shippingValue}
          />
        </div>
        <div className="flex flex-col gap-[30px] lg:flex-1">
          <BasicInfoSection
            onContinue={handleBasicInfoContinue}
            setBasicInfo={setBasicInfo}
            isOpen={isBasicInfoOpen}
          />
          <ShippingSection
            isDisabled={!isBasicInfoValid}
            isOpen={isShippingOpen}
            onContinue={handleShippingContinue}
            setShippingValue={setShippingValue}
          />
          <PaymentSection
            isDisabled={!isShippingValid}
            isOpen={isPaymentOpen}
          />
        </div>
      </div>
    </>
  );
}
