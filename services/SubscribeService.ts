import axios from "axios";
import { BASE_URL } from "@/config/config";
// import * as dotenv from 'dotenv';
// dotenv.config();

export const addNewReceiver = async (
  name: string,
  email: string
): Promise<any> => {
  try {
    await axios.post(`${BASE_URL}/newsletter/receiver`, {
      name,
      email,
    });
    return "New receiver added successfully";
  } catch (error) {
    console.error("Error adding new receiver:", error);
  }
};

export const sendEmailToUs = async (
  fullName: string,
  email: string,
  text: string
): Promise<any> => {
  try {
    console.log(3, fullName, email, text)
    const response = await axios.post(`${BASE_URL}/newsletter/contact-us`, {
      fullName,
      email,
      text,
    });
    return "New receiver added successfully";
  } catch (error) {
    console.error("Error adding new receiver:", error);
  }
};
