import React, { FC, useState } from "react";
import Button from "@/components/ButtonComponent";
import FormComponent from "@/components/FormComponent";
import Input from "@/components/InputComponent";
import { Group, TextInput } from "@mantine/core";

const PaymentSection: FC<{ isDisabled: boolean; isOpen: boolean }> = ({
  isDisabled,
  isOpen,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectRadio, setSelectedRadio] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCompletePayment = () => {
    if (!selectedOption) {
      setError("Please select a payment method");
    } else {
      setError(null);
      console.log("Payment completed successfully!");
    }
  };

  return (
    <section>
      <FormComponent
        title="Payment"
        className={`${isDisabled ? "opacity-50 pointer-events-none" : ""}`}
      >
        {isOpen && (
          <>
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
                  <div className="flex flex-col items-center px-[30px] gap-4">
                    <div className="w-full text-center">
                      <p className="pb-2 text-[14px] text-silver">
                        Card Number
                      </p>
                      <Input
                        inputType="input"
                        placeholder="xxxx xxxx xxxx xxxx"
                        pattern="\d{16}"
                        maxLength={19}
                        required
                        bordered
                        className="text-center"
                      />
                    </div>

                    <div className="w-full flex flex-row gap-4 justify-between">
                      <div className="w-1/2">
                        <p className="pb-2 text-[14px] text-silver pl-[15px]">
                          Expire Date
                        </p>
                        <Input
                          type="text"
                          placeholder="MM/YY"
                          pattern="\d{2}/\d{2}"
                          maxLength={5}
                          required
                          bordered
                          inputType="input"
                          className="w-[150px]"
                        />
                      </div>

                      <div className="w-1/2">
                        <p className="pb-2 text-[14px] text-silver pl-[15px]">
                          CVV
                        </p>
                        <Input
                          type="text"
                          placeholder="xxx"
                          pattern="\d{3}"
                          maxLength={3}
                          required
                          bordered
                          inputType="input"
                          className="w-[150px]"
                        />
                      </div>
                    </div>
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
              </label>

              {selectedOption === "paypal" && (
                <Button text="Pay" className="mini:w-[50%]"/>
              )}
            </div>

            {error && (
              <p className="text-[14px] text-darkBurgundy text-center">
                {error}
              </p>
            )}

            <div className="flex flex-col items-center gap-y-[15px]">
              <Button
                text="Complete Payment"
                className="my-[30px] mini:w-[80%] w-[100%]"
                onClick={handleCompletePayment}
              />
              <p className="text-[10px] text-silver text-center mini:w-[80%] w-[100%]">
                By placing your order you agree to our{" "}
                <span className="text-darkBurgundy">Terms & Conditions</span>{" "}
                and you understand that we will process your personal data on
                the basis of our{" "}
                <span className="text-darkBurgundy">Privacy Policy</span>.
              </p>
            </div>
          </>
        )}
      </FormComponent>
    </section>
  );
};

export default PaymentSection;
