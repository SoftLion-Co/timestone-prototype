"use client";
import React, { useState } from "react";
import Button from "@/components/ButtonComponent";
import Input from "@/components/InputComponent";
import Background from "@/images/authorization-page/bg-geomitrical.svg";
import Image from "next/image";

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

const LoginSection = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [confirmPasswor, setConfirmPasswor] = useState<string>("");

  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<
    "success" | "emailError" | "passwordError" | null
  >(null);
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);

  const validateEmail = (email: string) => {
    const rgExp =
      /^[\w]+[\w.+-]*@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/;
    return rgExp.test(String(email).toLowerCase());
  };

  const checkValidation = () => {
    setEmailMessage(null);
    setPasswordMessage(null);
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
      setEmailMessage("Success input");
      setPasswordMessage(null);
    }
    setTimeout(() => {
      setEmailMessage(null);
      setPasswordMessage(null);
      setMessageType(null);
    }, 3000);
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

      <form className="flex flex-col bg-snow w-[360px] lg:min-w-[860px] ring-[20px] ring-snow text-center border-[2px] border-silver rounded-[10px] z-10 px-[20px] lg:px-[110px] mb-[174px]">
        {/* <div className="mb-[28px] lg:flex lg:space-between mt-[24px] lg:mt-[60px] items-center"> */}
        {/* <div className="w-full text-center relative mb-[24px] lg:mb-0">
            <h2
              className={text-[20px] cursor-pointer font-bold pb-[8px] ${
                isLoginPage ? "text-onyx" : "text-silver"
              }}
              onClick={() => setIsLoginPage(true)}
            >
              Login
            </h2>
            <div
              className={w-full absolute left-0  ${
                isLoginPage
                  ? "bg-darkMaroon h-[6px] "
                  : "bg-silver h-[2px] -bottom-[4px] "
              }}
            />
          </div>

          <div className="w-full text-center relative">
            <h2
              className={text-[20px] cursor-pointer font-bold pb-[8px] ${
                isLoginPage ? "text-silver" : "text-onyx"
              }}
              onClick={() => setIsLoginPage(false)}
            >
              Create Account
            </h2>
            <div
              className={w-full absolute left-0 ${
                !isLoginPage
                  ? "bg-darkMaroon h-[6px] "
                  : "bg-silver h-[2px] -bottom-[4px]"
              }}
            />
          </div>
        </div> */}

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
                  onClick={() => setIsLoginPage(index === 0)}
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
              placeholder="Email"
              type="email"
              className="!w-full focus:outline-none focus:ring-1 focus:ring-onyx"
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
              placeholder="Password"
              type="password"
              bordered={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="!w-full focus:outline-none focus:ring-1 focus:ring-onyx mt-[10px]"
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

              <p>Forgot Password</p>
            </div>

            <Button
              text="Sign In"
              type="button"
              className="!w-[208px] mx-auto mt-[38px]"
              onClick={checkValidation}
            />

            <p className="mt-[38px] font-bold text-[20px]">Express sing in</p>

            <div className="mt-[18px] mb-[46px] flex flex-col lg:flex-row gap-[10px] text-[20px] font-bold">
              <Button
                text="Sign in"
                type="button"
                className="!w-[312px] h-[56px] mx-auto"
                icon="facebook"
              />
              <Button
                text="Sign In"
                type="button"
                className="!w-[312px] h-[56px] mx-auto"
                icon="google"
              />
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-[28px]">
              <h2 className="text-[24px] text-darkMaroon max-w-[180px] mx-auto font-bold mb-[20px]">
                NEW TO TIMESTONE ?
              </h2>
              <p className="text-silver">Create a new account</p>
            </div>

            <Input
              placeholder="First Name"
              type="text"
              bordered={true}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="!w-full focus:outline-none focus:ring-1 focus:ring-onyx mt-[10px]"
            />
            <Input
              placeholder="Last Name"
              type="text"
              bordered={true}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="!w-full focus:outline-none focus:ring-1 focus:ring-onyx mt-[10px]"
            />
            <p className="text-start text-silver mt-[6px]">Date of birth</p>
            <div className="flex flex-col lg:flex-row gap-[10px]">
              <Input
                placeholder="January"
                showSelect={true}
                options={months}
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="text-start !w-full hover:outline-none focus:ring-1 focus:ring-onyx "
              />
              <Input
                placeholder="01"
                showSelect={true}
                options={months}
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="text-start !w-full hover:outline-none focus:ring-1 focus:ring-onyx mt-[10px]"
              />
            </div>
            <Input
              placeholder="Phone Number"
              type="text"
              bordered={true}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="!w-full focus:outline-none focus:ring-1 focus:ring-onyx mt-[10px]"
            />

            <div className="flex flex-col lg:flex-row lg:gap-[10px]">
              <Input
                placeholder="Email"
                type="email"
                bordered={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="!w-full focus:outline-none focus:ring-1 focus:ring-onyx mt-[10px]"
              />
              <Input
                placeholder="Confirm Email"
                type="email"
                bordered={true}
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                className="!w-full focus:outline-none focus:ring-1 focus:ring-onyx mt-[10px]"
              />
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-[10px]">
              <Input
                placeholder="Password"
                type="password"
                bordered={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="!w-full focus:outline-none focus:ring-1 focus:ring-onyx mt-[10px]"
              />
              <Input
                placeholder="Confirm Password"
                type="password"
                bordered={true}
                value={confirmPasswor}
                onChange={(e) => setConfirmPasswor(e.target.value)}
                className="!w-full focus:outline-none focus:ring-1 focus:ring-onyx mt-[10px]"
              />
            </div>

            <div className="flex text-silver gap-[10px] mt-[10px]">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="w-[20px] h-[20px] bg-snow border-2 border-silver rounded focus:ring-darkMaroon"
                />
                <label>Sign-up to receive the latest updates and promotions</label>
              </div>

            <Button
              text="Create Account"
              type="button"
              className="!w-[208px] mx-auto mt-[38px] mb-[24px] lg:mb-[56px]"
              onClick={checkValidation}
            />
          </>
        )}
      </form>
    </section>
  );
};

export default LoginSection;
