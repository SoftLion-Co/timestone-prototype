"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ButtonComponent";
import Input from "@/components/InputComponent";
import Background from "@/images/authorization-page/bg-geomitrical.svg";
import Image from "next/image";
import { loginUser, registrateNewUser } from "@/services/AuthService";
import { m } from "framer-motion";

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

const AuthorizationSection = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [dayOptions, setDayOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [day, setDay] = useState<string>("");
  const [receiveUpdates, setReceiveUpdates] = useState<boolean>(false);
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [confirmPassword, setConfirmPasswor] = useState<string>("");

  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [firstNameMessage, setFirstNameMessage] = useState<string | null>(null);
  const [lastNameMessage, setLastNameMessage] = useState<string | null>(null);
  const [phoneMessage, setPhoneMessage] = useState<string | null>(null);
  const [confirmEmailMessage, setConfirmEmailMessage] = useState<string | null>(
    null
  );
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState<
    string | null
  >(null);
  const [messageType, setMessageType] = useState<
    | "success"
    | "emailError"
    | "passwordError"
    | "firstNameError"
    | "lastNameError"
    | "phoneError"
    | "confirmEmailError"
    | "confirmPasswordError"
    | null
  >(null);

  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setMonth("");
    setDay("");
    setPhone("");
    setEmail("");
    setPassword("");
    setConfirmEmail("");
    setConfirmPasswor("");
    setReceiveUpdates(false);
  };

  const handleCreateAccount = () => {
    if (checkValidationRegistration()) {
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        month: month,
        day: day,
        phone: phone,
        email: email,
        password: password,
        receiveUpdates: receiveUpdates,
      };
      registrateNewUser(
        firstName,
        lastName,
        month,
        day,
        phone,
        email,
        password,
        receiveUpdates
      );
      console.log(`New user added`, newUser);
      resetForm();
    }
  };

  const handleSignUp = () => {
    if (checkValidationLogin()) {
      const newUser = {
        email: email,
        password: password,
      };
      loginUser(newUser.email, newUser.password);
      console.log(`User logged in`, newUser);
      resetForm();
    }
  };

  const handleSignUpFacebook = () => {
    console.log("facebook");
  };

  const handleSignUpGoogle = () => {
    console.log("google");
  };

  useEffect(() => {
    const updatedDays = getDaysInMonth(month);
    setDayOptions(updatedDays);
  }, [month]);

  const validateEmail = (email: string) => {
    const rgExp =
      /^[\w]+[\w.+-]*@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/;
    return rgExp.test(String(email).toLowerCase());
  };

  const validatePhoneNumber = (phone: string) => {
    const rgExp = /^\d{10}$/;
    return rgExp.test(phone);
  };

  const clearErrorFields = () => {
    setEmailMessage(null);
    setPasswordMessage(null);
    setFirstNameMessage(null);
    setLastNameMessage(null);
    setPhoneMessage(null);
    setConfirmEmailMessage(null);
    setConfirmPasswordMessage(null);
  };

  const checkValidationLogin = () => {
    clearErrorFields();
    let isValid = true;
    if (!email) {
      setEmailMessage("Please enter an email");
      setMessageType("emailError");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailMessage("Please enter a valid email");
      setMessageType("emailError");
      isValid = false;
    }

    if (!password) {
      setPasswordMessage("Please enter a password");
      setMessageType("passwordError");
      isValid = false;
    }

    if (isValid) {
      setMessageType("success");
      setEmailMessage(null);
      setPasswordMessage(null);
    }
    return isValid;
  };

  const checkValidationRegistration = () => {
    let isValid = true;
    clearErrorFields();

    if (!firstName) {
      setFirstNameMessage("Please enter your first name");
      setMessageType("firstNameError");
      isValid = false;
    }

    if (!lastName) {
      setLastNameMessage("Please enter your last name");
      setMessageType("lastNameError");
      isValid = false;
    }

    if (!phone) {
      setPhoneMessage("Please enter your phone number");
      setMessageType("phoneError");
      isValid = false;
    } else if (!validatePhoneNumber(phone)) {
      setPhoneMessage("Please enter a valid phone number");
      setMessageType("phoneError");
      isValid = false;
    }

    if (!email) {
      setEmailMessage("Please enter an email");
      setMessageType("emailError");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailMessage("Please enter a valid email");
      setMessageType("emailError");
      isValid = false;
    }

    if (!confirmEmail) {
      setConfirmEmailMessage("Please confirm your email");
      setMessageType("confirmEmailError");
      isValid = false;
    } else if (confirmEmail !== email) {
      setConfirmEmailMessage("Emails do not match");
      setMessageType("confirmEmailError");
      isValid = false;
    }

    if (!password) {
      setPasswordMessage("Please enter a password");
      setMessageType("passwordError");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordMessage("Please confirm your password");
      setMessageType("confirmPasswordError");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordMessage("Passwords do not match");
      setMessageType("confirmPasswordError");
      isValid = false;
    }

    if (isValid) {
      setMessageType("success");
      setEmailMessage(null);
      setPasswordMessage(null);
    }

    return isValid;
  };

  return (
    <section className=" relative flex justify-center items-center font-poppins">
      <div className="bg-darkMaroon h-[500px] w-full absolute bottom-0 z-0">
        <Image
          src={Background}
          alt="Background"
          layout="fill"
          objectFit="none"
        />
      </div>

      <form className="flex flex-col bg-snow w-[360px] lg:w-[860px] ring-[20px] ring-snow text-center border-[2px] border-gray-300 rounded-[10px] z-10 px-[20px] lg:px-[110px] mb-[174px]">
        <div className="mb-[28px] lg:flex lg:space-between mt-[24px] lg:mt-[60px] items-center">
          {["Login", "Create Account"].map((title, index) => {
            const isActive = isLoginPage ? index === 0 : index === 1;
            return (
              <div
                key={title}
                className="w-full text-center relative mb-[24px] lg:mb-0"
              >
                <h2
                  className={`text-[20px] cursor-pointer font-bold pb-[8px] ${
                    isActive ? "text-onyx" : "text-silver"
                  }`}
                  onClick={() => {
                    clearErrorFields();
                    resetForm();
                    setIsLoginPage(index === 0);
                  }}
                >
                  {title}
                </h2>
                <div
                  className={`w-full absolute left-0 ${
                    isActive
                      ? "bg-darkMaroon h-[6px]"
                      : "bg-silver h-[2px] -bottom-[4px]"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {isLoginPage ? (
          <>
            <div className="text-center mb-[28px]">
              <h2 className="text-[24px] text-darkMaroon font-bold mb-[20px]">
                WELCOME BACK
              </h2>
              <p className="leading-[2] text-silver">
                Sign into your existing account to earn rewards, check existing
                orders and more
              </p>
            </div>

            <Input
              inputType="input"
              placeholder="Email"
              type="email"
              fullWidth={true}
              className="!w-full"
              value={email}
              bordered={true}
              onChange={(e) => setEmail(e.target.value)}
            />

            {emailMessage && (
              <span
                className={`block text-left ${
                  messageType === "emailError" ? "text-onyx" : "text-none"
                }`}
              >
                {emailMessage}
              </span>
            )}

            <Input
              inputType="input"
              placeholder="Password"
              type="password"
              bordered={true}
              fullWidth={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="!w-full mt-[10px]"
            />

            {passwordMessage && (
              <span className={`block text-left text-onyx`}>
                {passwordMessage}
              </span>
            )}

            <div className="mt-[20px] flex justify-between text-silver">
              <div className="flex gap-[10px]">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="w-[20px] h-[20px] text-darkMaroon bg-snow border-2 border-silver rounded focus:ring-darkMaroon"
                />
                <label>Remember me</label>
              </div>
            </div>

            <Button
              text="Sign In"
              type="button"
              className="!w-[208px] mx-auto mt-[38px] mb-[46px]"
              onClick={handleSignUp}
            />

            {/* <p className="mt-[38px] font-bold text-[20px]">Express sing in</p> */}

            {/* <div className="mt-[18px] mb-[46px] flex flex-col lg:flex-row gap-[10px] text-[20px] font-bold">
              <Button
                text="Sign in"
                type="button"
                className="!w-[312px] h-[56px] mx-auto"
                icon="facebook"
                onClick={handleSignUpFacebook}
              />
              <Button
                text="Sign In"
                type="button"
                className="!w-[312px] h-[56px] mx-auto"
                icon="google"
                onClick={handleSignUpGoogle}
              />
            </div> */}
          </>
        ) : (
          <>
            <div className="text-center mb-[28px]">
              <h2 className="text-[24px] text-darkMaroon max-w-[180px] mx-auto font-bold mb-[20px]">
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
                className="!w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {firstNameMessage && (
                <span className={`block text-left text-onyx -mt-[8px]`}>
                  {firstNameMessage}
                </span>
              )}
              <Input
                inputType="input"
                placeholder="Last Name"
                type="text"
                bordered={true}
                fullWidth={true}
                className="!w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {lastNameMessage && (
                <span className={`block text-left text-onyx -mt-[8px]`}>
                  {lastNameMessage}
                </span>
              )}
              <p className="text-start text-silver mt-[6px]">Date of birth</p>
              <div className="flex flex-col lg:flex-row gap-[10px] text-left">
                <Input
                  placeholder="January"
                  inputType="select"
                  bordered={true}
                  options={months}
                  value={month}
                  scrollable={true}
                  onSelect={(value) => setMonth(value)}
                />

                <Input
                  placeholder="01"
                  inputType="select"
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
                value={phone}
                fullWidth={true}
                className="!w-full"
                onChange={(e) => setPhone(e.target.value)}
              />
              {phoneMessage && (
                <span className={`block text-left text-onyx -mt-[8px]`}>
                  {phoneMessage}
                </span>
              )}

              <div className="flex flex-col lg:flex-row gap-[10px]">
                <div>
                  <Input
                    inputType="input"
                    className="mini:w-[320px]"
                    placeholder="Email"
                    type="email"
                    bordered={true}
                    value={email}
                    fullWidth={true}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailMessage && (
                    <span className={`block text-left text-onyx`}>
                      {emailMessage}
                    </span>
                  )}
                </div>

                <div>
                  {" "}
                  <Input
                    inputType="input"
                    placeholder="Confirm Email"
                    type="email"
                    className="mini:w-[320px]"
                    bordered={true}
                    value={confirmEmail}
                    fullWidth={true}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                  />
                  {confirmEmailMessage && (
                    <span className={`block text-left text-onyx`}>
                      {confirmEmailMessage}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-[10px]">
                <div>
                  <Input
                    inputType="input"
                    className="mini:w-[320px]"
                    placeholder="Password"
                    type="password"
                    bordered={true}
                    value={password}
                    fullWidth={true}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordMessage && (
                    <span className={`block text-left text-onyx`}>
                      {passwordMessage}
                    </span>
                  )}
                </div>

                <div>
                  <Input
                    inputType="input"
                    placeholder="Confirm Password"
                    type="password"
                    bordered={true}
                    value={confirmPassword}
                    fullWidth={true}
                    className="mini:w-[320px]"
                    onChange={(e) => setConfirmPasswor(e.target.value)}
                  />
                  {confirmPasswordMessage && (
                    <span className={`block text-left text-onyx`}>
                      {confirmPasswordMessage}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex text-silver gap-[10px] mt-[10px] text-left">
                <input
                  type="checkbox"
                  checked={receiveUpdates}
                  onChange={(e) => setReceiveUpdates(e.target.checked)}
                  className="w-[24px] h-[24px]"
                />
                <label>
                  Sign-up to receive the latest updates and promotions
                </label>
              </div>

              <Button
                text="Create Account"
                type="button"
                className="!w-[208px] mx-auto mt-[38px] mb-[24px] lg:mb-[56px]"
                onClick={handleCreateAccount}
              />
            </div>
          </>
        )}
      </form>
    </section>
  );
};

export default AuthorizationSection;
