import axios from "axios";
import { api } from "@/config/config";
import { BASE_URL } from "@/config/config";

export const sendResetPasswordEmail = async (email: string): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/forgot-password`, {
      email,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
        if (error.status === 409 || error.status === 400) {
          return error.response?.data;
        } else {
          return "server error";
        }
      }
  }
};
