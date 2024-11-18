import axios from "axios";
import {BASE_URL} from "@/config/config";

export const CreateOrder = async (order: any, options: any): Promise<any> => {
  try {
    const data = { order, options };

    const res = await axios.post(`${BASE_URL}/order`, data);
    return res.data;
  } catch (error) {
    console.error("Error create order:", error);
  }
};

// accessToken: string, authToken: string
export const GetUserOrders = async (customerId:string): Promise<any> => {
	try {
		const res = await axios.get(`${BASE_URL}/order/${customerId}`);
	//   const res = await axios.get(`${BASE_URL}/order`, {
	// 	 headers: {
	// 		Authorization: `Bearer ${accessToken}`,  
	// 		'x-auth-token': authToken,               
	// 	 }
	//   });
	  return res.data;  
	} catch (error) {
	  console.error("Error fetching user orders:", error);
	}
 };