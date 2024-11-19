"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Table, Accordion } from "@mantine/core";

import { Order } from "@/config/types";

import Plus from "@/images/vectors/plus.svg";
import Watch1 from "@/test/images/watches/watch-1.png";
import Watch2 from "@/test/images/watches/watch-2.png";
import Watch3 from "@/test/images/watches/watch-3.png";

const orders: Order[] = [
  {
    id: "#34BV66580",
    date: "September 9, 2020",
    status: "Cancelled",
    total: "$750.00",
    shipping: "$25.00",
    tax: "$6.35",
    subtotal: "$230.00",
    items: [
      {
        id: "1",
        handle: "",
        name: "Molumenzeit S 2",
        vendor: "",
        options: [
          {
            name: "Color",
            values: ["black"],
          },
        ],
        price: "$15.50",
        quantity: 1,
        subtotal: "$15.50",
        image: Watch1.src,
      },
      {
        id: "2",
        handle: "",
        name: "Molumenzeit S 1",
        vendor: "",
        options: [
          {
            name: "Color",
            values: ["blue"],
          },
        ],
        price: "$85.00",
        quantity: 1,
        subtotal: "$85.00",
        image: Watch2.src,
      },
    ],
  },
  {
    id: "#44BV66580",
    date: "September 9, 2020",
    status: "Completed",
    total: "$750.00",
    shipping: "$25.00",
    tax: "$6.35",
    subtotal: "$230.00",
    items: [
      {
        id: "1",
        handle: "",
        name: "Molumenzeit S 3",
        vendor: "",
        options: [
          {
            name: "Color",
            values: ["pink"],
          },
        ],
        price: "$15.50",
        quantity: 1,
        subtotal: "$15.50",
        image: Watch3.src,
      },
    ],
  },
  {
    id: "#55BV66580",
    date: "September 9, 2020",
    status: "In progress",
    total: "$750.00",
    shipping: "$25.00",
    tax: "$6.35",
    subtotal: "$230.00",
    items: [
      {
        id: "1",
        handle: "",
        name: "Molumenzeit S 2",
        vendor: "",
        options: [
          {
            name: "Color",
            values: ["green"],
          },
        ],
        price: "$15.50",
        quantity: 1,
        subtotal: "$15.50",
        image: Watch2.src,
      },
    ],
  },
];

const OrderHistorySection = () => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-500 bg-green-100";
      case "Cancelled":
        return "text-red-500 bg-red-100";
      case "In progress":
      default:
        return "text-blue-500 bg-blue-100";
    }
  };
  return (
    <>
      <div className="flex flex-col items-center gap-[10px] md:gap-[15px] mb-[44px]">
        <h1 className="text-black text-[32px] md:text-[46px] font-medium">
          Your Order History
        </h1>
        <p className="text-[12px] text-[#939393] md:text-[14px] text-center">
          Here you can find a summary of your past orders, track their status,
          and manage returns or exchanges.
        </p>
      </div>

      <Accordion transitionDuration={1000} chevron={false}>
        {orders.map((order) => (
          <Accordion.Item value={order.id} key={order.id}>
            <Accordion.Control className="mb-[3px] p-4 bg-white w-full border border-whisper border-solid rounded-lg">
              <div
                className="relative flex flex-row justify-between items-center"
                onClick={() => toggleOrderDetails(order.id)}
              >
                <span className="text-[10px] md:text-[12px] lg:text-[14px] text-gray-500">
                  {order.id}
                </span>
                <span className="text-gray-700 text-[10px] md:text-[12px] lg:text-[14px]">
                  {order.date}
                </span>

                <span
                  className={`text-[10px] md:text-[12px] lg:text-[14px] py-1 px-2 rounded ${getStatusStyles(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
                <span className="text-[10px] md:text-[12px] lg:text-[14px]text-gray-800 font-semibold">
                  {order.total}
                </span>
                <Image
                  src={Plus}
                  alt="Toggle"
                  width={16}
                  height={16}
                  className={`w-[10px] h-[10px] md:w-[16px] md:h-[16px] transition-transform duration-300 ease-in-out ${
                    expandedOrder === order.id ? "rotate-45" : ""
                  }`}
                />
              </div>
            </Accordion.Control>

            <Accordion.Panel>
              <div className="mb-[10px] p-4 bg-snow bg-opacity-70 border border-x-1 border-t-0 border-whisper border-solid rounded-md">
                <Table className="w-full text-left text-gray-700">
                  <thead>
                    <tr>
                      <th className="text-[10px] md:text-[12px] lg:text-[14px]">
                        Item
                      </th>
                      <th className="text-[10px] md:text-[12px] lg:text-[14px] text-center">
                        Price
                      </th>
                      <th className="text-[10px] md:text-[12px] lg:text-[14px] text-center">
                        Quantity
                      </th>
                      <th className="text-[10px] md:text-[12px]  lg:text-[14px] text-center">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td className="py-2 flex items-center gap-4">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={60}
                            height={60}
                            className="w-[30px] h-[30px] md:w-[60px] md:h-[60px] object-cover rounded"
                          />
                          <div>
                            <Link href="/">
                              <p className=" text-[12px] md:text-[14px] lg:text-[16px] text-gray-800 pr-[10px]">
                                {item.name}
                              </p>
                            </Link>

                            {item.options.map((option) => (
                              <p
                                className="text-[10px] md:text-[12px] text-gray-500"
                                key={option.name}
                              >
                                {option.name}: {option.values}
                              </p>
                            ))}
                          </div>
                        </td>
                        <td className="text-center text-[10px] md:text-[12px] lg:text-[14px]">
                          {item.price}
                        </td>
                        <td className="text-center text-[10px] md:text-[12px] lg:text-[14px]">
                          {item.quantity}
                        </td>
                        <td className="text-center text-[10px] md:text-[12px] lg:text-[14px]">
                          {item.subtotal}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="border-t mt-4 pt-4 flex justify-end text-sm text-gray-700">
                  {/* <span className="">Tax: {order.tax}</span>
                  <span className="">Shipping: {order.shipping}</span>
                  <span className="">Subtotal: {order.subtotal}</span> */}
                  <span className="font-bold text-[12px] md:text-[14px] lg:text-[16px]">
                    Total: {order.total}
                  </span>
                </div>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

export default OrderHistorySection;
