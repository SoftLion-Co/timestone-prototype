"use client";
import React, { SetStateAction, useState } from "react";
import Title from "@/components/TitleComponents";
import FormComponent from "@/components/FormComponent";
import Input from "@/components/InputComponent";
import Button from "@/components/ButtonComponent";
import Arrow from "@/images/checkout-section/TopArrow.svg";
import Image from "next/image";
import Checkbox from "@/components/CheckboxComponent";
import { motion } from "framer-motion";
import CartComponent from "@/components/CartComponent";
import { CreateOrder } from "@/services/OrderService";

const CheckoutSection = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>("");
  const [isVisible, setIsVisible] = useState(false);
  const [shippingValue, setshippingValue] = useState({});
  const [checkError, setCheckError] = useState("");

  const options = [
    { value: "UA", label: "Ukraine" },
    { value: "PL", label: "Poland" },
    { value: "USA", label: "USA" },
  ];

  const handleChange = (option: SetStateAction<string | null>) => {
    setSelectedOption(option);
    setCheckError("");

    if (option === "UPS Standard") {
      setshippingValue({
        shippingLines: [
          {
            code: "Standard",
            title: "Standard",
            priceSet: {
              shopMoney: {
                amount: "00.00",
                currrencyCode: "UAH",
              },
            },
          },
        ],
      });
    } else if (option === "UPS Express") {
      setshippingValue({
        shippingLines: [
          {
            code: "Express",
            title: "Express",
            priceSet: {
              shopMoney: {
                amount: "49.99",
                currrencyCode: "UAH",
              },
            },
          },
        ],
      });
    }
  };
  type FormValues = {
    email: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    phoneNumber: string;
    zipCode: string;
    country: string;
  };

  type FormErrors = {
    [key in keyof FormValues]: string | null;
  };

  const [formValues, setFormValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    phoneNumber: "",
    zipCode: "",
    country: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: null,
    firstName: null,
    lastName: null,
    address1: null,
    address2: null,
    city: null,
    phoneNumber: null,
    zipCode: null,
    country: null,
  });

  const updateField = (name: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    const error = validateField(name, value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  const handleSelect = (value: string) => {
    updateField("country", value);
  };

  const validateEmail = (email: string) => {
    const rgExp =
      /^[\w]+[\w.+-]*@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/;
    return rgExp.test(String(email).toLowerCase());
  };

  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case "email":
        if (!value) return "Enter email";
        if (!validateEmail(value)) return "Enter valid email format";
        return null;
      case "firstName":
      case "lastName":
      case "address1":
      case "address2":
      case "city":
        if (!value) return "Enter required data";
        return null;
      case "phoneNumber":
        if (!value) return "Enter phone number";
        if (!/^\d{10}$/.test(value)) return "Enter valid phone number";
        return null;
      case "zipCode":
        if (!value) return "Enter zip code";
        if (!/^\d{5}$/.test(value)) return "Enter valid zip code";
        return null;
      case "country":
        if (!value) return "Select a country";
        return null;
      default:
        return null;
    }
  };

  const handleContinue = () => {
    const newErrors = {} as FormErrors;
    let hasErrors = false;

    Object.entries(formValues).forEach(([key, value]) => {
      const error = validateField(key as keyof FormValues, value);
      if (error) {
        hasErrors = true;
        newErrors[key as keyof FormValues] = error;
      }
    });

    setFormErrors(newErrors);

    if (!hasErrors) {
      setIsVisible(true);
    }
  };

  const handleSubmit = async () => {
    if (!selectedOption) {
      setCheckError("Select shipping method");
    }

    if (selectedOption) {
      try {
        const data = {
          currency: "UAH",
          email: formValues.email,
          phone: formValues.phoneNumber,
          shippingAddress: {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            address1: formValues.address1,
            address2: formValues.address2,
            city: formValues.city,
            zip: formValues.zipCode,
            countryCode: formValues.country,
          },
          shippingValue,

          // lineItems: [
          //   {
          //     title: "Molumenzeit S 7",
          //     priceSet: {
          //       shopMoney: {
          //         amount: 15000,
          //         currencyCode: "UAH",
          //       },
          //     },
          //     quantity: 2,
          //   },
          // ],
        };
        const response = await CreateOrder(data, {
          sendReceipt: "true",
          sendFulfilmentReceipt: "true",
          inventoryBehaviour: "BYPASS",
        });

        setFormValues({
          email: "",
          firstName: "",
          lastName: "",
          address1: "",
          address2: "",
          city: "",
          phoneNumber: "",
          zipCode: "",
          country: "",
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <section>
      <Title text="checkout" />

      <div className="container flex flex-col gap-[30px] justify-center py-[50px] lg:flex-wrap lg:flex-row-reverse lg:gap-[50px]">
        <div className="flex flex-col lg:order-1 mini:mx-auto lg:mx-0 mini:w-[400px] md:w-[500px] lg:w-[400px] xl:w-[500px]">
          {isOpen && (
            <motion.div
              className="bordered-[10px] shadow-lg rounded-lg px-[20px]"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CartComponent />
              <hr />
              <CartComponent />
              <hr />
              <CartComponent showShipping />
              <hr />
              <CartComponent showTax />
            </motion.div>
          )}

          <div className="flex flex-col bg-darkBurgundy py-[25px] rounded-[10px] text-white text-center items-center gap-[8px]">
            <h3 className="text-[20px] md:text-[25px]">$24,588</h3>
            <p className="text-[10px] md:text-[15px]">Grand Total</p>
            <Image
              src={Arrow}
              alt="Arrow"
              className={`transition-transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>

        <FormComponent title="Basic Info" className="lg:order-2 relative">
          <Input
            name="email"
            placeholder="Email"
            type="email"
            value={formValues.email}
            onChange={handleInputChange}
            error={formErrors.email}
            fullWidth
            bordered
            className="mini:w-[80%]"
          />

          <Input
            name="firstName"
            placeholder="Fist Name"
            type="text"
            value={formValues.firstName}
            onChange={handleInputChange}
            error={formErrors.firstName}
            bordered
            fullWidth
            className="mini:w-[80%]"
          />

          <Input
            name="lastName"
            placeholder="Last Name"
            type="text"
            value={formValues.lastName}
            onChange={handleInputChange}
            error={formErrors.lastName}
            bordered
            fullWidth
            className="mini:w-[80%]"
          />

          <Input
            name="phoneNumber"
            placeholder="Phone Number"
            type="text"
            value={formValues.phoneNumber}
            onChange={handleInputChange}
            error={formErrors.phoneNumber}
            bordered
            fullWidth
            className="mini:w-[80%]"
          />

          <Input
            name="address1"
            placeholder="Address 1"
            type="text"
            value={formValues.address1}
            onChange={handleInputChange}
            error={formErrors.address1}
            bordered
            fullWidth
            className="mini:w-[80%]"
          />
          <Input
            name="address2"
            placeholder="Address 2"
            type="text"
            value={formValues.address2}
            onChange={handleInputChange}
            error={formErrors.address2}
            bordered
            fullWidth
            className="mini:w-[80%]"
          />

          <div className="flex gap-[10px] items-center mini:w-[80%]">
            <Input
              name="city"
              placeholder="City"
              type="text"
              value={formValues.city}
              onChange={handleInputChange}
              error={formErrors.city}
              bordered
              fullWidth
              className="mini:w-[60%]"
            />
            <Input
              name="zipCode"
              placeholder="Zip Code"
              type="text"
              value={formValues.zipCode}
              onChange={handleInputChange}
              error={formErrors.zipCode}
              bordered
              fullWidth
              className="mini:w-[40%]"
            />
          </div>

          <Input
            name="country"
            placeholder="Country"
            showSelect
            options={options}
            onSelect={handleSelect}
            className="mini:w-[80%]"
            error={formErrors.country}
          />

          <Button
            text="Continue"
            className="mini:w-[80%] w-[100%]"
            type="button"
            onClick={handleContinue}
          />
        </FormComponent>

        <FormComponent
          title="Shipping"
          className={`lg:order-3 transition-opacity duration-0.3 ${
            isVisible ? "opacity-100" : "opacity-50 pointer-events-none"
          }`}
        >
          <Checkbox
            label="UPS Express"
            description="UPS Express 2-3 working days"
            price="$49.99"
            checked={selectedOption == "UPS Express"}
            onChange={() => handleChange("UPS Express")}
          />

          <Checkbox
            label="UPS Standard"
            price="Free"
            description="UPS Standard 2-3 working days"
            checked={selectedOption == "UPS Standard"}
            onChange={() => handleChange("UPS Standard")}
          />
          {checkError && (
            <p className="text-[14px] text-darkBurgundy">{checkError}</p>
          )}

          <Button
            text="Create order"
            className="mini:w-[80%] w-[100%]"
            type="button"
            onClick={handleSubmit}
          />
        </FormComponent>
      </div>
    </section>
  );
};

export default CheckoutSection;

{
  /*
        // Купон, у подальшому буде реалізація
        <div className="flex flex-col order-2 lg:order-3 mini:mx-auto lg:mx-0">
          <p className="text-[20px] font-semibold">Apply Coupon</p>
          <Input
            type="text"
            bordered
            placeholder="Coupon Code"
            fullWidth
            className="md:w-[500px] lg:w-[400px] mini:w-[420px] xl:w-[500px]"
          />
          <Button text="Check Coupon" className="my-[15px]" />
        </div> */
}
