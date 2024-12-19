import axios from "axios";
import { BASE_URL } from "@/config/config";

export const CreatePayment = async (
  products: any,
  totalAmount: any
): Promise<any> => {
  try {
    const lineItems = products.map((product: any) => ({
      title: product.title,
      quantity: product.quantity,
      price: product.price,
    }));

    const paymentData = {
      amount: totalAmount,
      currency: "UAH",
      description: "Оплата товарів",
      order_id: `order_${new Date().getTime()}`,
      lineItems,
    };

    const response = await axios.post(
      `${BASE_URL}/create-payment`,
      JSON.stringify(paymentData)
    );

    return response.data;
  } catch (error) {
    console.error("Error during LiqPay payment creation:", error);
  }
};