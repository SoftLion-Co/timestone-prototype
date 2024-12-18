"use client";
import { Loader } from "@mantine/core";
import React, { useState, useEffect } from "react";

import Button from "@/components/ButtonComponent";
import TitleComponents from "@/components/TitleComponents";
import NewsSection from "@/app/sections/home-page/NewsSection";
import MyAccountSection from "@/app/sections/account-page/MyAccountSection";
import OrderHistorySection from "@/app/sections/account-page/OrderHistorySection";
import ProfileSideBarComponent from "@/components/account-page/ProfileSideBarComponent";

const AccountSection = () => {
  const [activeSection, setActiveSection] = useState("section1");
  const [isToken, setIsToken] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenAccess = localStorage.getItem("accessToken");
    const tokenRefresh = localStorage.getItem("refreshToken");

    if (tokenAccess || tokenRefresh) {
      setIsToken(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="container  flex justify-center items-center">
        <Loader className="animate-spin rounded-full border-4 border-darkBurgundy border-b-transparent w-10 h-10" />
      </div>
    );
  }

  if (isToken !== true) {
    return (
      <section className="container pt-[40px] flex flex-col justufy-center items-center gap-[20px] min-h-screen">
        <h1 className="text-black text-[24px] md:text-[32px] font-medium">
          Not authorized. Please log in.
        </h1>
        <Button
          text="Log in"
          tag="a"
          href="/auth"
          background="darkBurgundy"
          className="transition-all duration-300"
        />
      </section>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case "section1":
        return <MyAccountSection />;
      case "section2":
        return <OrderHistorySection />;
      default:
        return;
    }
  };
  return (
    <>
      <section className="bg-pearl bg-opacity-50 min-h-screen">
        <TitleComponents text="Ваш акаунт" />
        <ProfileSideBarComponent
          className="container pt-[20px] xl:pt-[40px]"
          setActiveSection={setActiveSection}
        />
        <div className="container flex flex-col gap-[30px] pt-[40px] pb-[60px] xl:pb-[150px]">
          <div>{renderSection()}</div>
        </div>
      </section>
      <NewsSection />
    </>
  );
};

export default AccountSection;
