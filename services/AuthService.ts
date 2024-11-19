import axios from "axios";
import { BASE_URL } from "@/config/config";

export const registrateNewUser = async (
    firstName: string,
    lastName: string,
    month: string,
    day: string, // узгодити тип та вигляд збереження в бд
    phone: string,
    email: string,
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
        month,
        day,
        password,
        receiveUpdates
      });
    console.log(response.data);
    return response.data;
    
  } catch (error) {
    console.error("Failed to register user:", error); //ретур ерор або сров відловлення на вронтенді
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
