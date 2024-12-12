"use client";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Button from "@/components/ButtonComponent";
import Input from "@/components/InputComponent";
import LoaderComponent from "@/components/LoaderComponent";
import { loginUser } from "@/services/AuthService";
import { isEmail, hasLength } from "@mantine/form";

const LoginFormSection = () => {
  const router = useRouter();
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail("Invalid email"),
      password: hasLength({ min: 6 }, "Password must be at least 6 characters"),
    },
  });

  useEffect(() => {
    const tokenAccess = localStorage.getItem("accessToken");
    const tokenRefresh = localStorage.getItem("refreshToken");

    if (tokenAccess || tokenRefresh) {
      router.push("/account");
    }
  }, []);

  const handleSignIn = async () => {
    const errors = loginForm.validate();
    if (!errors.hasErrors) {
      setIsLoading(true);
      const { email, password } = loginForm.values;
      const response = await loginUser(email, password);

      setIsLoading(false);
      if (response === 200) {
        loginForm.reset();
        router.push("/account");
        setLoginMessage(null);
      } else if (response == "A user with this email address already exists") {
        setLoginMessage("This email does not exist. Try again.");
      } else if (response == "The password is incorrect") {
        setLoginMessage("Іncorrect password. Try again.");
      } else if (response == "User not activated") {
        setLoginMessage("Your acc not activated. Check email box.");
      } else {
        setLoginMessage("Unexpected server error");
      }
    }
  };

  return (
    <>
      {isLoading && <LoaderComponent />}

      <div className="text-center mb-[28px]">
        <h2 className="text-[24px] md:text-[32px] lg:text-[48px] text-darkMaroon font-bold mb-[20px]">
          WELCOME BACK
        </h2>
        <p className="leading-[2] text-silver">
          Sign into your existing account to earn rewards, check existing orders
          and more
        </p>
      </div>
      <Input
        inputType="input"
        placeholder="Email"
        type="email"
        required={true}
        fullWidth={true}
        className="!w-full"
        errorType="critical"
        {...loginForm.getInputProps("email")}
        bordered={true}
      />

      <Input
        inputType="input"
        placeholder="Password"
        type="password"
        bordered={true}
        fullWidth={true}
        required={true}
        errorType="critical"
        {...loginForm.getInputProps("password")}
        className="!w-full mt-[10px]"
      />

      <div className="mt-[20px] flex justify-between text-silver">
        <div className="flex gap-[10px]">
          <input
            type="checkbox"
            id="rememberMe"
            className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-darkBurgundy checked:border-darkBurgundy checked:after:content-['✔'] checked:after:flex checked:after:justify-center checked:after:items-center checked:after:w-full checked:after:h-full checked:after:text-white focus:outline-none focus:ring-0"
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>
      </div>
      <div className=" mt-[16px]">
        <div>
          {loginMessage && (
            <span className={`block text-center text-darkBurgundy`}>
              {loginMessage}
            </span>
          )}
        </div>

        <Button
          text="Sign In"
          type="button"
          className="!w-[208px] mx-auto mt-[2px] mb-[46px]"
          onClick={handleSignIn}
        />
      </div>
    </>
  );
};

export default LoginFormSection;
