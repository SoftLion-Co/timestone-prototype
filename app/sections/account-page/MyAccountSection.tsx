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
  const countries = [{ value: "UA", label: "Ukraine" }];

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

  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false); //true
  const [subscribe, setSubscribe] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { user, subscribe } = await getUser("673c567340ace23b1904132c"); // треба буде замінити на tokens
        setUserName(`${user.firstName} ${user.lastName}` || "");
        form.setValues({
          name: user.firstName || "",
          fullname: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
          month: user.dateOfBirth?.split(",")[0] || "",
          date: user.dateOfBirth?.split(",")[1] || "",
          country: user.address?.split("&")[0] || "",
          city: user.address?.split("&")[1] || "",
          address: user.address?.split("&")[2] || "",
          zipCode: user.address?.split("&")[3] || "",
        });
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
      name: "настя",
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
        value && /^\+?\d{12}$/.test(value)
          ? null
          : "Invalid phone number. It should start with + and contain 12 digits.",
    },
  });

  const formWithPass = useForm({
    initialValues: {
      password: "",
      verify: "",
      remember: false,
    },
    validate: {
      password: (value) =>
        value.length < 6 ? "Password must have at least 6 characters" : null,
      verify: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const errors = form.validate();
    const values1 = form.values;

    if (Object.keys(errors.errors).length > 0) {
      console.log("Form has errors:", errors);
      return;
    }

    const response = await updateUser("", {
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
        response1 = await addNewReceiver(values1.email, values1.name);
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
    console.log(5, values2.password, values2.verify);
    const response = await updatePassword("", values2.password);

    if (Object.keys(errors.errors).length > 0) {
      console.log("Form has errors:", errors);
      return;
    }
    //! обробка помилки
    form.reset();
  };

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
            <p className="text-[12px] text-[#939393] md:text-[14px] text-center">
              Welcome to your dashboard, your one-stop-shop for all your recent
              Timestone account activity.
            </p>
          </div>

          <form
            className="flex flex-col items-center gap-[46px] lg:items-end"
            onSubmit={handleSubmit}
          >
            <div className="w-full bg-snow border border-whisper border-solid rounded-lg flex flex-col py-[30px] px-[37px] ">
              <h2 className="mb-[20px] text-[24px] text-[#939393]">My Info</h2>
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
                  options={months}
                  bordered={true}
                  scrollable={true}
                  className="mini:w-full lg:w-[45%]"
                  {...form.getInputProps("month")}
                />

                <Input
                  placeholder="Date"
                  inputType="select"
                  bordered={true}
                  scrollable={true}
                  className="mini:w-full lg:w-[45%]"
                  {...form.getInputProps("date")}
                />
              </div>
            </div>
            <div className="w-full  bg-snow border border-whisper border-solid rounded-lg flex flex-col py-[30px] px-[37px]">
              <h2 className="mb-[20px] text-[24px] text-[#939393]">
                Address Book
              </h2>

              <div className="flex flex-wrap justify-center gap-y-[20px] lg:gap-y-[36px] gap-x-[50px]">
                <Input
                  name="country"
                  placeholder="Country"
                  inputType="select"
                  value={countries[0].label}
                  options={countries}
                  className="mini:w-full lg:w-[47%]"
                  {...form.getInputProps("country")}
                />
                <Input
                  inputType="select"
                  name="city"
                  options={cities}
                  scrollable
                  className="mini:w-full lg:w-[47%]"
                  placeholder="City"
                  {...form.getInputProps("city")}
                />
                <Input
                  inputType="input"
                  name="address"
                  placeholder="Address"
                  type="text"
                  bordered
                  className="w-full lg:w-[47%]"
                  {...form.getInputProps("address")}
                />
                <Input
                  inputType="input"
                  name="zipCode"
                  placeholder="Zip Code"
                  type="text"
                  bordered
                  className="w-full lg:w-[47%]"
                  {...form.getInputProps("zipCode")}
                />
              </div>
            </div>
            <div className="w-full flex text-[14px] items-center flex-row text-silver gap-[10px] mt-[-20px] text-left">
              <div className="flex items-center">
                <input
                  {...form.getInputProps("subscribe")}
                  type="checkbox"
                  className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-darkBurgundy checked:border-darkBurgundy checked:after:content-['✔'] checked:after:flex checked:after:justify-center checked:after:items-center checked:after:w-full checked:after:h-full checked:after:text-white focus:outline-none focus:ring-0"
                />
                <label className="ml-2 text-gray-700">
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
              <h2 className="mb-[20px] text-[24px] text-[#939393]">
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
