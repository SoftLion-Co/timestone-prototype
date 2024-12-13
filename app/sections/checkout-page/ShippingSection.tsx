"use client";
import React, { FC, useState } from "react";
import FormComponent from "@/components/FormComponent";
import Checkbox from "@/components/CheckboxComponent";
import Button from "@/components/ButtonComponent";
import Input from "@/components/InputComponent";
import { hasLength, useForm } from "@mantine/form";
import { BASE_URL } from "@/config/config";
import axios from "axios";

interface Street {
  Present: string;
  SettlementStreetRef: string;
}

interface Warehouse {
  Description: string;
  Ref: string;
}

const ShippingSection: FC<{
  onContinue: (isValid: boolean) => void;
  setShippingValue: any;
  isOpen: boolean;
  toggleOpen: () => void;
  setAddressInfo: any;
  settlementRef: any;
  cityRef: any;
}> = ({
  onContinue,
  setShippingValue,
  setAddressInfo,
  isOpen,
  toggleOpen,
  settlementRef,
  cityRef,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [streets, setStreets] = useState<Street[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  const handleStreetChange = async ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    form.setFieldValue("street", value);

    if (!value.trim() || !settlementRef) {
      return setStreets([]);
    }

    const { data } = await axios.get(`${BASE_URL}/streets`, {
      params: { street: value, settlementRef: settlementRef },
    });
    setStreets(data?.[0]?.Addresses || []);
  };

  const handleWarehouseChange = async ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    form.setFieldValue("warehouse", value);

    if (!value.trim() || !cityRef) {
      return setWarehouses([]);
    }

    const { data } = await axios.get(`${BASE_URL}/poshtomats`, {
      params: { findByString: value, cityName: cityRef },
    });
    console.log({ findByString: value, cityRef });
    setWarehouses(data || []);
  };

  const handleSelectChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    const selectedStreet = streets.find(({ Present }) => Present === value);
    const selectedWarehouse = warehouses.find(
      ({ Description }) => Description === value
    );
    if (selectedStreet) {
      form.setFieldValue("street", selectedStreet.Present);
      setStreets([]);
    }
    if (selectedWarehouse) {
      form.setFieldValue("warehouse", selectedWarehouse.Description);
      setWarehouses([]);
    }
    // console.log(selectedStreet?.Present);
    // console.log(selectedWarehouse?.Description);
    //console.log(selectedStreet?.Ref);
  };

  const form = useForm({
    initialValues: {
      street: "",
      house: "",
      flat: "",
      warehouse: "",
    },
    validate: {
      street: (value) => (value.trim() ? null : "Street is required"),
      warehouse: (value) => (value.trim() ? null : "Warehouse is required"),
      house: hasLength({ min: 1 }, "Must be at least 1 characters"),
    },
  });

  const handleContinue = () => {
    if (!selectedOption) {
      setError("Please select a shipping method");
      onContinue(false);
      return;
    }
    setAddressInfo(form.values);
    setError(null);
    onContinue(true);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);

    switch (option) {
      case "Укрпошта":
        setShippingValue({
          shippingLines: [
            {
              code: "Укрпошта",
              title: "Самовивіз Укрпошта",
              priceSet: {
                shopMoney: {
                  amount: "00.00",
                  currencyCode: "UAH",
                },
              },
            },
          ],
        });
        break;

      case "Відділення":
        setShippingValue({
          shippingLines: [
            {
              code: "Нова Пошта",
              title: "Самовивіз Нова Пошта",
              priceSet: {
                shopMoney: {
                  amount: "00.00",
                  currencyCode: "UAH",
                },
              },
            },
          ],
        });
        break;

      case "Кур'єр":
        setShippingValue({
          shippingLines: [
            {
              code: "Нова Пошта",
              title: "Кур'єр Нова Пошта",
              priceSet: {
                shopMoney: {
                  amount: "00.00",
                  currencyCode: "UAH",
                },
              },
            },
          ],
        });
        break;

      case "Поштомат":
        setShippingValue({
          shippingLines: [
            {
              code: "Нова Пошта",
              title: "Поштомат Нова Пошта",
              priceSet: {
                shopMoney: {
                  amount: "00.00",
                  currencyCode: "UAH",
                },
              },
            },
          ],
        });
        break;
    }
  };

  return (
    <section>
      <FormComponent
        title="Shipping"
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        className="items-center"
      >
        <Checkbox
          label="Самовивіз з Укрпошти"
          description="Середній термін доставки 4 дні"
          price="За тарифами перевізника"
          checked={selectedOption == "Укрпошта"}
          onChange={() => handleOptionChange("Укрпошта")}
        >
          {selectedOption == "Укрпошта" && (
            <div className="mx-[30px] flex flex-col my-[15px] gap-[10px]">
              <Input inputType="select" />
            </div>
          )}
        </Checkbox>

        <Checkbox
          label="Самовивіз з Нової Пошти"
          description="Середній термін доставки 2 дні"
          price="За тарифами перевізника"
          checked={selectedOption == "Відділення"}
          onChange={() => handleOptionChange("Відділення")}
        >
          {selectedOption == "Відділення" && (
            <div className="mx-[30px] flex my-[15px] gap-[10px]">
              <Input inputType="select" />
            </div>
          )}
        </Checkbox>

        <Checkbox
          label="Кур'єр Нової Пошти"
          description="Середній термін доставки 2 дні"
          price="За тарифами перевізника"
          checked={selectedOption == "Кур'єр"}
          onChange={() => handleOptionChange("Кур'єр")}
        >
          {selectedOption == "Кур'єр" && (
            <div>
              <Input
                inputType="input"
                placeholder="Вулиця"
                required={true}
                bordered={true}
                {...form.getInputProps("street")}
                onChange={handleStreetChange}
                errorType="critical"
                fullWidth
                className="mini:w-[80%]"
              />
              {streets.length > 0 && (
                <select onChange={handleSelectChange}>
                  {streets.map((street) => (
                    <option
                      key={street.SettlementStreetRef}
                      value={street.Present}
                    >
                      {street.Present}
                    </option>
                  ))}
                </select>
              )}

              <Input
                inputType="input"
                placeholder="Будинок"
                type="text"
                required={true}
                bordered={true}
                {...form.getInputProps("house")}
                errorType="critical"
                fullWidth
                className="mini:w-[80%]"
              />

              <Input
                inputType="input"
                placeholder="Квартира"
                type="text"
                required={true}
                bordered={true}
                {...form.getInputProps("flat")}
                errorType="critical"
                fullWidth
                className="mini:w-[80%]"
              />
            </div>
          )}
        </Checkbox>

        <Checkbox
          label="Самовивіз з поштоматів Нової Пошти"
          description="Середній термін доставки 2 дні"
          price="За тарифами перевізника"
          checked={selectedOption == "Поштомат"}
          onChange={() => handleOptionChange("Поштомат")}
        >
          {selectedOption == "Поштомат" && (
            <div>
              <Input
                inputType="input"
                placeholder="Поштомат"
                required={true}
                bordered={true}
                {...form.getInputProps("warehouse")}
                onChange={handleWarehouseChange}
                errorType="critical"
                fullWidth
                className="mini:w-[80%]"
              />
              {warehouses.length > 0 && (
                <select onChange={handleSelectChange}>
                  {warehouses.map((warehouse) => (
                    <option key={warehouse.Ref} value={warehouse.Description}>
                      {warehouse.Description}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
        </Checkbox>

        {error && (
          <p className="text-[14px] text-darkBurgundy text-center">{error}</p>
        )}

        <Button
          text="Continue"
          className="mini:w-[80%] w-[100%]"
          type="button"
          onClick={handleContinue}
        />
      </FormComponent>
    </section>
  );
};

export default ShippingSection;
