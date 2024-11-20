"use client";
import { useForm } from "@mantine/form";

import Input from "@/components/InputComponent";
import Button from "@/components/ButtonComponent";

//!добавити методи гетюзер гетордерс ремув ресейвер ад ресейвер

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
        value.length < 3 ? "Name must be at least 3 characters" : null,
      fullname: (value) =>
        value.length < 3 ? "Name must be at least 3 characters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) =>
        value && /^\d{10}$/.test(value) ? null : "Invalid phone number",
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
            />

            <Input
              placeholder="Date"
              inputType="select"
              bordered={true}
              scrollable={true}
              className="mini:w-full lg:w-[45%]"
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
              value={countries[0].label}
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
        <div className="w-full flex text-[14px] items-center flex-row text-silver gap-[10px] mt-[-20px] text-left">
          <input type="checkbox" className="w-[20px] h-[20px] appearance-none border-2 border-gray-400 rounded-sm checked:bg-red-500 checked:border-red-500 focus:outline-none focus:ring-0" />
          <label>Sign-up to receive the latest updates and promotions</label>
        </div>
        <Button text="Update" className="mt-[-20px]" type="submit" />
      </form>

      <form
        className="flex flex-col items-center gap-[46px] mt-[46px] lg:items-end"
        onSubmit={handleSubmitPassword}
      >
        <div className="w-full bg-snow border border-whisper border-solid rounded-lg flex flex-col py-[30px] px-[37px] ">
          <h2 className="mb-[20px] text-[24px] text-[#939393]">Password</h2>
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
                {...form.getInputProps("password")}
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
                {...form.getInputProps("verify")}
              />
            </div>
          </div>
        </div>
        <Button text="Update" className="" type="submit" />
      </form>
    </>
  );
};

export default MyAccountSection;