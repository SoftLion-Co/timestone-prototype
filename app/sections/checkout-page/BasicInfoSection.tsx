"use client";
import React, { FC, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/config/config";
import Input from "@/components/InputComponent";
import Button from "@/components/ButtonComponent";
import FormComponent from "@/components/FormComponent";
import { hasLength, isEmail, useForm } from "@mantine/form";

interface City {
  Ref: string;
  Present: string;
  DeliveryCity: string;
}

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

  const handleInputChange = async ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    form.setFieldValue("city", value);

    if (!value.trim()) {
      return setCities([]);
    }

    const { data } = await axios.get(`${BASE_URL}/cities`, {
      params: { query: value },
    });
    setCities(data?.[0]?.Addresses || []);
  };

  const handleSelectChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    const selectedCity = cities.find(({ Ref }) => Ref === value);
    if (selectedCity) {
      form.setFieldValue("city", selectedCity.Present);
      setSettlementRef(selectedCity.Ref);
      setCityRef(selectedCity.DeliveryCity);
      setCities([]);
    }
    // console.log(selectedCity?.Present);
    // console.log(selectedCity?.Ref);
    // console.log(selectedCity?.DeliveryCity);
  };
  const form = useForm({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      city: "",
      // zipCode: "",
    },
    validate: {
      email: isEmail("Invalid email"),
      firstName: hasLength({ min: 2 }, "Must be at least 2 characters"),
      lastName: hasLength({ min: 2 }, "Must be at least 2 characters"),
      phone: (value) =>
        /^\d{10}$/.test(value) ? null : "Invalid phone number",
      city: (value) => (value.trim() ? null : "City is required"),
      // zipCode: (value) => (/^\d{5}$/.test(value) ? null : "Invalid"),
    },
  });

  const handleContinue = () => {
    const errors = form.validate();
    if (!errors.hasErrors) {
      onContinue(true);
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
          className="mini:w-[80%]"
        />

        {cities.length > 0 && (
          <select onChange={handleSelectChange}>
            {cities.map((city) => (
              <option key={city.Ref} value={city.Ref}>
                {city.Present}
              </option>
            ))}
          </select>
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

// const options = [
//   { value: "UA", label: "Ukraine" },
//   { value: "PL", label: "Poland" },
//   { value: "USA", label: "USA" },
// ];

// country: "",

//country: (value) => (value ? null : "Please select a country"),

{
  /* <Input
          inputType="select"
          placeholder="Country"
          options={options}
          className="mini:w-[80%]"
          required={true}
          bordered={true}
          {...form.getInputProps("country")}
          onSelect={(value) => form.setFieldValue("country", value)}
          errorType="critical"
        /> 

          <Input
            inputType="input"
            placeholder="Zip Code"
            required={true}
            bordered={true}
            {...form.getInputProps("zipCode")}
            errorType="critical"
            fullWidth
            className="mini:w-[40%]"
        </div>
        /> 
  }
  */
}
