"use client";
import TitleComponents from "@/components/TitleComponents";
import ProductsSection from "@/app/sections/checkout-page/ProductsSection";
import PaymentSection from "@/app/sections/checkout-page/PaymentSection";
import BasicInfoSection from "@/app/sections/checkout-page/BasicInfoSection";
import ShippingSection from "@/app/sections/checkout-page/ShippingSection";
import Button from "@/components/ButtonComponent";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [BasicInfoOpen, setBasicInfoOpen] = useState(true);
  const [ShippingOpen, setShippingOpen] = useState(false);
  const [PaymentOpen, setPaymentOpen] = useState(false);

  const [basicInfo, setBasicInfo] = useState({});
  const [shippingValue, setShippingValue] = useState({});
  const router = useRouter();

  const handleBasicInfoContinue = (isValid: boolean) => {
    if (isValid) {
      setBasicInfoOpen(false);
      setTimeout(() => {
        setShippingOpen(true);
      }, 300);
    }
  };

  const handleShippingContinue = (isValid: boolean) => {
    if (isValid) {
      setShippingOpen(false);
      setTimeout(() => {
        setPaymentOpen(true);
      }, 300);
    }
  };

  const handleCompletePayment = (isValid: boolean) => {
    if (isValid) {
      setPaymentOpen(false);
    }
  };

  const handleBack = () => {
    router.push("/catalog");
  };

  return (
    <>
      <TitleComponents text="CHECKOUT" />

      <div className="mx-[15px] mt-[30px]">
        <Button
          bordered
          onClick={handleBack}
          className="text-[12px] py-[8px] px-[10px]"
          text="Back to shopping"
          icon="arrow"
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
            isOpen={BasicInfoOpen}
            toggleOpen={() => setBasicInfoOpen(!BasicInfoOpen)}
            onContinue={handleBasicInfoContinue}
            setBasicInfo={setBasicInfo}
          />
          <ShippingSection
            isOpen={ShippingOpen}
            toggleOpen={() => setShippingOpen(!ShippingOpen)}
            onContinue={handleShippingContinue}
            setShippingValue={setShippingValue}
          />
          <PaymentSection
            isOpen={PaymentOpen}
            toggleOpen={() => setPaymentOpen(!PaymentOpen)}
            completePayment={handleCompletePayment}
          />
        </div>
      </div>
    </>
  );
}
