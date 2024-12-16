import React, { ChangeEvent, FC, useState } from "react";
import Button from "@/components/ButtonComponent";
import FormComponent from "@/components/FormComponent";
import Input from "@/components/InputComponent";
import { useForm } from "@mantine/form";

const PaymentSection: FC<{
  isOpen: boolean;
  toggleOpen: () => void;
  completePayment: (isValid: boolean) => void;
}> = ({ completePayment, isOpen, toggleOpen }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCompletePayment = () => {
    if (!selectedOption) {
      setError("Please select a payment method");
      completePayment(false);
    } else {
      setError(null);
      completePayment(true);
    }
  };

  return (
    <section>
      <FormComponent
        title="Payment"
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        closeText={selectedOption}
      >
        <div className="flex flex-col gap-[30px] font-semibold pl-[30px]">
          <label className="flex items-center gap-[10px] cursor-pointer font-semibold text-[14px]">
            <input
              type="radio"
              checked={selectedOption === "Кредитна картка"}
              onChange={() => setSelectedOption("Кредитна картка")}
              className="w-[25px] h-[25px] accent-darkBurgundy"
            />
            Credit Card
          </label>

          <label className="flex items-center gap-[10px] cursor-pointer font-semibold text-[14px]">
            <input
              type="radio"
              checked={selectedOption === "Paypal"}
              onChange={() => setSelectedOption("Paypal")}
              className="w-[25px] h-[25px] accent-darkBurgundy"
            />
            PayPal
          </label>
        </div>

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
