import axios from "axios";
export const CreateOrder = async (order: any, options: any): Promise<any> => {
  try {
    const data = { order, options };

    const res = await axios.post(`http://localhost:4001/order`, data);
    return res.data;
  } catch (error) {
    console.error("Error create order:", error);
    throw error;
  }
};
