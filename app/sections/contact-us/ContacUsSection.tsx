"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Textarea, TextInput } from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";

import Button from "@/components/ButtonComponent";

import Message from "@/images/contact-us/message.svg";
import ContactUsImage from "@/images/contact-us/image1.png";

const ContactUsSection = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
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
      message: hasLength({ min: 6 }, "Message must have at least 6 characters"),
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const errors = form.validate();
    console.log({ ...form.values });
    if (Object.keys(errors.errors).length > 0) {
      console.log("Form has errors:", errors);
      return;
    }

    form.reset();
    setFullName("");
    setEmail("");
    setMessage("");
  };
  return (
    <section className="lg:bg-pearl">
      <div className="container relative flex flex-col items-center  mt-[30px] mb-[60px] gap-[50px] lg:flex-row lg:gap-[80px] xl:gap-[90px] ">
        <div className="flex flex-col gap-[30px] items-center justify-center lg:items-start ">
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
            <div className="w-full flex flex-col gap-[14px]">
              <TextInput
                required
                placeholder="Full name"
                classNames={{
                  input:
                    "py-[16px] px-[30px] w-full h-[55px] rounded-[5px] border-[2px] border-[#EAECF5] lg:w-[90%] xl:w-[70%] focus:outline-none focus:border-[1px] focus:border-darkBurgundy ",
                }}
                {...form.getInputProps("fullName")}
              />
              <TextInput
                required
                placeholder="Email"
                type="email"
                classNames={{
                  input:
                    "py-[16px] px-[30px] w-full h-[55px] rounded-[5px] border-[2px] border-[#EAECF5] lg:w-[90%] xl:w-[70%] focus:outline-none focus:border-[1px] focus:border-darkBurgundy",
                }}
                {...form.getInputProps("email")}
              />
              <Textarea
                required
                placeholder="Message"
                classNames={{
                  input:
                    "py-[16px] px-[30px] w-full h-[160px] rounded border-[2px] rounded-[5px] border-[#EAECF5] lg:w-[90%] xl:w-[70%] focus:outline-none focus:border-[1px] focus:border-darkBurgundy ",
                }}

                {...form.getInputProps("message")}
              />
            </div>
            <Button
              text="Send Message"
              className="disabled:cursor-no-drop"
              type="submit"
            />
          </form>
        </div>
        <p className="hidden absolute py-[11px] px-[17px] bg-darkBurgundy rounded-full left-[47%] top-[50%] lg:block xl:py-[21px] xl:px-[27px] xl:left-[55%] xl:top-[50%]">
          <Image
            src={Message}
            alt="message"
            className="lg:w-[45px] lg:h-[56px]"
            width={60}
            height={71}
          />
        </p>

        <Image
          src={ContactUsImage}
          alt="contact us"
          className="w-full xl:w-[640px]"
          height={730}
        />
      </div>
    </section>
  );
};

export default ContactUsSection;
