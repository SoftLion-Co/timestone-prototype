import axios from "axios";
import { BASE_URL } from "@/config/config";

export const registrateNewUser = async (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    dateOfBirth: string,
    password: string,
    receiveUpdates: boolean,
): Promise<any> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/registration`,
      {
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        password,
        receiveUpdates
      });
    return response.data; //тут повертаються токени
  } catch (error) {
    console.error("Failed to register user:", error);
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    const data ={email,password};
    console.log("login", email, password);
    const response = await axios.post(
      `${BASE_URL}/auth/login`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to login user:", error);
  }
};
