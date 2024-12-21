import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Button from "@/components/ButtonComponent";
import FormComponent from "@/components/FormComponent";
import Checkbox from "@/components/CheckboxComponent";

const PaymentSection: FC<{
  isOpen: boolean;
  toggleOpen: () => void;
  paymentInfo: any;
  setPaymentInfo: any;
  completePayment: (isValid: boolean) => void;
}> = ({ completePayment, isOpen, toggleOpen, setPaymentInfo, paymentInfo }) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const localValues = localStorage.getItem("paymentInfo");
    if (localValues) {
      setPaymentInfo(JSON.parse(localValues));
    }
  }, []);

  useEffect(() => {
    if (paymentInfo) {
      localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));
    }
  }, [paymentInfo]);

  const handleCompletePayment = () => {
    if (!paymentInfo) {
      setError("Оберіть спосіб оплати!");
      completePayment(false);
    } else {
      setPaymentInfo(paymentInfo);
      setError(null);
      completePayment(true);
    }
  };

  const closeText =
    paymentInfo === "LiqPay"
      ? "LiqPay - оплата на картку"
      : paymentInfo === "Post"
      ? "Накладний платіж"
      : "";

  return (
    <>
      <FormComponent
        title="Оплата"
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        closeText={closeText}
        className="items-center"
      >
        <Checkbox
          label="LiqPay - оплата на картку"
          description="Visa, MasterCard, Apple Pay, Google Pay, PrivatPay"
          checked={paymentInfo === "LiqPay"}
          onChange={() => setPaymentInfo("LiqPay")}
        />

        <Checkbox
          label="Накладний платіж"
          description="Оплата при отриманні"
          checked={paymentInfo === "Post"}
          onChange={() => setPaymentInfo("Post")}
        />

        {error && (
          <p className="text-[14px] text-darkBurgundy text-center">{error}</p>
        )}

        <div className="flex flex-col items-center gap-y-[15px]">
          <Button
            text="Оплатити"
            className="my-[30px] w-[100%] mini:w-[80%]"
            onClick={() => {
              handleCompletePayment();
              const buttonContainer = document.getElementById(
                "payment-button-container"
              );
              if (buttonContainer) {
                buttonContainer.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                });
              }
            }}
          />
          <p className="text-[12px] text-silver text-center w-[100%] mini:w-[80%]">
            Оформлюючи замовлення, Ви погоджуюєтеся з нашими
            <span> </span>
            <a href="/legal" className="underline text-darkBurgundy">
              Положеннями та Умовами
            </a>
            <span> </span>
            та надаєте згоду на обробку вашої персональної інфомації на основі
            нашої<span> </span>
            <a href="/privacy" className="text-darkBurgundy underline">
              Політики Конфіденційності
            </a>
            .
          </p>
        </div>
      </FormComponent>
    </>
  );
};

export default PaymentSection;
