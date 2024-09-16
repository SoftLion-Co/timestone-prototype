"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/ButtonComponent";
import Background from "@/images/news-section/bg-news-section.svg";
import Input from "@/components/InputComponent";

const NewsSection = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const checkValidation = () => {
    const rgExp =
      /^[\w]+[\w.+-]*@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/;
    if (!rgExp.test(email)) {
      setMessage("Please enter a valid email");
    } else {
      setMessage("");
    }
  };

  return (
    <section className="bg-darkerAmethyst/60 relative">
      <div className="container relative text-snow flex flex-col gap-[30px] items-center py-[60px] text-center">
        <h1 className="font-bold text-[28px] xl:text-[36px] xl:w-[80%]">
          Don't Miss Your Chance To Get Free Giveaway Sing Up To Our Newsletter
        </h1>

        <p className="text-[10px] xl:text-default">
          We will inform you about coming Giveaways, Offers, Online Store
          preparation progress and start of sales
        </p>

        <form className="flex flex-col gap-[30px] items-center">
          <div className="flex flex-col gap-[30px] xl:flex-row xl:gap-[20px]">
            <Input placeholder="Name" type="text" />

            <div className="relative">
              <Input
                placeholder="Email"
                type="email"
                value={email}
                pattern="^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="absolute top-[55px] left-[10px] text-onyx">
                {message}
              </span>
            </div>
          </div>

          <Button
            text="Sing Up"
            type="submit"
            background="onyx"
            className="w-[160px]"
            onClick={checkValidation}
          />
        </form>

        <p>
          You agree to our
          <span className="font-medium"> Terms and Conditions</span>
        </p>
      </div>

      <Image
        src={Background}
        alt="Background"
        className="top-0 object-cover absolute -z-10 h-[100%] w-[100%]"
      />
    </section>
  );
};

export default NewsSection;
