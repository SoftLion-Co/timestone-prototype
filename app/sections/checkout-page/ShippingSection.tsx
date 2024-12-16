"use client";
import React, { FC, useState } from "react";
import FormComponent from "@/components/FormComponent";
import Checkbox from "@/components/CheckboxComponent";
import Button from "@/components/ButtonComponent";
import Input from "@/components/InputComponent";
import { hasLength, useForm } from "@mantine/form";
import { Street, Postomat, Department } from "@/config/types";
import {
  getStreets,
  getPostomates,
  getDepartments,
} from "@/services/ShippingService";
import { BASE_URL } from "@/config/config";
import axios from "axios";

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
  const [postomates, setPostomates] = useState<Postomat[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const handleStreetChange = async ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    form.setFieldValue("street", value);

    if (!value.trim() || !settlementRef) {
      setStreets([]);
      setError(null);
      return;
    }

    const street = await getStreets(value, settlementRef);
    if (street.length === 0) {
      setError("Вулиця не знайдена!");
    } else {
      setError(null);
    }
    setStreets(street);
  };

  const handlePostomatChange = async ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    form.setFieldValue("postomat", value);

    if (!value.trim() || !cityRef) {
      setPostomates([]);
      setError(null);
      return;
    }

    const postomat = await getPostomates(value, cityRef);

    if (postomat.length === 0) {
      setError("Поштомат не знайдено!");
    } else {
      setError(null);
    }
    setPostomates(postomat);
  };

  const handleDepartmentChange = async ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    form.setFieldValue("department", value);

    if (!value.trim() || !cityRef) {
      setDepartments([]);
      setError(null);
      return;
    }

    const department = await getDepartments(value, cityRef);
    if (department.length === 0) {
      setError("Відділення не знайдено!");
    } else {
      setError(null);
    }
    setDepartments(department);
  };

  const handleSelectChange = (value: string) => {
    const selectedStreet = streets.find(({ Present }) => Present === value);
    const selectedPostomat = postomates.find(
      ({ Description }) => Description === value
    );
    const selectedDepartment = departments.find(({ Ref }) => Ref === value);

    if (selectedStreet) {
      form.setFieldValue("street", selectedStreet.Present);
      setStreets([]);
    }
    if (selectedPostomat) {
      form.setFieldValue("postomat", selectedPostomat.Description);
      setPostomates([]);
    }
    if (selectedDepartment) {
      form.setFieldValue("department", selectedDepartment.Description);
      setDepartments([]);
    }
  };

  const form = useForm({
    initialValues: {
      street: "",
      house: "",
      flat: "",
      postomat: "",
      department: "",
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
      case "Самовивіз з Нової Пошти":
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

      case "Кур'єр Нової Пошти":
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

      case "Самовивіз з поштоматів Нової Пошти":
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
        closeText={selectedOption}
      >
        <Checkbox
          label="Самовивіз з Нової Пошти"
          description="Середній термін доставки 2 дні"
          price="За тарифами перевізника"
          checked={selectedOption == "Самовивіз з Нової Пошти"}
          onChange={() => handleOptionChange("Самовивіз з Нової Пошти")}
        >
          {selectedOption == "Самовивіз з Нової Пошти" && (
            <>
              <Input
                inputType="input"
                placeholder="Відділення"
                required={true}
                bordered={true}
                {...form.getInputProps("department")}
                onChange={handleDepartmentChange}
                errorType="critical"
                fullWidth
                className="mini:w-[100%] lg:w-[85%] my-[20px] m-auto"
              />

              {departments.length > 0 && (
                <Input
                  className="mini:w-[100%] lg:w-[85%] m-auto"
                  inputType="select"
                  placeholder="Оберіть відділення"
                  options={departments.map((department) => ({
                    value: department.Ref,
                    label: department.Description,
                  }))}
                  onSelect={handleSelectChange}
                  scrollable
                />
              )}
            </>
          )}
        </Checkbox>

        <Checkbox
          label="Кур'єр Нової Пошти"
          description="Середній термін доставки 2 дні"
          price="За тарифами перевізника"
          checked={selectedOption == "Кур'єр Нової Пошти"}
          onChange={() => handleOptionChange("Кур'єр Нової Пошти")}
        >
          {selectedOption == "Кур'єр Нової Пошти" && (
            <>
              <Input
                inputType="input"
                placeholder="Вулиця"
                required={true}
                bordered={true}
                {...form.getInputProps("street")}
                onChange={handleStreetChange}
                errorType="critical"
                fullWidth
                className="mini:w-[100%] lg:w-[85%] my-[20px] m-auto"
              />

              {error && (
                <p className="text-darkBurgundy text-[14px]">{error}</p>
              )}

              {streets.length > 0 && (
                <Input
                  className="mini:w-[100%] lg:w-[85%]"
                  inputType="select"
                  placeholder="Оберіть вулицю"
                  options={streets.map((street) => ({
                    value: street.SettlementStreetRef,
                    label: street.Present,
                  }))}
                  onSelect={handleSelectChange}
                  scrollable
                />
              )}

              <div className="flex flex-col  m-auto gap-[15px]  w-full lg:w-[85%] mini:flex-row">
                <Input
                  inputType="input"
                  placeholder="Будинок"
                  type="text"
                  required={true}
                  bordered={true}
                  {...form.getInputProps("house")}
                  errorType="critical"
                  fullWidth
                  className="mini:w-3/6"
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
                  className="mini:w-3/6"
                />
              </div>
            </>
          )}
        </Checkbox>

        <Checkbox
          label="Самовивіз з поштоматів Нової Пошти"
          description="Середній термін доставки 2 дні"
          price="За тарифами перевізника"
          checked={selectedOption == "Самовивіз з поштоматів Нової Пошти"}
          onChange={() =>
            handleOptionChange("Самовивіз з поштоматів Нової Пошти")
          }
        >
          {selectedOption == "Самовивіз з поштоматів Нової Пошти" && (
            <>
              <Input
                inputType="input"
                placeholder="Поштомат"
                required={true}
                bordered={true}
                {...form.getInputProps("postomat")}
                onChange={handlePostomatChange}
                errorType="critical"
                fullWidth
                className="mini:w-[100%] lg:w-[85%] my-[20px] m-auto"
              />

              {error && (
                <p className="text-darkBurgundy text-[14px]">{error}</p>
              )}

              {postomates.length > 0 && (
                <Input
                  className="mini:w-[100%] lg:w-[85%] m-auto"
                  inputType="select"
                  placeholder="Оберіть поштомат "
                  options={postomates.map((postomat) => ({
                    value: postomat.Ref,
                    label: postomat.Description,
                  }))}
                  onSelect={handleSelectChange}
                  scrollable
                />
              )}
            </>
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
