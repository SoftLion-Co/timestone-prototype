"use client";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import Background from "@/images/authorization-page/bg-geomitrical.svg";
import Image from "next/image";
import Button from "@/components/ButtonComponent";
import Input from "@/components/InputComponent";
import LoaderComponent from "@/components/LoaderComponent";
import { isEmail } from "@mantine/form";
import { sendResetPasswordEmail } from "@/services/ForgotMeService";

const ForgotMeFormSection = () => {

  const [forgotMeMessage, setForgotMeMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const forgotMeForm = useForm({
    initialValues: {
      email: ""
    },
    validate: {
      email: isEmail("Invalid email"),
    },
  });

  const handleResetEmail = async () => {
    const errors = forgotMeForm.validate();
    if (!errors.hasErrors) {
      setIsLoading(true);
      const { email } = forgotMeForm.values;
      const response = await sendResetPasswordEmail(email);
      setIsLoading(false);
      if (response.data === "Reset password email sent") {
        setForgotMeMessage("Reset email sended");
      } else if (response == "No user found with this email address") {
        setForgotMeMessage("User with this email does not exist. Try again.");
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
              FORGOT PASSWORD
            </h2>
            <p className="leading-[2] text-silver">
              Enter your email address and we will send you a link to reset your password.
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
            {...forgotMeForm.getInputProps("email")}
            bordered={true}
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

export default ForgotMeFormSection;
