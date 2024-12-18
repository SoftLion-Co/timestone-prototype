"use client";
import React, { FC, useEffect, useState } from "react";
import FormComponent from "@/components/FormComponent";
import Checkbox from "@/components/CheckboxComponent";
import Button from "@/components/ButtonComponent";
import Input from "@/components/InputComponent";
import { useForm } from "@mantine/form";
import { Street, Postomat, Department } from "@/config/types";
import {
  getStreets,
  getPostomates,
  getDepartments,
} from "@/services/ShippingService";

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
  const [validationErrors, setValidationErrors] = useState<string | null>(null);
  const [streets, setStreets] = useState<Street[]>([]);
  const [postomates, setPostomates] = useState<Postomat[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const form = useForm({
    initialValues: {
      street: "",
      house: "",
      flat: "",
      postomat: "",
      department: "",
    },
  });

  useEffect(() => {
    const localValues = localStorage.getItem("shippingInfo");
    if (localValues) {
      const result = JSON.parse(localValues);
      form.setValues(result);
      if (result.selectedOption) {
        setSelectedOption(result.selectedOption);
      }
    }
  }, []);

  useEffect(() => {
    const { department, street, house, flat, postomat } = form.values;

    if (selectedOption == "Department" && department !== "") {
      localStorage.setItem("shippingInfo", JSON.stringify({ department, selectedOption }));
    } else if (
      selectedOption === "Courier" &&
      (street !== "" || house !== "" || flat !== "")
    ) {
      localStorage.setItem(
        "shippingInfo",
        JSON.stringify({ street, house, flat, selectedOption })
      );
    } else if (selectedOption === "Postomat" && postomat !== "") {
      localStorage.setItem(
        "shippingInfo",
        JSON.stringify({ postomat, selectedOption })
      );
    }
  }, [form.values, selectedOption]);

  const handleStreetChange = async ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    form.setFieldValue("street", value);

    if (!value.trim() || !settlementRef) {
      setStreets([]);
      setValidationErrors(null);
      return;
    }

    const street = await getStreets(value, settlementRef);
    if (street.length === 0) {
      setValidationErrors("Вулиця не знайдена!");
    } else {
      setValidationErrors(null);
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
      setValidationErrors(null);
      return;
    }

    const postomat = await getPostomates(value, cityRef);

    if (postomat.length === 0) {
      setValidationErrors("Поштомат не знайдено!");
    } else {
      setValidationErrors(null);
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
      setValidationErrors(null);
      return;
    }
    const department = await getDepartments(value, cityRef);
    if (department.length === 0) {
      setValidationErrors("Відділення не знайдено!");
    } else {
      setValidationErrors(null);
    }
    setDepartments(department);
  };

  const handleSelectChange = (value: string) => {
    const selectedStreet = streets.find(
      ({ SettlementStreetRef }) => SettlementStreetRef === value
    );
    const selectedPostomat = postomates.find(({ Ref }) => Ref === value);
    const selectedDepartment = departments.find(({ Ref }) => Ref === value);

    if (selectedStreet) {
      form.setFieldValue("street", selectedStreet.Present);
      setStreets([]);
    }
    if (selectedPostomat) {
      form.setFieldValue(
        "postomat",
        "№ " + selectedPostomat.Number + ", " + selectedPostomat.ShortAddress
      );
      setPostomates([]);
    }
    if (selectedDepartment) {
      form.setFieldValue("department", selectedDepartment.Description);
      setDepartments([]);
    }
  };

  const handleContinue = () => {
    let validationError = "";

    switch (selectedOption) {
      case "Department":
        if (!form.values.department) {
          validationError = "Введіть дані для доставки";
        }
        break;

      case "Postomat":
        if (!form.values.postomat) {
          validationError = "Введіть дані для доставки";
        }
        break;
      case "Courier":
        if (!form.values.street || !form.values.house) {
          validationError = "Введіть дані для доставки";
        }
        break;
    }

    if (!selectedOption) {
      setError("Please select a shipping method");
      setTimeout(() => {
        setError(null);
      }, 3000);
      onContinue(false);
      return;
    }
    if (validationError) {
      setValidationErrors(validationError);
      onContinue(false);
      return;
    }
    setAddressInfo(form.values);
    setError(null);
    setValidationErrors(null);
    onContinue(true);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);

    switch (option) {
      case "Department":
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

      case "Courier":
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

      case "Postomat":
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

  const closeText =
    selectedOption == "Postomat"
      ? "Поштомат Нової Пошти"
      : selectedOption == "Department"
      ? "Самовивіз з Нової Пошти"
      : selectedOption == "Courier"
      ? "Кур'єр Нової Пошти"
      : "";

  return (
    <section>
      <FormComponent
        title="Shipping"
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        className="items-center"
        closeText={closeText}
      >
        <Checkbox
          label="Самовивіз з Нової Пошти"
          description="Середній термін доставки 2 дні"
          price="від 70₴"
          checked={selectedOption == "Department"}
          onChange={() => handleOptionChange("Department")}
        >
          {selectedOption == "Department" && (
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

              {validationErrors && (
                <p className="text-darkBurgundy text-[14px]">
                  {validationErrors}
                </p>
              )}

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
          price="від 70₴"
          checked={selectedOption == "Courier"}
          onChange={() => handleOptionChange("Courier")}
        >
          {selectedOption == "Courier" && (
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

              {streets.length > 0 && (
                <Input
                  className="mini:w-[100%] lg:w-[85%] m-auto"
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

              <div className="flex flex-col m-auto gap-[15px] w-full lg:w-[85%] mini:flex-row my-[10px]">
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

              {validationErrors && (
                <p className="text-darkBurgundy text-[14px]">
                  {validationErrors}
                </p>
              )}
            </>
          )}
        </Checkbox>
        <Checkbox
          label="Поштоматів Нової Пошти"
          description="Середній термін доставки 2 дні"
          price="від 70₴"
          checked={selectedOption == "Postomat"}
          onChange={() => handleOptionChange("Postomat")}
        >
          {selectedOption == "Postomat" && (
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

              {validationErrors && (
                <p className="text-darkBurgundy text-[14px]">
                  {validationErrors}
                </p>
              )}

              {postomates.length > 0 && (
                <Input
                  className="mini:w-[100%] lg:w-[85%] m-auto"
                  inputType="select"
                  placeholder="Оберіть поштомат"
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
