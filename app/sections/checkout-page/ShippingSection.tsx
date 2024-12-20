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

    if (selectedOption === "Department" && department != "") {
      localStorage.setItem(
        "shippingInfo",
        JSON.stringify({ department, selectedOption })
      );
    } else if (
      selectedOption === "Courier" &&
      (street != "" || house != "" || flat != "")
    ) {
      localStorage.setItem(
        "shippingInfo",
        JSON.stringify({ street, house, flat, selectedOption })
      );
    } else if (selectedOption === "Postomat" && postomat != "") {
      localStorage.setItem(
        "shippingInfo",
        JSON.stringify({ postomat, selectedOption })
      );
    }
  }, [form.values, selectedOption]);

  const handleSelect = async (value: string) => {
    let validationError = "";
    switch (selectedOption) {
      case "Courier":
        if (!value.trim() || !settlementRef) {
          setStreets([]);
          setValidationErrors(null);
          return;
        }

        const selectedStreet = streets.find(
          ({ SettlementStreetRef }) => SettlementStreetRef === value
        );
        if (selectedStreet) {
          form.setFieldValue("street", selectedStreet.Present);
          setStreets([]);
        } else {
          const street = await getStreets(value, settlementRef);
          if (street.length === 0) {
            setValidationErrors("Не знайдено!");
          } else {
            setValidationErrors(null);
            setStreets(street);
          }
        }
        if (!form.values.street || !form.values.house) {
          validationError = "Введіть дані для доставки";
          setValidationErrors(validationError);
        }
        break;

      case "Postomat":
        if (!value.trim() || !cityRef) {
          setPostomates([]);
          setValidationErrors(null);
          return;
        }
        const selectedPostomat = postomates.find(({ Ref }) => Ref === value);
        if (selectedPostomat) {
          form.setFieldValue(
            "postomat",
            "№ " +
              selectedPostomat.Number +
              ", " +
              selectedPostomat.ShortAddress
          );
          setPostomates([]);
          return;
        }

        const postomat = await getPostomates(value, cityRef);
        if (postomat.length === 0) {
          setValidationErrors("Не знайдено!");
        } else {
          setValidationErrors(null);
          setPostomates(postomat);
        }

        if (!form.values.postomat) {
          validationError = "Введіть дані для доставки";
          setValidationErrors(validationError);
        }
        break;

      case "Department":
        if (!value.trim() || !cityRef) {
          setDepartments([]);
          setValidationErrors(null);
          return;
        }
        const selectedDepartment = departments.find(({ Ref }) => Ref === value);
        if (selectedDepartment) {
          form.setFieldValue("department", selectedDepartment.Description);
          setDepartments([]);
        } else {
          const department = await getDepartments(value, cityRef);
          if (department.length === 0) {
            setValidationErrors("Не знайдено!");
          } else {
            setValidationErrors(null);
            setDepartments(department);
          }
        }

        if (!form.values.department) {
          setValidationErrors("Введіть дані для доставки");
          onContinue(false);
        }
        break;
    }
  };

  const handleContinue = () => {
    if (!selectedOption) {
      setError("Оберіть метод доставки!");
      onContinue(false);
      return;
    }
    
    setError(null);
    setAddressInfo(form.values);
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
    selectedOption === "Postomat"
      ? "Поштомат Нової Пошти"
      : selectedOption === "Department"
      ? "Самовивіз з Нової Пошти"
      : selectedOption === "Courier"
      ? "Кур'єр Нової Пошти"
      : "";

  return (
    <>
      <FormComponent
        title="Доставка"
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        className="items-center"
        closeText={closeText}
      >
        <Checkbox
          label="Самовивіз з Нової Пошти"
          description="Середній термін доставки 2 дні"
          price="від 70₴"
          checked={selectedOption === "Department"}
          onChange={() => handleOptionChange("Department")}
        >
          {selectedOption === "Department" && (
            <>
              <Input
                className="my-[20px] m-auto mini:w-[80%]"
                inputType="select"
                placeholder="Оберіть відділення"
                options={departments.map((department) => ({
                  value: department.Ref,
                  label: department.Description,
                }))}
                {...form.getInputProps("department")}
                scrollable
                bordered
                onSelect={handleSelect}
              />

              {validationErrors && (
                <p className="text-darkBurgundy text-[14px] m-auto">
                  {validationErrors}
                </p>
              )}
            </>
          )}
        </Checkbox>

        <Checkbox
          label="Кур'єр Нової Пошти"
          description="Середній термін доставки 2 дні"
          price="від 70₴"
          checked={selectedOption === "Courier"}
          onChange={() => handleOptionChange("Courier")}
        >
          {selectedOption === "Courier" && (
            <>
              <Input
                className="my-[10px] m-auto mini:w-[80%]"
                inputType="select"
                placeholder="Оберіть вулицю"
                options={streets.map((street) => ({
                  value: street.SettlementStreetRef,
                  label: street.Present,
                }))}
                {...form.getInputProps("street")}
                onSelect={handleSelect}
                scrollable
                bordered
              />

              <div className="flex flex-col m-auto gap-[15px] w-full mini:w-[80%] md:flex-row">
                <Input
                  inputType="input"
                  placeholder="Будинок"
                  type="text"
                  required={true}
                  bordered={true}
                  {...form.getInputProps("house")}
                  errorType="critical"
                  fullWidth
                  className="md:w-3/6"
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
                  className="md:w-3/6"
                />
              </div>

              {validationErrors && (
                <p className="text-darkBurgundy text-[14px] m-auto mt-[20px]">
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
          checked={selectedOption === "Postomat"}
          onChange={() => handleOptionChange("Postomat")}
        >
          {selectedOption === "Postomat" && (
            <>
              <Input
                className="my-[20px] m-auto mini:w-[80%]"
                inputType="select"
                placeholder="Оберіть поштомат"
                options={postomates.map((postomat) => ({
                  value: postomat.Ref,
                  label: postomat.Description,
                }))}
                {...form.getInputProps("postomat")}
                onSelect={handleSelect}
                scrollable
                bordered
              />

              {validationErrors && (
                <p className="text-darkBurgundy text-[14px] m-auto">
                  {validationErrors}
                </p>
              )}
            </>
          )}
        </Checkbox>

        {error && (
          <p className="text-[14px] text-darkBurgundy text-center">{error}</p>
        )}

        <Button
          text="Продовжити"
          className="w-[100%] mini:w-[80%]"
          type="button"
          onClick={handleContinue}
        />
      </FormComponent>
    </>
  );
};

export default ShippingSection;
