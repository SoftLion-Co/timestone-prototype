"use client";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import Background from "@/images/authorization-page/bg-geomitrical.svg";
import Image from "next/image";
import Button from "@/components/ButtonComponent";
import Input from "@/components/InputComponent";
import LoaderComponent from "@/components/LoaderComponent";

const ResetPasswordFormSection = ({
  resetPasswordToken,
}: {
  resetPasswordToken: string;
}) => {
  const [forgotMeMessage, setForgotMeMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetPasswordForm = useForm({
    initialValues: { 
        password:"",
        confirmPassword:""
    },
        
    validate: {
        password: (value) => {
            if (/\s/.test(value)) return "Password can not contain spaces";
            if (value.length < 6) return "Password must be at least 6 characters";
            if (value.length > 20)
              return "Password must not be more than 20 characters";
            if (!/[a-z]/.test(value))
              return "Password must contain lowercase letter";
            if (!/[A-Z]/.test(value))
              return "Password must contain uppercase letter";
            if (!/[0-9]/.test(value)) return "Password must contain digit";
            return null;
          },
          confirmPassword: (value, values) =>
            value !== values.password ? "Passwords must match" : null,
    },
    },
  );

  const handleResetEmail = async () => {
    const errors = resetPasswordForm.validate();
    if (!errors.hasErrors) {
      setIsLoading(true);
    
      const response = "200";
      setIsLoading(false);
      if (response === "200") {
        setForgotMeMessage("Reset email sended");
      } else {
        setForgotMeMessage("Error with server.");
      }
    }
  };

  return (
    <>
      <section className="relative flex justify-center items-center font-poppins">
        <div className="bg-darkMaroon h-[500px] w-full absolute bottom-0 z-0">
          <Image
            src={Background}
            alt="Background"
            className="w-full h-full"
            layout="fill"
            objectFit="cover"
            loading="lazy"
          />
        </div>
        <form className="flex flex-col bg-snow w-[350px] md:w-[600px] lg:w-[860px] ring-[20px] ring-snow text-center border-[2px] border-gray-300 rounded-[10px] z-10 px-[20px] lg:px-[110px] mb-[174px]">
          {isLoading && <LoaderComponent />}

          <div className="text-center mb-[26px] mt-[40px]">
            <h2 className="text-[24px] md:text-[32px] lg:text-[48px] lg:mt-[20px] text-darkMaroon font-bold mb-[20px]">
              RESET PASSWORD
            </h2>
            <p className="leading-[2] text-silver">Enter your new password</p>
          </div>

          <Input
            inputType="input"
            placeholder="Password"
            type="password"
            bordered={true}
            fullWidth={true}
            required={true}
            errorType="critical"
            {...resetPasswordForm.getInputProps("password")}
            className="!w-full mt-[10px]"
          />
          <Input
            inputType="input"
            placeholder="Confirm Password"
            type="password"
            bordered={true}
            fullWidth={true}
            required={true}
            errorType="critical"
            {...resetPasswordForm.getInputProps("confirmPassword")}
            className="!w-full mt-[10px]"
          />

          <div className=" mt-[26px]">
            <div>
              {forgotMeMessage && (
                <span
                  className={`block text-center text-[16px] text-darkBurgundy`}
                >
                  {forgotMeMessage}
                </span>
              )}
            </div>

            <Button
              text="Send Email"
              type="button"
              className="!w-[208px] mx-auto mt-[8px] mb-[46px]"
              onClick={handleResetEmail}
            />
          </div>
        </form>
      </section>
    </>
  );
};

export default ResetPasswordFormSection;
