"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ButtonComponent";
import TitleComponents from "@/components/TitleComponents";
import PaymentSection from "@/app/sections/checkout-page/PaymentSection";
import ShippingSection from "@/app/sections/checkout-page/ShippingSection";
import ProductsSection from "@/app/sections/checkout-page/ProductsSection";
import BasicInfoSection from "@/app/sections/checkout-page/BasicInfoSection";

const CheckoutSection = () => {
  const [BasicInfoOpen, setBasicInfoOpen] = useState(true);
  const [ShippingOpen, setShippingOpen] = useState(false);
  const [PaymentOpen, setPaymentOpen] = useState(false);

  const [basicInfo, setBasicInfo] = useState({});
  const [shippingValue, setShippingValue] = useState({});
  const [addressInfo, setAddressInfo] = useState({});
  const [paymentInfo, setPaymentInfo] = useState<string>("");
  const [settlementRef, setSettlementRef] = useState<string>("");
  const [cityRef, setCityRef] = useState<string>("");
  

  const handleBasicInfoContinue = (isValid: boolean) => {
    if (isValid) {
      setBasicInfoOpen(false);
      setShippingOpen(true);
    }
  };

  const handleShippingContinue = (isValid: boolean) => {
    if (isValid) {
      setShippingOpen(false);
      setPaymentOpen(true);
    }
  };

  const handleCompletePayment = (isValid: boolean) => {
    if (isValid) {
      setPaymentOpen(false);
    }
  };

  return (
    <section>
      <TitleComponents text="Оформлення замовлення" />

      <div className="flex flex-row items-start mx-[20px] lg:mx-[60px] mt-[30px]">
        <Button
          bordered
          className="flex !items-start text-[12px] py-[8px] px-[9px]"
          text="Назад"
          href="/catalog"
          icon="back"
          background="transparent"
          tag="a"
        />
      </div>

      <div className="container flex flex-col gap-[30px] py-[50px] lg:flex-row lg:flex-row-reverse lg:gap-[50px]">
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <ProductsSection
            basicInfo={basicInfo}
            shippingValue={shippingValue}
            addressInfo={addressInfo}
            paymentInfo={paymentInfo}
          />
        </div>

        <div className="flex flex-col gap-[30px] lg:flex-1">
          <BasicInfoSection
            isOpen={BasicInfoOpen}
            toggleOpen={() => setBasicInfoOpen(!BasicInfoOpen)}
            onContinue={handleBasicInfoContinue}
            setBasicInfo={setBasicInfo}
            setSettlementRef={setSettlementRef}
            setCityRef={setCityRef}
          />

          <ShippingSection
            isOpen={ShippingOpen}
            toggleOpen={() => setShippingOpen(!ShippingOpen)}
            onContinue={handleShippingContinue}
            setShippingValue={setShippingValue}
            setAddressInfo={setAddressInfo}
            settlementRef={settlementRef}
            cityRef={cityRef}
          />

          <PaymentSection
            isOpen={PaymentOpen}
            toggleOpen={() => setPaymentOpen(!PaymentOpen)}
            completePayment={handleCompletePayment}
            setPaymentInfo={setPaymentInfo}
            paymentInfo={paymentInfo}
          />
        </div>
      </div>
    </section>
  );
};

export default CheckoutSection;
