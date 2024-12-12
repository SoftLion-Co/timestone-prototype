"use client";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import { MantineProvider, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import Button from "../ButtonComponent";

import Thanks from "@/images/checkout-page/Thanks.png";

interface OrderingComponentProps {
  title: string;
  message: string;
}

const OrderingComponent: React.FC<OrderingComponentProps> = ({ message , title}) =>{
  const [opened, { open, close }] = useDisclosure(true);
  useEffect(() => {
    if (opened) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      
    }
  }, [opened]);
  return (
    <MantineProvider>
      {opened && (
        <div
          className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur-sm z-[999]"
          onClick={close}
        />
      )}
      <Modal
        opened={opened}
        onClose={close}
        className="container"
        withCloseButton={false}
        classNames={{
          root: "top-[25%] md:top-[15%] z-[1000] absolute left-0 right-0 bottom-0 md:w-[80%] lg:w-[70%] xl:w-[51%]",
          body: "p-0 ",
        }}
      >
        <div className="flex flex-col items-center bg-white rounded-[32px] pt-[40px] ">
          <h1 className="font-spaceage text-center text-black text-[28px] md:text-[32px] md:mb-[20px] lg:text-[42px] px-[10px]">
            {title}
          </h1>
          <p className="text-center text-[#424551] font-poppins text-default text-[silver] px-[10px] mt-[5px] md:mt-0">
            {message}
          </p>
          <Button
            href="/"
            tag="a"
            text="Return to Homepage"
            className="mt-[20px] md:mt-[40px] mb-[10px] focus:outline-none focus:ring-0"
          />
          <Image src={Thanks} alt="thanks" className="object-cover rounded-[32px]" />
        </div>
      </Modal>
    </MantineProvider>
  );
};

export default OrderingComponent;
