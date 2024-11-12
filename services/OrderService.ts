import axios from "axios";
import { BASE_URL } from "@/config/config";

export const CreateOrder = async (order: any, options: any): Promise<any> => {
  try {
    const data = { order, options };

    const res = await axios.post(`${BASE_URL}/order`, data);
    return res.data;
  } catch (error) {
    console.error("Error create order:", error);
    throw error;
  }
};
