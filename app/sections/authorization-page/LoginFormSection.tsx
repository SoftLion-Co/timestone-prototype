"use client";
import React , { useState } from "react";
import Button from "@/components/ButtonComponent";
import Input from "@/components/InputComponent";
import { loginUser} from "@/services/AuthService";
import { useForm } from "@mantine/form";
import { isEmail, hasLength } from "@mantine/form";

const LoginFormSection = () => {
  const [loginMessage, setLoginMessage] = useState<string | null>(
    null
  );
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

    const handleSignIn = async () => {
        const errors = loginForm.validate();
        if (!errors.hasErrors) {
          const { email, password } = loginForm.values;
          const response = await loginUser(email, password);
          if (response === "logged") {
            loginForm.reset();
            setLoginMessage(null);
          } else if (response !== "server error") {
            setLoginMessage(response);
          } else {
            setLoginMessage("Problems wih server");
          }
        }



        
      };

  const handleSignUpFacebook = () => {
    console.log("facebook");
  };

  const handleSignUpGoogle = () => {
    console.log("google");
  };

  return (
    <>
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
          <label>Remember me</label>
        </div>
      </div>

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
        className="!w-[208px] mx-auto mt-[38px] mb-[46px]"
        onClick={handleSignIn}
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
  );
};

export default LoginFormSection;
