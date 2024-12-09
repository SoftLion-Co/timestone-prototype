"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { hasLength, isEmail, useForm } from "@mantine/form";

import Input from "@/components/InputComponent";
import Button from "@/components/ButtonComponent";
import { addNewReceiver } from "@/services/SubscribeService";

import Background from "@/images/news-section/subscribe.svg";

const NewsSection = () => {
  const MAX_ATTEMPTS = 3;
  const [value, setValue] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
    },
    validate: {
      name: hasLength({ min: 3 }, "Name must be at least 3 characters"),
      email: isEmail("Invalid email"),
    },
  });

  useEffect(() => {
    const savedAttempts = localStorage.getItem("inputAttempts");
    if (savedAttempts) {
      const parsedAttempts = Number(savedAttempts);
      setAttempts(parsedAttempts);
      if (parsedAttempts >= MAX_ATTEMPTS) {
        setIsDisabled(true);
      }
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = form.validate();
    if (Object.keys(errors.errors).length > 0) {
      return;
    }

    const values = form.values;

    await addNewReceiver(values.name, values.email);

    if (attempts < MAX_ATTEMPTS) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem("inputAttempts", newAttempts.toString());
      if (newAttempts >= MAX_ATTEMPTS) {
        setIsDisabled(true);
      }
    }
    form.reset();
    setValue("");
  };

  return (
    <section className="relative">
      <div className="container relative text-snow flex flex-col gap-[30px] items-center py-[60px] text-center">
        <h3 className="font-bold text-[28px] xl:text-[36px] xl:w-[80%]">
          Don't Miss Your Chance To Get Free Giveaway Sing Up To Our Newsletter
        </h3>

        <p className="text-[10px] xl:text-default">
          We will inform you about coming Giveaways, Offers, Online Store
          preparation progress and start of sales
        </p>

        <form
          className="flex flex-col gap-[30px] items-center"
          onSubmit={handleSubmit}
        >
          {isDisabled ? (
            <p className="text-red-500">Ви вичерпали всі спроби!</p>
          ) : (
            <p>Залишилось спроб: {MAX_ATTEMPTS - attempts}</p>
          )}
          <div className="flex flex-col gap-[30px] xl:flex-row xl:gap-[20px]">
            <div className="flex flex-col">
              <Input
                inputType="input"
                required
                placeholder="Name"
                type="text"
                errorType="warning"
                {...form.getInputProps("name")}
                disabled={isDisabled}
              />
            </div>
            <div className="flex flex-col">
              <Input
                inputType="input"
                required
                placeholder="Email"
                type="email"
                errorType="warning"
                {...form.getInputProps("email")}
                disabled={isDisabled}
              />
            </div>
          </div>
          <Button
            text="Sing Up"
            type="submit"
            tag="button"
            background="onyx"
            className="w-[160px]"
            disabled={isDisabled}
          />
        </form>

        <p>
          You agree to our
          <span> </span>
          <a href="/legal" className="font-medium underline">
            Terms and Conditions
          </a>
        </p>
      </div>

      <Image
        src={Background}
        alt="Background"
        className="top-0 bg-darkBurgundyOpacity object-cover absolute -z-10 h-[100%] w-[100%]"
        loading="lazy"
      />
    </section>
  );
};

export default NewsSection;
