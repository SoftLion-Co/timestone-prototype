"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ButtonComponent";
import Input from "@/components/InputComponent";
import { registrateNewUser } from "@/services/AuthService";
import ModalWindowComponent from "@/components/checkout-page/OrderingComponent";
import { useForm } from "@mantine/form";
import { isEmail, hasLength } from "@mantine/form";

const months = [
  { value: "january", label: "January" },
  { value: "february", label: "February" },
  { value: "march", label: "March" },
  { value: "april", label: "April" },
  { value: "may", label: "May" },
  { value: "june", label: "June" },
  { value: "july", label: "July" },
  { value: "august", label: "August" },
  { value: "september", label: "September" },
  { value: "october", label: "October" },
  { value: "november", label: "November" },
  { value: "december", label: "December" },
];

const getDaysInMonth = (month: string): { value: string; label: string }[] => {
  const daysInMonthMap: { [key: string]: number } = {
    january: 31,
    february: 29,
    march: 31,
    april: 30,
    may: 31,
    june: 30,
    july: 31,
    august: 31,
    september: 30,
    october: 31,
    november: 30,
    december: 31,
  };

  const daysInMonth = daysInMonthMap[month] || 31;

  return Array.from({ length: daysInMonth }, (_, i) => ({
    label: String(i + 1).padStart(2, "0"),
    value: String(i + 1),
  }));
};

const RegistrationFormSection = () => {
  const [registrationMessage, setRegistrationMessage] = useState<string | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [month, setMonth] = useState("january");
  const [day, setDay] = useState("01");
  const dayOptions = getDaysInMonth(month);

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      receiveUpdates: false,
    },
    validate: {
      firstName: hasLength({ min: 2 }, "Must be at least 2 characters"),
      lastName: hasLength({ min: 2 }, "Must be at least 2 characters"),
      email: isEmail("Invalid email"),
      confirmEmail: (value, values) =>
        value !== values.email ? "Emails must match" : null,
      password: hasLength({ min: 6 }, "Must be at least 6 characters"),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords must match" : null,
      phone: (value) =>
        /^\d{10}$/.test(value) ? null : "Invalid phone number",
    },
  });

  const handleCreateAccount = async () => {
    const errors = form.validate();
    if (!errors.hasErrors) {
      const { firstName, lastName, email, phone, password, receiveUpdates } =
        form.values;
      const dateOfBirth = `${month}, ${day}`;
      console.log(
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        password, 
        receiveUpdates
      );
      const response = await registrateNewUser(
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        password,
        receiveUpdates
      );

      if (response === "created") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsModalVisible(true);
        form.reset();
      } else if (response === "unactivated") {
        setRegistrationMessage("Your account is not activated");
      } else if (response === "phone") {
        setRegistrationMessage("Phone already in use");
      } else if (response === "email") {
        setRegistrationMessage("Email already in use");
      } else{
        setRegistrationMessage("Error during registration");
      }
    }
  };

  return (
    <>
      {isModalVisible && (
        <ModalWindowComponent
          title="Almost finished"
          message="Please, check your email to confirm registration."
        />
      )}
      <div className="text-center mb-[28px]">
        <h2 className="text-[24px] md:text-[32px] lg:text-[48px] text-darkMaroon font-bold mb-[20px]">
          NEW TO TIMESTONE ?
        </h2>
        <p className="text-silver">Create a new account</p>
      </div>

      <div className="flex flex-col gap-[10px]">
        <Input
          inputType="input"
          placeholder="First Name"
          type="text"
          bordered={true}
          fullWidth={true}
          {...form.getInputProps("firstName")}
          errorType="critical"
          required={true}
        />

        <Input
          inputType="input"
          placeholder="Last Name"
          type="text"
          bordered={true}
          fullWidth={true}
          {...form.getInputProps("lastName")}
          errorType="critical"
          required={true}
        />

        <p className="text-start text-silver mt-[6px]">Date of birth</p>
        <div className="flex flex-col lg:flex-row gap-[10px] text-left">
          <Input
            placeholder="January"
            inputType="select"
            className="!w-full"
            bordered={true}
            options={months}
            value={month}
            scrollable={true}
            onSelect={(value) => setMonth(value)}
          />

          <Input
            placeholder="01"
            inputType="select"
            className="!w-full"
            bordered={true}
            options={dayOptions}
            value={day}
            scrollable={true}
            onSelect={(value) => setDay(value)}
          />
        </div>
        <Input
          inputType="input"
          placeholder="Phone Number"
          type="text"
          bordered={true}
          fullWidth={true}
          {...form.getInputProps("phone")}
          errorType="critical"
          required={true}
        />

        <div className="flex flex-col lg:flex-row gap-[10px]">
          <div>
            <Input
              inputType="input"
              placeholder="Email"
              type="email"
              fullWidth={true}
              className="lg:min-w-[314px]"
              bordered={true}
              {...form.getInputProps("email")}
              errorType="critical"
              required={true}
            />
          </div>

          <div>
            <Input
              inputType="input"
              placeholder="Confirm Email"
              type="email"
              fullWidth={true}
              className="lg:min-w-[314px]"
              bordered={true}
              {...form.getInputProps("confirmEmail")}
              errorType="critical"
              required={true}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-[10px]">
          <div>
            <Input
              inputType="input"
              placeholder="Password"
              type="password"
              fullWidth={true}
              bordered={true}
              className="lg:min-w-[314px]"
              {...form.getInputProps("password")}
              errorType="critical"
              required={true}
            />
          </div>

          <div>
            <Input
              inputType="input"
              placeholder="Confirm Password"
              type="password"
              bordered={true}
              fullWidth={true}
              className="lg:min-w-[314px]"
              {...form.getInputProps("confirmPassword")}
              errorType="critical"
              required={true}
            />
          </div>
        </div>

        <div className="flex text-silver gap-[10px] mt-[10px] text-left">
          <input
            type="checkbox"
            checked={form.values.receiveUpdates}
            onChange={(e) =>
              form.setFieldValue("receiveUpdates", e.target.checked)
            }
            className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-darkBurgundy checked:border-darkBurgundy checked:after:content-['✔'] checked:after:flex checked:after:justify-center checked:after:items-center checked:after:w-full checked:after:h-full checked:after:text-white focus:outline-none focus:ring-0"
          />
          <label>Sign-up to receive the latest updates and promotions</label>
        </div>
        <div>
          {registrationMessage && (
            <span className={`block text-center text-darkBurgundy`}>
              {registrationMessage}
            </span>
          )}
        </div>

        <Button
          text="Create Account"
          type="button"
          className="!w-[208px] mx-auto mt-[38px] mb-[24px] lg:mb-[56px]"
          onClick={handleCreateAccount}
        />
      </div>
    </>
  );
};

export default RegistrationFormSection;
