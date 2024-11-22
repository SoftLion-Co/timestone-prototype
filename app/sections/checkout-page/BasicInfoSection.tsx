"use client";
import React, { FC} from "react";
import Input from "@/components/InputComponent";
import Button from "@/components/ButtonComponent";
import FormComponent from "@/components/FormComponent";
import { hasLength, isEmail, useForm } from "@mantine/form";

const BasicInfoSection: FC<{ onContinue: (isValid: boolean) => void }> = ({
  onContinue,
}) => {
  const form = useForm({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      zipCode: "",
    },
    validate: {
      email: isEmail("Invalid email"),
      firstName: hasLength({ min: 2 }, "Must be at least 2 characters"),
      lastName: hasLength({ min: 2 }, "Must be at least 2 characters"),
      phone: (value) =>
        /^\d{10}$/.test(value) ? null : "Invalid phone number",
      address1: hasLength({ min: 2 }, "Must be at least 2 characters"),
      address2: hasLength({ min: 2 }, "Must be at least 2 characters"),
      city: hasLength({ min: 2 }, "Invalid"),
      zipCode: (value) => (/^\d{5}$/.test(value) ? null : "Invalid"),
    },
  });

  const handleContinue = () => {
    const errors = form.validate();
    if (!errors.hasErrors) {
      onContinue(true);
    } else {
      console.log("Validation errors:", errors.errors);
      onContinue(false);
    }
  };

  return (
    <section>
      <FormComponent title="Basic Info" className="items-center">
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
          placeholder="Address 1"
          required={true}
          bordered={true}
          {...form.getInputProps("address1")}
          errorType="critical"
          fullWidth
          className="mini:w-[80%]"
        />

        <Input
          inputType="input"
          placeholder="Address 2"
          required={true}
          bordered={true}
          {...form.getInputProps("address2")}
          errorType="critical"
          fullWidth
          className="mini:w-[80%]"
        />

        <div className="flex gap-[10px] items-center mini:w-[80%]">
          <Input
            inputType="input"
            placeholder="City"
            required={true}
            bordered={true}
            {...form.getInputProps("city")}
            errorType="critical"
            fullWidth
            className="mini:w-[60%]"
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
          />
        </div>

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
        /> */
}
