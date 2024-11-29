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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: "cardNumber" | "expDate" | "cvv"
  ) => {
    let value = e.target.value.replace(/\D/g, "");

    if (type === "cardNumber") {
      value = value.slice(0, 16);
      const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
      form.setFieldValue("cardNumber", formattedValue);
    }

    if (type === "expDate") {
      value = value.slice(0, 4);
      if (value.length > 2) {
        value = `${value.slice(0, 2)}/${value.slice(2)}`;
      }
      form.setFieldValue("expDate", value);
    }

    if (type === "cvv") {
      value = value.slice(0, 3);
      form.setFieldValue("cvv", value);
    }
  };

  const form = useForm({
    initialValues: {
      cardNumber: "",
      expDate: "",
      cvv: "",
    },
    validate: {
      cardNumber: (value) =>
        value.replace(/\s/g, "").length < 16 ? "Invalid" : null,
      expDate: (value) => (!/^\d{2}\/\d{2}$/.test(value) ? "Invalid" : null),
      cvv: (value) => (value.length < 3 ? "Invalid" : null),
    },
  });

  const handlePay = () => {
    const { errors } = form.validate();
    if (Object.keys(errors).length > 0) {
      console.log("Form has errors:", errors);
      return;
    }
  };

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
      <FormComponent title="Payment" isOpen={isOpen} toggleOpen={toggleOpen}>
        <div className="flex flex-col gap-[30px] font-semibold pl-[30px]">
          <label className="flex items-center gap-[10px] cursor-pointer font-semibold text-[14px]">
            <input
              type="radio"
              value="creditCard"
              checked={selectedOption === "creditCard"}
              onChange={() => setSelectedOption("creditCard")}
              className="w-[25px] h-[25px] accent-darkBurgundy"
            />
            Credit Card
          </label>

          {selectedOption === "creditCard" && (
            <>
              <div className="flex flex-col gap-[15px] mini:mx-[25px]">
                <div>
                  <p className="pb-[10px] text-silver">Card Number</p>
                  <Input
                    inputType="input"
                    type="text"
                    placeholder="xxxx xxxx xxxx xxxx"
                    {...form.getInputProps("cardNumber")}
                    onChange={(e) => handleInputChange(e, "cardNumber")}
                    errorType="critical"
                    fullWidth
                    required
                    bordered
                    className=" mb-[5px] mini:w-[90%]"
                  />
                </div>

                <div className="flex flex-row gap-[5px] justify-between">
                  <div className="w-1/2">
                    <p className="pb-[10px] text-silver">Expire Date</p>
                    <Input
                      inputType="input"
                      type="text"
                      placeholder="MM/YY"
                      {...form.getInputProps("expDate")}
                      onChange={(e) => handleInputChange(e, "expDate")}
                      errorType="critical"
                      fullWidth
                      required
                      bordered
                      className="mb-[5px] mini:w-[80%]"
                    />
                  </div>

                  <div className="w-1/2">
                    <p className="pb-[10px] text-silver">CVV</p>
                    <Input
                      inputType="input"
                      type="text"
                      placeholder="xxx"
                      {...form.getInputProps("cvv")}
                      onChange={(e) => handleInputChange(e, "cvv")}
                      errorType="critical"
                      fullWidth
                      required
                      bordered
                      className="mb-[5px] mini:w-[80%]"
                    />
                  </div>
                </div>

                <Button
                  text="Pay"
                  background="transparent"
                  bordered
                  className=" w-[100%] mini:w-[90%]"
                  onClick={handlePay}
                />
              </div>
            </>
          )}

          <label className="flex items-center gap-[10px] cursor-pointer font-semibold text-[14px]">
            <input
              type="radio"
              value="paypal"
              checked={selectedOption === "paypal"}
              onChange={() => setSelectedOption("paypal")}
              className="w-[25px] h-[25px] accent-darkBurgundy"
            />
            PayPal
            {selectedOption === "paypal" && (
              <Button
                text="Pay"
                background="transparent"
                bordered
                className="ml-[30px] mini:w-[50%] w-[100%]"
              />
            )}
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
          <p className="text-[10px] text-silver text-center mini:w-[80%] w-[100%]">
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
