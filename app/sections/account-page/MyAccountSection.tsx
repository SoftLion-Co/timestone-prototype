"use client";
import { Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState, useEffect } from "react";

import { getUser, updatePassword, updateUser } from "@/services/AuthService";
import { addNewReceiver, removeReceiver } from "@/services/SubscribeService";

// import { orders } from "@/test/orderData";
import Input from "@/components/InputComponent";
import Button from "@/components/ButtonComponent";

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
  const [month, setMonth] = useState("may");
  const [day, setDay] = useState("16");
  const [country, setCountry] = useState("Ukraine");
  const [city, setCity] = useState("lviv");
  const dayOptions = getDaysInMonth(month);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { user, subscribe } = await getUser();
        setUserName(`${user.firstName} ${user.lastName}` || "");
        const userMonth = user.dateOfBirth?.split(",")[0] || "";
        const userDay = user.dateOfBirth?.split(",")[1]?.trim() || "";
        const userCountry = user.address?.split("&")[0] || "";
        const userCity:string = (user.address?.split("&")[1]?.trim() || "").toLowerCase();

        
        form.setValues({
          name: user.firstName || "",
          fullname: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
          month: userMonth,
          date: userDay,
          country: userCountry,
          city: userCity,
          address: user.address?.split("&")[2] || "",
          zipCode: user.address?.split("&")[3] || "",
        });
        if (userMonth && userDay) {
          setMonth(userMonth);
          setDay(userDay);
        }

        if (userCountry && userCity) {
          setCountry(userCountry);
          setCity(userCity); 
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
      country: "",
      city: "",
      address: "",
      zipCode: "",
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
        if (value.length < 6) return "Password must have at least 6 characters";
        if (value.length > 20) return "Password must not exceed 20 characters";
        if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter";
        if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
        if (!/[0-9]/.test(value)) return "Password must contain at least one digit";
        if (/\s/.test(value)) return "Password cannot contain spaces";
        return null;
      },
      verify: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
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
      address: `${values1.country}&${values1.city}&${values1.address}&${values1.zipCode}`,
    });

    let response1;
    if (subscribe !== values1.subscribe) {
      if (values1.subscribe) {
        response1 = await addNewReceiver(values1.name, values1.email);
      } else {
        response1 = await removeReceiver(values1.email);
      }
    }
    //! обробка помилки
  };

  const handleSubmitPassword = async (event: any) => {
    event.preventDefault();
    const values2 = formWithPass.values;
    const errors = formWithPass.validate();
    const response = await updatePassword(values2.password);

    if (Object.keys(errors.errors).length > 0) {
      return;
    }
    //! обробка помилки
    form.reset();
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
      {loading ? (
        <div className="container flex justify-center items-center">
          <Loader className="animate-spin rounded-full border-4 border-darkBurgundy border-b-transparent w-10 h-10" />
        </div>
      ) : (
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
            className="flex flex-col items-center gap-[46px] lg:items-end"
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
              <h2 className="mb-[20px] text-[24px] text-silver">
                Address Book
              </h2>

              <div className="flex flex-wrap justify-center gap-y-[20px] lg:gap-y-[36px] gap-x-[50px]">
                <Input
                  name="country"
                  placeholder="Country"
                  inputType="select"
                  value={country}
                  options={countries}
                  onSelect={(value) => setCountry(value)}
                  className="mini:w-full lg:w-[45%]"
                />
                <Input
                  inputType="select"
                  name="city"
                  value={city}
                  options={cities}
                  scrollable
                  onSelect={(value) => {
                    setCity(value);
                  }}
                  className="mini:w-full lg:w-[45%]"
                  placeholder="City"
                />
                <div className="w-full lg:w-[45%] flex flex-col">
                  <Input
                    inputType="input"
                    name="address"
                    placeholder="Address"
                    type="text"
                    bordered
                    className="w-full"
                    {...form.getInputProps("address")}
                  />
                </div>
                <div className="w-full lg:w-[45%] flex flex-col">
                  <Input
                    inputType="input"
                    name="zipCode"
                    placeholder="Zip Code"
                    type="text"
                    bordered
                    className="w-full"
                    {...form.getInputProps("zipCode")}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex text-[14px] items-center flex-row text-silver gap-[10px] mt-[-20px] text-left">
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
            <Button text="Update" className="mt-[-20px]" type="submit" />
          </form>

          <form
            className="flex flex-col items-center gap-[46px] mt-[46px] lg:items-end"
            onSubmit={handleSubmitPassword}
          >
            <div className="w-full bg-snow border border-whisper border-solid rounded-lg flex flex-col py-[30px] px-[37px] ">
              <h2 className="mb-[20px] text-[24px] text-silver">
                New password
              </h2>
              <div className="flex flex-wrap justify-center gap-y-[20px] lg:gap-y-[36px] gap-x-[50px]">
                <div className="w-full lg:w-[45%] flex flex-col">
                  <Input
                    inputType="input"
                    type="password"
                    name="password"
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
                    inputType="input"
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
            <Button text="Update" className="" type="submit" />
          </form>
        </>
      )}
    </>
  );
};

export default MyAccountSection;
