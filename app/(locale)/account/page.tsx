"use client";
import { Loader } from "@mantine/core";
import React, { useEffect, useState } from "react";

import TitleComponents from "@/components/TitleComponents";
import NewsSection from "@/app/sections/home-page/NewsSection";
import MyAccountSection from "@/app/sections/account-page/MyAccountSection";
import OrderHistorySection from "@/app/sections/account-page/OrderHistorySection";
import ProfileSideBarComponent from "@/components/account-page/ProfileSideBarComponent";

//! перевірка на tokens
const Page = () => {
  const [activeSection, setActiveSection] = useState("section1");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
      {loading ? (
        <div className="container flex justify-center items-center">
          <Loader className="animate-spin rounded-full border-4 border-darkBurgundy border-b-transparent w-10 h-10" />
        </div>
      ) : (
        <>
          <section className="bg-[#F4F6F6] bg-opacity-50">
            <TitleComponents text="Timestone Account" />
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
      )}
    </>
  );
};

export default Page;
