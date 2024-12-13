"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Table, Accordion, Loader } from "@mantine/core";

import { Order } from "@/config/types";
import { getUserOrders } from "@/services/OrderService";

import Plus from "@/images/vectors/plus.svg";

const OrderHistorySection = () => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getUserOrders();
        setOrders(ordersData);
        setLoading(true);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusStyles = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case "paid":
        return {
          text: "Оплачено",
          styles: "text-blue-600 bg-blue-100",
        };
      case "cancelled":
        return {
          text: "Скасовано",
          styles: "text-red-600 bg-red-100",
        };
      case "closed":
        return {
          text: "Повністю виконано",
          styles: "text-green-600 bg-green-100",
        };
      case "out for delivery":
        return {
          text: "В дорозі",
          styles: "text-yellow-600 bg-yellow-100",
        };
      case "open":
        return {
          text: "Відкрито",
          styles: "text-orange-500 bg-orange-100",
        };
      case "on hold":
        return {
          text: "Закрито",
          styles: "text-purple-600 bg-purple-100",
        };
      default:
        return {
          text: "Не визначено",
          styles: "text-gray-600 bg-gray-200",
        };
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-[10px] md:gap-[15px] mb-[44px]">
        <h1 className="text-black text-[32px] md:text-[46px] font-medium">
          Your Order History
        </h1>
        <p className="text-[12px] text-silver md:text-[14px] text-center">
          Here you can find a summary of your past orders, track their status,
          and manage returns or exchanges.
        </p>
      </div>
      {loading ? (
        <>
          {orders.length === 0 && (
            <div className="flex justify-center font-bold text-[16px] md:text-[20px] lg:text-[24px] xl:text-[26px]">
              No orders available
            </div>
          )}
          <Accordion transitionDuration={1000} chevron={false}>
            {orders.length > 0 &&
              orders.map((order) => {
                const { text, styles } = getStatusStyles(order.status);

                return (
                  <Accordion.Item value={order.id} key={order.id}>
                    <Accordion.Control className="mb-[3px] p-4 bg-white w-full border border-whisper border-solid rounded-lg">
                      <div
                        className="relative flex flex-row justify-between items-center"
                        onClick={() => toggleOrderDetails(order.id)}
                      >
                        <span className="text-[10px] md:text-[12px] lg:text-[14px] text-gray-500">
                          {order.number}
                        </span>
                        <span className="text-gray-700 text-[10px] md:text-[12px] lg:text-[14px]">
                          {order.date}
                        </span>
                        <span
                          className={`text-[10px] md:text-[12px] lg:text-[14px] py-1 px-2 rounded ${styles}`}
                        >
                          {text}
                        </span>
                        <span className="text-[10px] md:text-[12px] lg:text-[14px] text-gray-800 font-semibold">
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
                              <th className="text-[10px] md:text-[12px] lg:text-[14px] text-center">
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
                                      <p className="text-[12px] md:text-[14px] lg:text-[16px] text-gray-800 pr-[10px]">
                                        {item.name}
                                      </p>
                                    </Link>
                                    <p className="text-[10px] md:text-[12px] text-gray-500">
                                      {item.vendor}
                                    </p>
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
                          <span className="font-bold text-[12px] md:text-[14px] lg:text-[16px]">
                            Total: {order.total}
                          </span>
                          {/* <span className="text-[12px] md:text-[14px] lg:text-[16px]">
                        Shipping: {order.shipping}
                      </span>
                      <span className="text-[12px] md:text-[14px] lg:text-[16px]">
                        Tax: {order.tax}
                      </span>
                      <span className="text-[12px] md:text-[14px] lg:text-[16px]">
                        Subtotal: {order.subtotal}
                      </span> */}
                        </div>
                      </div>
                    </Accordion.Panel>
                  </Accordion.Item>
                );
              })}
          </Accordion>
        </>
      ) : (
        <div className="container flex justify-center">
          <Loader className="animate-spin rounded-full border-4 border-darkBurgundy border-b-transparent w-10 h-10" />
        </div>
      )}
    </>
  );
};

export default OrderHistorySection;
