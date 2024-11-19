"use client";
import { useForm } from "@mantine/form";

import Input from "@/components/InputComponent";
import Button from "@/components/ButtonComponent";
const MyAccountSection = () => {
  const countries = [
    { value: "UA", label: "Ukraine" },
  ];

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
  
  const form = useForm({
    initialValues: {
      name: "",
      fullname: "",
      email: "",
      phone: "",
      password: "",
      verify: "",
      remember: false,
    },
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      fullname: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) =>
        value && /^\d{10}$/.test(value) ? "Invalid phone number" : null,
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
    console.log(
      5,
      values1.fullname,
      values1.name,
      values1.email,
      values1.phone
    );

    if (Object.keys(errors.errors).length > 0) {
      console.log("Form has errors:", errors);
      return;
    }

    form.reset();
  };
  const handleSubmitPassword = async (event: any) => {
    event.preventDefault();
    const values2 = form.values;
    const errors = form.validate();
    console.log(5, values2.password, values2.verify);

    if (Object.keys(errors.errors).length > 0) {
      console.log("Form has errors:", errors);
      return;
    }

    form.reset();
  };
  
  return (
    <>
      <div className="flex flex-col items-center gap-[10px] md:gap-[15px] mb-[44px]">
        <h1 className="text-black text-[32px] md:text-[46px] font-medium">
          Hey, John Smith
        </h1>
        <p className="text-[12px] text-[#939393] md:text-[14px] text-center">
          Welcome to your dashboard, your one-stop-shop for all your recent
          Volumenzeit account activity.
        </p>
      </div>

      <form
        className="flex flex-col items-center gap-[46px]"
        onSubmit={handleSubmit}
      >
        <div className="w-full bg-snow border border-whisper border-solid rounded-lg flex flex-col py-[30px] px-[37px] ">
          <h2 className="mb-[20px] text-[24px] text-[#939393]">My Info</h2>
          <div className="flex flex-wrap justify-center gap-y-[20px] lg:gap-y-[36px] gap-x-[50px]">
            <Input
              inputType="input"
              name="firstName"
              className="w-full lg:w-[47%]"
              placeholder="Fist Name"
              type="text"
              bordered
              fullWidth
              {...form.getInputProps("name")}
            />

            <Input
              inputType="input"
              name="lastName"
              className="w-full lg:w-[47%]"
              placeholder="Last Name"
              type="text"
              bordered
              fullWidth
              {...form.getInputProps("fullname")}
            />

            <Input
              inputType="input"
              name="email"
              className="w-full lg:w-[47%]"
              placeholder="Email"
              type="email"
              fullWidth
              bordered
              {...form.getInputProps("email")}
            />

            <Input
              inputType="input"
              name="phone"
              placeholder="Phone Number"
              type="text"
              className="w-full lg:w-[47%]"
              bordered
              fullWidth
              {...form.getInputProps("phone")}
            />
          </div>
        </div>
        <div className="w-full  bg-snow border border-whisper border-solid rounded-lg flex flex-col py-[30px] px-[37px]">
          <h2 className="mb-[20px] text-[24px] text-[#939393]">Address Book</h2>

          <div className="flex flex-wrap justify-center gap-y-[20px] lg:gap-y-[36px] gap-x-[50px]">
            <Input
              name="country"
              placeholder="Country"
              inputType="select"
              options={countries}
              className="mini:w-full lg:w-[47%]"
            />
            <Input
              inputType="select"
              name="city"
              options={cities}
              scrollable
              className="mini:w-full lg:w-[47%]"
              placeholder="City"
            />
            <Input
              inputType="input"
              name="address"
              placeholder="Address"
              type="text"
              bordered
              className="w-full lg:w-[47%]"
            />
            <Input
              inputType="input"
              name="zipCode"
              placeholder="Zip Code"
              type="text"
              bordered
              className="w-full lg:w-[47%]"
            />
          </div>
        </div>
        <Button text="Update" className="" type="submit" />
      </form>

      <form
        className="flex flex-col items-center gap-[46px] mt-[46px]"
        onSubmit={handleSubmitPassword}
      >
        <div className="w-full bg-snow border border-whisper border-solid rounded-lg flex flex-col py-[30px] px-[37px]">
          <h2 className="mb-[20px] text-[24px] text-[#939393]">Password</h2>
          <div className="flex flex-wrap justify-center gap-y-[20px] lg:gap-y-[36px] gap-x-[50px]">
            <Input
              inputType="input"
              type="password"
              bordered
              name="password"
              className="w-full lg:w-[47%]"
              placeholder="Your password"
              {...form.getInputProps("password")}
            />
            <Input
              inputType="input"
              type="password"
              bordered
              name="Confirm password"
              placeholder="Confirm password"
              className="w-full lg:w-[47%]"
              {...form.getInputProps("verify")}
            />
          </div>
        </div>
        <Button text="Update" className="" type="submit" />
      </form>
    </>
  );
};

export default MyAccountSection;
