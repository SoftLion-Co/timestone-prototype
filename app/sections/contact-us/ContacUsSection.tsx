"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { hasLength, isEmail, useForm } from "@mantine/form";

import Button from "@/components/ButtonComponent";
import Input from "@/components/InputComponent";
import { sendEmailToUs } from "@/services/SubscribeService";

import Message from "@/images/contact-us/message.svg";
import ContactUsImage from "@/images/contact-us/image1.png";

const ContactUsSection = () => {
  const MAX_ATTEMPTS = 3;
  const [value, setValue] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const form = useForm({
    initialValues: {
      fullName: "",
      email: "",
      message: "",
    },
    validate: {
      fullName: hasLength(
        { min: 3 },
        "Full Name must be at least 3 characters"
      ),
      email: isEmail("Invalid email"),
      message: hasLength({ min: 4 }, "Message must have at least 6 characters"),
    },
  });


  useEffect(() => {
    const savedAttempts = localStorage.getItem("contactUsAttempts");
    if (savedAttempts) {
      const parsedAttempts = Number(savedAttempts);
      setAttempts(parsedAttempts);
      if (parsedAttempts >= MAX_ATTEMPTS) {
        setIsDisabled(true);
      }
    }
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const errors = form.validate();
    if (Object.keys(errors.errors).length > 0) {
      console.log("Form has errors:", errors);
      return;
    }
    const values = form.values;
    await sendEmailToUs(values.fullName, values.email, values.message);
    if (attempts < MAX_ATTEMPTS) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem("contactUsAttempts", newAttempts.toString());
      if (newAttempts >= MAX_ATTEMPTS) {
        setIsDisabled(true);
      }
    }
    form.reset();
    setValue("");
  };

  return (
    <section className="lg:bg-pearl py-[20px]">
      <div className="container relative flex flex-col items-center mt-[30px] mb-[60px] gap-[50px] lg:gap-0 lg:justify-between lg:flex-row">
        <div className="flex flex-col gap-[30px] items-center justify-center lg:w-[45%] xl:w-[55%]">
          <div>
            <h1 className="font-spaceage text-center text-black text-[28px] mb-[15px] md:text-[32px] md:mb-[20px] lg:text-start lg:text-[42px] lg:mb-[25px]">
              Contact us
            </h1>
            <p className="text-center text-[#424551] font-poppins text-default text-silver lg:text-start">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim
              facilisi elementum commodo ipsum. Aenean aenean adipiscing lect
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-[30px] lg:items-start"
          >
             {isDisabled ? (
            <p className="text-red-500">Ви вичерпали всі спроби!</p>
          ) : (
            <p className="text-black">Залишилось спроб: {MAX_ATTEMPTS - attempts}</p>
          )}
            <div className="w-full flex flex-col gap-[14px]">
              <Input
                inputType="input"
                placeholder="Full name"
                required={true}
                bordered={true}
                className="rounded-[5px] border-[1px] lg:w-[90%] xl:w-[70%] "
                {...form.getInputProps("fullName")}
                errorType="critical"
                disabled={isDisabled}
              />
              <Input
                inputType="input"
                required={true}
                bordered={true}
                placeholder="Email"
                type="email"
                className="rounded-[5px] border-[1px] lg:w-[90%] xl:w-[70%] "
                {...form.getInputProps("email")}
                errorType="critical"
                disabled={isDisabled}
              />
              <Input
                inputType="textarea"
                placeholder="Message"
                required={true}
                bordered={true}
                className="focus:outline-none focus:border-[1px] focus:border-darkBurgundy"
                {...form.getInputProps("message")}
                errorType="critical"
                disabled={isDisabled}
              />
            </div>
            <Button
              text="Send Message"
              background="darkBurgundy"
              disabled={isDisabled}
              type="submit"
              tag="button"
            />
          </form>
        </div>
        <div className="hidden absolute py-[11px] px-[17px] bg-darkBurgundy rounded-full left-[49%] top-[50%] lg:block xl:py-[21px] xl:px-[27px] xl:left-[55%] xl:top-[50%]">
          <Image
            src={Message}
            alt="message"
            className="lg:w-[45px] lg:h-[56px]"
            width={60}
            height={71}
          />
        </div>
        <div className="w-full lg:w-[47%] xl:w-[50%] flex justify-end">
          <Image
            src={ContactUsImage}
            alt="contact us"
            className="object-cover w-[100%] lg:w-[500px] xl:w-[550px]"
            height={540}
            width={640}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
