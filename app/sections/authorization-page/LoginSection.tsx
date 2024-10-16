"use client";
import React, { useState } from "react";
import Button from "@/components/ButtonComponent";
import Input from "@/components/InputComponent";

const LoginSection = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<
    "success" | "emailError" | "passwordError" | null
  >(null);

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
    <section className=" relative flex justify-center  items-center">
      <div className="bg-darkMaroon h-[500px] w-full absolute bottom-0 z-0" />
      <form className="flex flex-col bg-snow max-w-[360px] lg:min-w-[860px] ring-[20px] ring-snow text-center border-[2px] border-silver rounded-[10px] z-10 px-[20px] lg:px-[110px] mb-[174px]">
        <div className="gap-[14px] mb-[28px] lg:flex lg:space-between">
          <h2 className="text-[24px] text-darkMaroon max-w-[180px] mx-auto">
            Login
          </h2>
          <h2 className="text-[24px] text-darkMaroon max-w-[180px] mx-auto">
            Create Account
          </h2>
        </div>

        <div className="text-center gap-[14px] mb-[28px]">
          <h2 className="text-[24px] text-darkMaroon max-w-[180px] mx-auto">
            WELCOME BACK
          </h2>
          <p>
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
          <span className={`block text-left text-onyx`}>{passwordMessage}</span>
        )}

        <div className="mt-[20px] flex justify-between">
          <div className="flex items-center gap-[10px]">
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

        <p className="mt-[38px]">Express sing in</p>
        <div className="mt-[28px] mb-[46px] flex flex-col lg:flex-row gap-[10px]">
          <Button text="Sign in" type="button" className="w-[312px] mx-auto" />
          <Button text="Sign In" type="button" className="w-[312px] mx-auto" />
        </div>
      </form>
    </section>
  );
};

export default LoginSection;
