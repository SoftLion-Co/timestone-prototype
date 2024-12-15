import axios from "axios";
import { api } from "@/config/config";
import { BASE_URL } from "@/config/config";

export const sendResetPasswordEmail = async (email: string): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/forgot-password`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error to send reset password enail", error);
  }
};
