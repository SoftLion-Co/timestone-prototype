import axios from "axios";
import { BASE_URL } from "@/config/config";

export const sendResetPasswordEmail = async (email: string): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/forgot-password`, {
      email,
    });
    return response.status;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      if (error.status === 409 || error.status === 400) {
        return error.response?.data;
      } else {
        return "server error";
      }
    }
  }
};

export const resetForgetPassword = async (
  token: string,
  password: string
): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/reset-password`, {
      token,
      password,
    });
    return response.status;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      if (error.status === 409 || error.status === 400) {
        return error.response?.data;
      } else {
        return "server error";
      }
    }
  }
};

export const checkResetToken = async (token: string): Promise<any> => {
  try {
    const res = await axios.get(`${BASE_URL}/auth/reset-password/check-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
	console.error(error);
    if (axios.isAxiosError(error)) {
    return error;
    }
  }
};
