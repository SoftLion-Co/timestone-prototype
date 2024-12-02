"use client";
import React, { useState,useEffect } from "react";

import TitleComponents from "@/components/TitleComponents";
import NewsSection from "@/app/sections/home-page/NewsSection";
import MyAccountSection from "@/app/sections/account-page/MyAccountSection";
import OrderHistorySection from "@/app/sections/account-page/OrderHistorySection";
import ProfileSideBarComponent from "@/components/account-page/ProfileSideBarComponent";

//! button log in(a:/auth)

const AccountSection = () => {
  const [activeSection, setActiveSection] = useState("section1");
  const [isToken, setIsToken] = useState(false);


  useEffect(() => {
    const tokenAccess = localStorage.getItem("accessToken");
    const tokenRefresh = localStorage.getItem("refreshToken");

    if (!tokenAccess || !tokenRefresh) {
         setIsToken(true)
    }
   ;
  }, []); 


  if (isToken !== true ) {
    return <div>Not authorized. Please log in.</div>;
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
  );
};

export default AccountSection;
