"use client";
import React, { FC, useEffect, useState } from "react";
import Input from "@/components/InputComponent";
import Button from "@/components/ButtonComponent";
import FormComponent from "@/components/FormComponent";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { getCities } from "@/services/ShippingService";
import { City } from "@/config/types";

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

  // useEffect(() => {
  //   const localValues = localStorage.getItem("Basic Info");
  
  //   if (localValues) {
  //     form.setValues(JSON.parse(localValues));
  //   }
  // }, []);
  
  const handleInputChange = async ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    form.setFieldValue("city", value);

    if (!value.trim()) {
      setCities([]);
      setError(null);
      return;
    }

    const city = await getCities(value);
    if (city.length === 0) {
      setError("Населений пункт не знайдено!");
    } else {
      setError(null);
    }
    setCities(city);
  };

  const handleSelectChange = (value: string) => {
    const selectedCity = cities.find(({ Ref }) => Ref === value);
    if (selectedCity) {
      form.setFieldValue("city", selectedCity.Present);
      setSettlementRef(selectedCity.Ref);
      setCityRef(selectedCity.DeliveryCity);
      setCities([]);
    }
  };

  const form = useForm({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      city: "",
    },
    validate: {
      email: isEmail("Invalid email"),
      firstName: hasLength({ min: 2 }, "Must be at least 2 characters"),
      lastName: hasLength({ min: 2 }, "Must be at least 2 characters"),
      phone: (value) =>
        /^\d{10}$/.test(value) ? null : "Invalid phone number",
      city: (value) => (value.trim() ? null : "City is required"),
    },
  });

  const handleContinue = () => {
    const errors = form.validate();
    if (!errors.hasErrors) {
      onContinue(true);
      localStorage.setItem("Basic Info", JSON.stringify(form.values));
      setBasicInfo(form.values);
    } else {
      onContinue(false);
    }
  };

  return (
    <section>
      <FormComponent
        title="Basic Info"
        className="items-center"
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        closeText={form.values.firstName + " " + form.values.lastName}
      >
        <Input
          inputType="input"
          placeholder="Email"
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
          placeholder="Fist Name"
          required={true}
          bordered={true}
          {...form.getInputProps("firstName")}
          errorType="critical"
          fullWidth
          className="mini:w-[80%]"
        />

        <Input
          inputType="input"
          placeholder="Last Name"
          required={true}
          bordered={true}
          {...form.getInputProps("lastName")}
          errorType="critical"
          fullWidth
          className="mini:w-[80%]"
        />

        <Input
          inputType="input"
          placeholder="Phone Number"
          required={true}
          bordered={true}
          {...form.getInputProps("phone")}
          errorType="critical"
          fullWidth
          className="mini:w-[80%]"
        />

        <Input
          inputType="input"
          placeholder="Населений пункт"
          required={true}
          bordered={true}
          {...form.getInputProps("city")}
          onChange={handleInputChange}
          errorType="critical"
          fullWidth
          className="mini:w-[80%] mb-0"
        />

        {error && <p className="text-darkBurgundy text-[14px]">{error}</p>}

        {cities.length > 0 && (
          <Input
            className="mini:w-[80%]"
            inputType="select"
            placeholder="Оберіть населений пункт"
            options={cities.map((city) => ({
              value: city.Ref,
              label: city.Present,
            }))}
            onSelect={handleSelectChange}
            scrollable
          />
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

export default BasicInfoSection;
