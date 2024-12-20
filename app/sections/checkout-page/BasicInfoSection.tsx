"use client";
import React, { FC, useEffect, useState } from "react";
import Input from "@/components/InputComponent";
import Button from "@/components/ButtonComponent";
import FormComponent from "@/components/FormComponent";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { getCities } from "@/services/ShippingService";
import { City } from "@/config/types";
import { getUser } from "@/services/AuthService";

const BasicInfoSection: FC<{
  isOpen: boolean;
  toggleOpen: () => void;
  onContinue: (isValid: boolean) => void;
  setBasicInfo: any;
  setSettlementRef: any;
  setCityRef: any;
}> = ({
  onContinue,
  setBasicInfo,
  toggleOpen,
  isOpen,
  setSettlementRef,
  setCityRef,
}) => {
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isStart, setIsStart] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      city: "",
      cityRef: "",
      settlementRef: "",
    },
    validate: {
      email: isEmail("Некоректний емейл"),
      firstName: hasLength({ min: 2 }, "Некоректне ім'я"),
      lastName: hasLength({ min: 2 }, "Некоректне прізвище"),
      phone: (value) =>
        /^\+38\d{10}$/.test(value) ? null : "Некоректний номер телефону",
      city: (value) => (value.trim() ? null : "Оберіть місто"),
    },
  });

  useEffect(() => {
    const tokenAccess = localStorage.getItem("accessToken");
    const localValues = localStorage.getItem("basicInfo");
    const result = localValues
      ? JSON.parse(localValues)
      : {
          email: "",
          firstName: "",
          lastName: "",
          phone: "",
          city: "",
          cityRef: "",
          settlementRef: "",
        };
    form.setValues(result);

    if (result.settlementRef) {
      setSettlementRef(result.settlementRef);
    }
    if (result.cityRef) {
      setCityRef(result.cityRef);
    }

    if (tokenAccess && tokenAccess != "") {
      const fetchUserData = async () => {
        try {
          const { user } = await getUser();
          form.setValues({
            email: user.email || "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            phone: user.phone || "",
          });
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      };
      fetchUserData();
    }
    setIsStart(true);
  }, []);

  useEffect(() => {
    if (form.values.phone && !form.values.phone.startsWith("+38")) {
      form.setFieldValue("phone", `+38${form.values.phone}`);
    }
    if (form.values.phone.length === 2) {
      form.setFieldValue("phone", "");
    }
  }, [form.values.phone]);

  useEffect(() => {
    if (
      form.values.city != "" ||
      form.values.email != "" ||
      form.values.firstName != "" ||
      form.values.lastName != "" ||
      form.values.phone != ""
    ) {
      localStorage.setItem("basicInfo", JSON.stringify(form.values));
    }
  }, [form.values]);

  const handleSelect = async (value: string) => {
    if (!value.trim()) {
      setCities([]);
      setError(null);
      return;
    }

    const selectedCity = cities.find(({ Ref }) => Ref === value);
    if (selectedCity) {
      setSettlementRef(selectedCity.Ref);
      setCityRef(selectedCity.DeliveryCity);
      form.setFieldValue("city", selectedCity.Present);
      form.setFieldValue("settlementRef", selectedCity.Ref);
      form.setFieldValue("cityRef", selectedCity.DeliveryCity);
      setCities([]);

    } else {
      const city = await getCities(value);
      if (city.length === 0) {
        setError("Населений пункт не знайдено!");
      } else {
        setError(null);
        setCities(city);
      }
    }
  };

  const handleContinue = () => {
    if (error) {
      onContinue(false);
      return;
    }
    const errors = form.validate();
    if (!errors.hasErrors) {
      onContinue(true);
      setBasicInfo(form.values);
    } else {
      onContinue(false);
    }
  };

  return (
    <div id="info">
      <FormComponent
        title="Інформація"
        className="items-center"
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        closeText={form.values.firstName + " " + form.values.lastName}
      >
        {isStart && (
          <>
            <Input
              className="mini:w-[80%] mb-[10px]"
              inputType="select"
              bordered
              placeholder="Оберіть населений пункт"
              options={cities.map((city) => ({
                value: city.Ref,
                label: city.Present,
              }))}
              {...form.getInputProps("city")}
              onSelect={handleSelect}
              errorType="critical"
              scrollable
            />
            {error && <p className="text-darkBurgundy text-[14px]">{error}</p>}
          </>
        )}
        <p className="mini:w-[80%] md:w-[85%] lg:w-[91%] mx-[25px] font-semibold text-silver">
          Дані отримувача
        </p>

        <Input
          inputType="input"
          placeholder="Емейл"
          type="email"
          required={true}
          bordered={true}
          {...form.getInputProps("email")}
          errorType="critical"
          fullWidth
          className="mini:w-[80%]"
        />

        <Input
          inputType="input"
          placeholder="Ім'я"
          required={true}
          bordered={true}
          {...form.getInputProps("firstName")}
          errorType="critical"
          fullWidth
          className="mini:w-[80%]"
        />

        <Input
          inputType="input"
          placeholder="Прізвище"
          required={true}
          bordered={true}
          {...form.getInputProps("lastName")}
          errorType="critical"
          fullWidth
          className="mini:w-[80%]"
        />

        <Input
          inputType="input"
          placeholder="Номер телефону"
          required={true}
          bordered={true}
          {...form.getInputProps("phone")}
          errorType="critical"
          fullWidth
          className="mini:w-[80%]"
        />

        <Button
          text="Продовжити"
          className="mini:w-[80%] w-[100%]"
          type="button"
          onClick={handleContinue}
        />
      </FormComponent>
    </div>
  );
};

export default BasicInfoSection;
