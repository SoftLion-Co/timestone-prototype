"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ButtonComponent";
import Input from "@/components/InputComponent";
import Background from "@/images/authorization-page/bg-geomitrical.svg";
import Image from "next/image";
import { loginUser, registrateNewUser } from "@/services/AuthService";
import ModalWindowComponent from "@/components/checkout-page/OrderingComponent";

const months = [
  { value: "january", label: "January" },
  { value: "february", label: "February" },
  { value: "march", label: "March" },
  { value: "april", label: "April" },
  { value: "may", label: "May" },
  { value: "june", label: "June" },
  { value: "july", label: "July" },
  { value: "august", label: "August" },
  { value: "september", label: "September" },
  { value: "october", label: "October" },
  { value: "november", label: "November" },
  { value: "december", label: "December" },
];

const getDaysInMonth = (month: string): { value: string; label: string }[] => {
  const daysInMonthMap: { [key: string]: number } = {
    january: 31,
    february: 29,
    march: 31,
    april: 30,
    may: 31,
    june: 30,
    july: 31,
    august: 31,
    september: 30,
    october: 31,
    november: 30,
    december: 31,
  };

  const daysInMonth = daysInMonthMap[month] || 31;

  return Array.from({ length: daysInMonth }, (_, i) => ({
    label: String(i + 1).padStart(2, "0"),
    value: String(i + 1),
  }));
};

const RegistrationFormSection = () => {
  

  return (
    <>
    </>
  );
};

export default RegistrationFormSection;
