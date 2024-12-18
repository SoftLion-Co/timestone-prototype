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
      setError("Please select a payment method");
      completePayment(false);
    } else {
      setPaymentInfo(paymentInfo);
      setError(null);
      completePayment(true);
    }
  };

  const closeText =
    paymentInfo == "LiqPay"
      ? "LiqPay - оплата на картку"
      : paymentInfo == "Post"
      ? "Накладний платіж"
      : "";

  return (
    <section>
      <FormComponent
        title="Payment"
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
            text="Complete Payment"
            className="my-[30px] mini:w-[80%] w-[100%]"
            onClick={handleCompletePayment}
          />
          <p className="text-[12px] text-silver text-center mini:w-[80%] w-[100%]">
            By placing your order you agree to our
            <span> </span>
            <a href="/legal" className="underline text-darkBurgundy">
              Terms & Conditions
            </a>
            and you understand that we will process your personal data on the
            basis of our<span> </span>
            <a href="/privacy" className="text-darkBurgundy underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </FormComponent>
    </section>
  );
};

export default PaymentSection;
