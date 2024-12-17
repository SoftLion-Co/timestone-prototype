"use client";
import Image from "next/image";
import { Alert } from "flowbite-react";
import { Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { TfiAlert } from "react-icons/tfi";
import { FiCheckCircle } from "react-icons/fi";
import { useDisclosure } from "@mantine/hooks";
import React, { useState, useEffect } from "react";

// import { orders } from "@/test/orderData";
import Input from "@/components/InputComponent";
import Button from "@/components/ButtonComponent";
import LoaderComponent from "@/components/LoaderComponent";
import { getUser, updatePassword, updateUser } from "@/services/AuthService";
import { addNewReceiver, removeReceiver } from "@/services/SubscribeService";

import Arrow from "@/images/news-section/arrow.svg";

//! кнопки для підєднання facebook or google
const MyAccountSection = () => {
  const countries = [{ value: "Ukraine", label: "Україна" }];

  const cities = [
    { value: "kyiv", label: "Київ" },
    { value: "lviv", label: "Львів" },
    { value: "kharkiv", label: "Харків" },
    { value: "odesa", label: "Одеса" },
    { value: "dnipro", label: "Дніпро" },
    { value: "zaporizhzhia", label: "Запоріжжя" },
    { value: "vinnytsia", label: "Вінниця" },
    { value: "chernihiv", label: "Чернігів" },
    { value: "sumy", label: "Суми" },
    { value: "poltava", label: "Полтава" },
    { value: "chernivtsi", label: "Чернівці" },
    { value: "ivano-frankivsk", label: "Івано-Франківськ" },
    { value: "uzhhorod", label: "Ужгород" },
    { value: "ternopil", label: "Тернопіль" },
    { value: "khmelnytskyi", label: "Хмельницький" },
    { value: "mykolaiv", label: "Миколаїв" },
    { value: "rivne", label: "Рівне" },
    { value: "zhytomyr", label: "Житомир" },
    { value: "cherkasy", label: "Черкаси" },
    { value: "kropyvnytskyi", label: "Кропивницький" },
    { value: "lutsk", label: "Луцьк" },
  ];

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

  const getDaysInMonth = (
    month: string
  ): { value: string; label: string }[] => {
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
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false); //true
  const [subscribe, setSubscribe] = useState(false);
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);
  const dayOptions = getDaysInMonth(month);
  const [infoMessage, setInfoMessage] = useState<{
    type: string;
    text: string;
  } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { user, subscribe } = await getUser();
        setUserName(`${user.firstName} ${user.lastName}` || "");
        const userMonth = user.dateOfBirth?.split(",")[0] || "";
        const userDay = user.dateOfBirth?.split(",")[1]?.trim() || "";

        form.setValues({
          name: user.firstName || "",
          fullname: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
          month: userMonth,
          date: userDay,
          address1: user.address?.split("&")[0]?.trim() || "",
          address2: user.address?.split("&")[1]?.trim() || "",
        });
        if (userMonth && userDay) {
          setMonth(userMonth);
          setDay(userDay);
        }

        setSubscribe(subscribe);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, []);

  const form = useForm({
    initialValues: {
      name: "",
      fullname: "",
      email: "",
      phone: "",
      month: "",
      date: "",
      address1: "",
      address2: "",
      subscribe: false,
    },
    validate: {
      name: (value) =>
        value.length < 3 ? "Name must be at least 3 characters" : null,
      fullname: (value) =>
        value.length < 3 ? "Name must be at least 3 characters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) =>
        /^\+38\d{10}$/.test(value) ? null : "Invalid phone number",
    },
  });

  const formWithPass = useForm({
    initialValues: {
      password: "",
      verify: "",
      remember: false,
    },
    validate: {
      password: (value) => {
        if (value.length < 6) {
          return "Password must have at least 6 characters";
        }
        if (!/[a-z]/.test(value)) {
          return "Password must contain at least one lowercase letter";
        }
        if (!/[A-Z]/.test(value)) {
          return "Password must contain at least one uppercase letter";
        }
        if (!/\d/.test(value)) {
          return "Password must contain at least one digit";
        }
        return null;
      },
      verify: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const errors = form.validate();
    const values1 = form.values;
    if (Object.keys(errors.errors).length > 0) {
      return;
    }
    const response = await updateUser({
      lastname: values1.fullname,
      firstname: values1.name,
      email: values1.email,
      phoneNumber: values1.phone,
      dateOfBirth: `${values1.month},${values1.date}`,
      address: `${values1.address1}&${values1.address2}`,
    });

    let response1;
    if (response === 201) {
      if (subscribe !== values1.subscribe) {
        if (values1.subscribe) {
          response1 = await addNewReceiver(values1.name, values1.email);
          if (response1 === 201) {
            setSubscribe(true);
            form.setFieldValue("subscribe", true);
            setLoading(false);
            setInfoMessage({
              type: "success",
              text: "Your details updated successfully!",
            });
          } else {
            setLoading(false);
            setInfoMessage({
              type: "error",
              text: "Oops! A server error occurred!",
            });
          }
        } else {
          response1 = await removeReceiver(values1.email);
          if (response1 === 204) {
            setSubscribe(false);
            form.setFieldValue("subscribe", false);
            setLoading(false);
            setInfoMessage({
              type: "success",
              text: "Your details updated successfully!",
            });
          } else {
            setLoading(false);
            setInfoMessage({
              type: "error",
              text: "Oops! A server error occurred!",
            });
          }
        }
      } else {
        setLoading(false);
        setInfoMessage({
          type: "success",
          text: "Your details updated successfully!",
        });
      }
    } else {
      setLoading(false);
      setInfoMessage({
        type: "error",
        text: "Oops! A server error occurred!",
      });
    }

    setTimeout(() => {
      setInfoMessage(null);
    }, 5000);
  };

  const handleSubmitPassword = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const values2 = formWithPass.values;
    const errors = formWithPass.validate();
    const response = await updatePassword(values2.password);
    console.log(response);
    if (Object.keys(errors.errors).length > 0) {
      return;
    }
    if (response.status === 201) {
      setLoading(false);
      setInfoMessage({
        type: "success",
        text: "Your password updated successfully!",
      });
    } else {
      setLoading(false);
      setInfoMessage({
        type: "error",
        text: "Oops! A server error occurred!",
      });
    }
    setLoading(false);

    setTimeout(() => {
      setInfoMessage(null);
    }, 5000);
    formWithPass.reset();
  };

  useEffect(() => {
    if (form.values.phone && !form.values.phone.startsWith("+38")) {
      form.setFieldValue("phone", `+38${form.values.phone}`);
    }
    if (form.values.phone.length === 2) {
      form.setFieldValue("phone", "");
    }
  }, [form.values.phone]);

  return (
    <>
      {infoMessage && (
        <Alert
          color={infoMessage.type === "success" ? "green" : "red"}
          icon={infoMessage.type === "success" ? FiCheckCircle : TfiAlert}
          className={`fixed bottom-0 right-0 m-4 p-4 z-10 text-[16px] lg:text-[18px] ${
            infoMessage.type === "success" ? "text-[green]" : "text-[red]"
          }`}
        >
          {infoMessage.text}
        </Alert>
      )}
      {loading && <LoaderComponent />}

      <>
        <div className="flex flex-col items-center gap-[10px] md:gap-[15px] mb-[44px]">
          <h1 className="text-black text-[32px] md:text-[46px] font-medium">
            Hey, {userName}
          </h1>
          <p className="text-[12px] text-silver md:text-[14px] text-center">
            Welcome to your dashboard, your one-stop-shop for all your recent
            Timestone account activity.
          </p>
        </div>

        <form
          className="flex flex-col  items-center gap-[46px] lg:items-end"
          onSubmit={handleSubmit}
        >
          <div className="w-full bg-snow border border-whisper border-solid rounded-lg flex flex-col py-[30px] px-[37px] ">
            <h2 className="mb-[20px] text-[24px] text-silver">My Info</h2>
            <div className="flex flex-wrap justify-center gap-y-[20px] lg:gap-y-[36px] gap-x-[50px]">
              <div className="w-full lg:w-[45%] flex flex-col">
                <Input
                  inputType="input"
                  className="w-full"
                  placeholder="First Name"
                  type="text"
                  error={true}
                  errorType="critical"
                  bordered
                  fullWidth
                  {...form.getInputProps("name")}
                />
              </div>

              <div className="w-full lg:w-[45%] flex flex-col">
                <Input
                  inputType="input"
                  className="w-full"
                  placeholder="Last Name"
                  type="text"
                  error={true}
                  errorType="critical"
                  bordered
                  fullWidth
                  {...form.getInputProps("fullname")}
                />
              </div>

              <div className="w-full lg:w-[45%] flex flex-col">
                <Input
                  inputType="input"
                  className="w-full"
                  placeholder="Email"
                  type="email"
                  fullWidth
                  error={true}
                  errorType="critical"
                  bordered
                  {...form.getInputProps("email")}
                />
              </div>

              <div className="w-full lg:w-[45%] flex flex-col">
                <Input
                  inputType="input"
                  placeholder="Phone Number"
                  type="text"
                  className="w-full"
                  bordered
                  errorType="critical"
                  fullWidth
                  {...form.getInputProps("phone")}
                />
              </div>
              <Input
                placeholder="Month"
                inputType="select"
                value={month}
                scrollable={true}
                onSelect={(value) => setMonth(value)}
                options={months}
                bordered={true}
                className="mini:w-full lg:w-[45%]"
              />

              <Input
                placeholder="Date"
                inputType="select"
                bordered={true}
                value={day}
                options={dayOptions}
                scrollable={true}
                onSelect={(value) => setDay(value)}
                className="mini:w-full lg:w-[45%]"
              />
            </div>
          </div>

          <div className="w-full  bg-snow border border-whisper border-solid rounded-lg flex flex-col py-[30px] px-[37px]">
            <h2 className="mb-[20px] text-[24px] text-silver">Address Book</h2>

            <div className="flex flex-wrap justify-center gap-y-[20px] lg:gap-y-[36px] gap-x-[50px]">
              <Select
                className=""
                classNames={{
                  root: "w-full lg:w-[45%] ",
                  wrapper: "w-full",
                  input:
                    "w-full border border-[1px] border-solid rounded-lg py-[15px] px-[30px] cursor-pointer bg-snow text-silver focus:outline-none focus:border-[1px] focus:border-darkBurgundy",
                }}
                searchable
                name="address1"
                rightSectionPointerEvents="none"
                rightSection={
                  <Image
                    src={Arrow}
                    alt="Arrow"
                    width={14}
                    className={`absolute right-[25px] top-[25px] transition-transform ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                }
                placeholder="Населений пункт"
                {...form.getInputProps("address")}
              />
              {/* <Input
                  inputType="input"
                  name="address"
                  placeholder="Address"
                  type="text"
                  bordered
                  className="w-full"
                  {...form.getInputProps("address")}
                /> */}
              <div className="w-full lg:w-[45%] flex flex-col">
                <Input
                  inputType="input"
                  name="address2"
                  placeholder="Вулиця,будинок,квартира"
                  type="text"
                  bordered
                  className="w-full"
                  {...form.getInputProps("address2")}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex text-[14px] items-center flex-col lg:flex-row text-silver justify-between gap-[14px] mt-[-20px] text-left">
            <div className="flex items-center">
              <input
                {...form.getInputProps("subscribe")}
                type="checkbox"
                id="sign-up-update"
                className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-darkBurgundy checked:border-darkBurgundy checked:after:content-['✔'] checked:after:flex checked:after:justify-center checked:after:items-center checked:after:w-full checked:after:h-full checked:after:text-white focus:outline-none focus:ring-0"
              />
              <label htmlFor="sign-up-update" className="ml-2 text-gray-700">
                Sign-up to receive the latest updates and promotions
              </label>
            </div>
          </div>
          <Button
            text="Update"
            className="mt-[-20px]"
            type="submit"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          />
        </form>

        <form
          className="flex flex-col items-center gap-[46px] mt-[46px] lg:items-end"
          onSubmit={handleSubmitPassword}
        >
          <div className="w-full bg-snow border border-whisper border-solid rounded-lg flex flex-col py-[30px] px-[37px] ">
            <h2 className="mb-[20px] text-[24px] text-silver">New password</h2>
            <div className="flex flex-wrap justify-center gap-y-[20px] lg:gap-y-[36px] gap-x-[50px]">
              <div className="w-full lg:w-[45%] flex flex-col">
                <Input
                  inputType="password"
                  type="password"
                  name="password"
                  visible={visible}
                  onVisibilityChange={toggle}
                  placeholder="Your password"
                  bordered
                  error={true}
                  errorType="critical"
                  fullWidth
                  className="w-full"
                  {...formWithPass.getInputProps("password")}
                />
              </div>
              <div className="w-full lg:w-[45%] flex flex-col">
                <Input
                  inputType="password"
                  visible={visible}
                  onVisibilityChange={toggle}
                  type="password"
                  name="Confirm password"
                  placeholder="Confirm password"
                  bordered
                  error={true}
                  errorType="critical"
                  fullWidth
                  className="w-full"
                  {...formWithPass.getInputProps("verify")}
                />
              </div>
            </div>
          </div>
          <Button
            text="Update"
            type="submit"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          />
        </form>
      </>
    </>
  );
};

export default MyAccountSection;
