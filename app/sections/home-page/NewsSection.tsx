"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/ButtonComponent";
import Background from "@/images/news-section/bg-news-section.svg";
import Input from "@/components/InputComponent";

const NewsSection = () => {

  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>("");
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  const validateEmail = (email: string) => {
    const rgExp =
      /^[\w]+[\w.+-]*@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/;
    return rgExp.test(String(email).toLowerCase());
  };

  const checkValidation = () => {
    if (!email) {
      setMessage("Please enter a email");
      setMessageType("error");
      return;
    } else if (!validateEmail(email)) {
      setMessage("Please enter a valid email");
      setMessageType("error");

      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 3000);
      return;
    } else {
      setMessage("Success input");
      setMessageType("success");

      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 3000);
      return;
    }
  };

  return (
    <section className="bg-darkBurgundy/60 relative">
      <div className="container relative text-snow flex flex-col gap-[30px] items-center py-[60px] text-center">
        <h3 className="font-bold text-[28px] xl:text-[36px] xl:w-[80%]">
          Don't Miss Your Chance To Get Free Giveaway Sing Up To Our Newsletter
        </h3>

        <p className="text-[10px] xl:text-default">
          We will inform you about coming Giveaways, Offers, Online Store
          preparation progress and start of sales
        </p>

        <form className="flex flex-col gap-[30px] items-center">
          <div className="flex flex-col gap-[30px] xl:flex-row xl:gap-[20px]">
            <Input
              placeholder="Name"
              type="text"
            />
            <div className="relative">
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {message && (
                <span
                  className={`absolute top-[55px] left-[10px] ${
                    messageType === "error" ? "text-onyx" : "text-snow"
                  }`}
                >
                  {message}
                </span>
              )}
            </div>
          </div>

          <Button
            text="Sing Up"
            type="button"
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
