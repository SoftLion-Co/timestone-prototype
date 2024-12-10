"use client";
import Image from "next/image";
import { useEffect } from "react";

import Button from "@/components/ButtonComponent";

import ServerError from "@/images/error-pages/500.svg";

const ServerErrorSection = ({
  error,
  reset,
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <section className="container flex flex-col items-center bg-white rounded-[32px] pt-[40px] gap-[50px] md:gap-[20px] ">
      <h1 className="font-spaceage text-center text-black text-[28px] md:text-[32px] lg:text-[42px] px-[10px]">
        Server Error, Please Try Again Later
      </h1>
      <Image
        src={ServerError}
        alt="error"
        className="object-cover rounded-[32px] w-[380px] lg:w-[580px]"
      />
      <Button
        tag="button"
        type="reset"
        text="Try again"
        className=" mb-[10px] focus:outline-none focus:ring-0"
        onClick={reloadPage}
      />
    </section>
  );
};

export default ServerErrorSection;
