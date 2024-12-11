import Image from "next/image";

import Button from "@/components/ButtonComponent";

import NotFoundImage from "@/images/error-pages/404.svg";

export default function NotFound() {
  return (
    <>
      <section className="container flex flex-col items-center bg-white rounded-[32px] pt-[40px] gap-[50px] md:gap-[20px] ">
        <h1 className="font-spaceage text-center text-black text-[28px] md:text-[32px] lg:text-[42px] px-[10px]">
          Oops, Something Went Wrong
        </h1>
        <Image
          src={NotFoundImage}
          alt="thanks"
          className="object-cover rounded-[32px] w-[380px] lg:w-[580px]"
        />
        <Button
          href="/"
          tag="a"
          text="Return to Homepage"
          className=" mb-[10px] focus:outline-none focus:ring-0 cursor-pointer"
        />
      </section>
    </>
  );
}
