import axios from "axios";
import { BASE_URL } from "@/config/config";

export const registrateNewUser = async (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  dateOfBirth: string,
  password: string,
  receiveUpdates: boolean
): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/registration`, {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      password,
      receiveUpdates,
    });
    return response.data; //тут повертаються шось про мейлсенд
  } catch (error) {
    console.error("Failed to register user:", error);
    throw error;
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    console.log("login333");
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    if (response?.data?.accessToken && response?.data?.refreshToken) {

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return "";
    }
  } catch (error) {
    console.error("Failed to login user:", error);
    throw error;
  }
};