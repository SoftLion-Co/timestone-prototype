"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ButtonComponent";
import Input from "@/components/InputComponent";
import ModalWindowComponent from "@/components/checkout-page/OrderingComponent";
import LoaderComponent from "@/components/LoaderComponent";
import { registrateNewUser } from "@/services/AuthService";
import { addNewReceiver } from "@/services/SubscribeService";
import { useForm } from "@mantine/form";
import { isEmail, hasLength } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
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
  const MAX_ATTEMPTS = 5;
  const [attempts, setAttempts] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState<string | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const dayOptions = getDaysInMonth(month);
  const [visible, { toggle }] = useDisclosure(false);

  const registrationForm = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      month: "",
      date: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      receiveUpdates: false,
      registrationMessage: "",
    },
    validate: {
      firstName: hasLength({ min: 2 }, "Must be at least 2 characters"),
      lastName: hasLength({ min: 2 }, "Must be at least 2 characters"),
      email: isEmail("Invalid email"),
      confirmEmail: (value, values) =>
        value !== values.email ? "Emails must match" : null,
      password: (value) => {
        if (/\s/.test(value)) return "Password must not contain spaces";
        if (/[\u0400-\u04FF]/.test(value))
          return "Cyrillic characters are not allowed";
        if (value.length < 6) return "Minimum 6 characters required";
        if (value.length > 20) return "Maximum 20 characters allowed";
        if (!/[a-z]/.test(value))
          return "Password must contain lowercase letter";
        if (!/[A-Z]/.test(value))
          return "Password must contain uppercase letter";
        if (!/[0-9]/.test(value)) return "Password must contain digit";
        return null;
      },
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords must match" : null,
      phone: (value) =>
        /^\+38\d{10}$/.test(value) ? null : "Invalid phone number",
    },
  });

  const handleCreateAccount = async () => {
    const errors = registrationForm.validate();
    if (!errors.hasErrors) {
      if (attempts < MAX_ATTEMPTS) {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        localStorage.setItem(
          "inputRegistrationAttempts",
          newAttempts.toString()
        );
        setIsLoading(true);
        const address = "";
        const { firstName, lastName, email, phone, password, receiveUpdates } =
          registrationForm.values;
        const name = `${firstName} ${lastName}`;
        if (receiveUpdates === true) {
          await addNewReceiver(name, email);
        }
        const dateOfBirth = `${registrationForm.values.month}, ${registrationForm.values.date}`;
        const response = await registrateNewUser(
          firstName,
          lastName,
          email,
          phone,
          dateOfBirth,
          password,
          address
        );
        setIsLoading(false);
        if (response === "created") {
          setIsModalVisible(true);
          registrationForm.reset();
        } else if (response == "A user with this phone number already exists") {
          setRegistrationMessage("This phone already exist. Try another.");
        } else if (
          response == "A user with this email address already exists"
        ) {
          setRegistrationMessage("This email already exist. Try another.");
        } else if (response == "User not activated") {
          setRegistrationMessage("Your acc not activated. Check email box.");
        } else {
          setRegistrationMessage("Problems wih server");
        }
      }
    }
  };

  useEffect(() => {
    const savedAttempts = localStorage.getItem("inputRegistrationAttempts");
    if (savedAttempts) {
      const parsedAttempts = Number(savedAttempts);
      setAttempts(parsedAttempts);
      if (parsedAttempts >= MAX_ATTEMPTS) {
        setIsDisabled(true);
      }
    }
    if (
      registrationForm.values.phone &&
      !registrationForm.values.phone.startsWith("+38")
    ) {
      registrationForm.setFieldValue(
        "phone",
        `+38${registrationForm.values.phone}`
      );
    }
    if (registrationForm.values.phone.length === 2) {
      registrationForm.setFieldValue("phone", "");
    }
  }, [registrationForm.values.phone]);

  return (
    <>
      {isLoading && <LoaderComponent />}
      {isModalVisible && (
        <ModalWindowComponent
          title="Almost finished"
          message="Please, check your email to confirm registration."
        />
      )}

      <div className="text-center mb-[48px]">
        <h2 className="text-[24px] md:text-[32px] lg:text-[48px] lg:mt-[20px] text-darkMaroon font-bold mb-[20px]">
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
          {...registrationForm.getInputProps("firstName")}
          errorType="critical"
          required={true}
        />

        <Input
          inputType="input"
          placeholder="Last Name"
          type="text"
          bordered={true}
          fullWidth={true}
          {...registrationForm.getInputProps("lastName")}
          errorType="critical"
          required={true}
        />

        <p className="text-start text-silver mt-[6px]">Date of birth</p>
        <div className="flex flex-col lg:flex-row gap-[10px] text-left">
          <Input
            placeholder="Місяць"
            inputType="select"
            className="!w-full"
            bordered={true}
            options={months}
            value={month}
            scrollable={true}
            onSelect={(value) => {
              setMonth(value);
              registrationForm.setFieldValue("moth", value);
            }}
          />

          <Input
            placeholder="Дата"
            inputType="select"
            className="!w-full"
            bordered={true}
            options={dayOptions}
            value={day}
            scrollable={true}
            onSelect={(value) => {
              setDay(value);
              registrationForm.setFieldValue("date", value);
            }}
          />
        </div>
        <Input
          inputType="input"
          placeholder="Phone Number"
          type="text"
          bordered={true}
          fullWidth={true}
          {...registrationForm.getInputProps("phone")}
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
              {...registrationForm.getInputProps("email")}
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
              {...registrationForm.getInputProps("confirmEmail")}
              errorType="critical"
              required={true}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-[10px]">
          <div>
            <Input
              inputType="password"
              placeholder="Password"
              type="password"
              visible={visible}
              onVisibilityChange={toggle}
              fullWidth={true}
              bordered={true}
              className="lg:min-w-[314px]"
              {...registrationForm.getInputProps("password")}
              errorType="critical"
              required={true}
            />
          </div>

          <div>
            <Input
              inputType="password"
              placeholder="Confirm Password"
              type="password"
              visible={visible}
              onVisibilityChange={toggle}
              bordered={true}
              fullWidth={true}
              className="lg:min-w-[314px]"
              {...registrationForm.getInputProps("confirmPassword")}
              errorType="critical"
              required={true}
            />
          </div>
        </div>

        <div className="flex text-silver gap-[10px] mt-[10px] text-left">
          <input
            type="checkbox"
            id="sign-up-update"
            checked={registrationForm.values.receiveUpdates}
            onChange={(e) =>
              registrationForm.setFieldValue("receiveUpdates", e.target.checked)
            }
            className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm cursor-pointer checked:bg-darkBurgundy checked:border-darkBurgundy checked:after:content-['✔'] checked:after:flex checked:after:justify-center checked:after:items-center checked:after:w-full checked:after:h-full checked:after:text-white focus:outline-none focus:ring-0"
          />
          <label htmlFor="sign-up-update" className="cursor-pointer">
            Sign-up to receive the latest updates and promotions
          </label>
        </div>

        <div className=" mt-[16px]">
          {isDisabled ? (
            <p className="text-red-500">Ви вичерпали всі спроби!</p>
          ) : (
            <p>Залишилось спроб: {MAX_ATTEMPTS - attempts}</p>
          )}
        </div>

        <div className="mt-[16px]">
          <div>
            {registrationMessage && (
              <span
                className={`block text-center  text-[16px] text-darkBurgundy`}
              >
                {registrationMessage}
              </span>
            )}
          </div>

          <Button
            text="Create Account"
            type="button"
            className="!w-[208px] mx-auto mt-[8px] mb-[24px] lg:mb-[56px]"
            onClick={() => {
              handleCreateAccount();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            disabled={isDisabled}
          />
        </div>
      </div>
    </>
  );
};

export default RegistrationFormSection;
