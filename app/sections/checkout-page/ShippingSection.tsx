"use client";
import React, { FC, useState } from "react";
import FormComponent from "@/components/FormComponent";
import Checkbox from "@/components/CheckboxComponent";
import Button from "@/components/ButtonComponent";

const ShippingSection: FC<{
  isDisabled: boolean;
  isOpen: boolean;
  onContinue: (isValid: boolean) => void;
}> = ({ isDisabled, isOpen, onContinue }) => {

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [shippingValue, setShippingValue] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = () => {
     if (!selectedOption) {
      setError("Please select a shipping method");
      onContinue(false);
      return;
    }
    setError(null);
    onContinue(true);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    if (option === "UPS Standard") {
      setShippingValue({
        shippingLines: [
          {
            code: "Standard",
            title: "Standard",
            priceSet: {
              shopMoney: {
                amount: "00.00",
                currencyCode: "UAH",
              },
            },
          },
        ],
      });
    } else if (option === "UPS Express") {
      setShippingValue({
        shippingLines: [
          {
            code: "Express",
            title: "Express",
            priceSet: {
              shopMoney: {
                amount: "49.99",
                currencyCode: "UAH",
              },
            },
          },
        ],
      });
    }
  };

  return (
    <section>
      <FormComponent title="Shipping"className={`items-center ${isDisabled ? "opacity-50 pointer-events-none" : ""}`}
  >
    {isOpen && (
        <>

        <Checkbox
          label="UPS Express"
          description="UPS Express 2-3 working days"
          price="$49.99"
          checked={selectedOption == "UPS Express"}
          onChange={() => handleOptionChange("UPS Express")}
        />

        <Checkbox
          label="UPS Standard"
          price="Free"
          description="UPS Standard 2-3 working days"
          checked={selectedOption == "UPS Standard"}
          onChange={() => handleOptionChange("UPS Standard")}
        />
        {error && (
          <p className="text-[14px] text-darkBurgundy text-center">{error}</p>
        )}

        <Button
          text="Continue"
          className="mini:w-[80%] w-[100%]"
          type="button"
          onClick={handleContinue}
        />
       </>
    )}

      </FormComponent>
    </section>
  );
};

export default ShippingSection;
